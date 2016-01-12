/*
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'backbone',
    'app/bars',
    'marionette',
    'underscore',
    'moment',
    'jquery',
    '../Model/TerminiStoritve',
    '../Model/Alternacije',
    '../Model/Osebe',
    './SeznamSodelujocihView',
    'app/filter/View/DualListView',
    'template!../tpl/sodelujoci.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        Handlebars,
        Marionette,
        _,
        moment,
        $,
        TerminiStoritve,
        Alternacije,
        Osebe,
        SeznamSodelujocihView,
        DualListView,
        sodelujociTpl
        ) {

    var SodelujociView = Marionette.LayoutView.extend({
        className: 'sodelujoci',
        template: sodelujociTpl,
        regions: {
            umetnikiR: '.region-umetniki',
            tehnikiR: '.region-tehniki',
            gosDezR: '.region-gosti'
        }
    });
    /**
     * 
     * @param {Object} options
     * @param {String} options.uprizoritev  id uprizoritve
     * @returns {undefined}
     */
    SodelujociView.prototype.initialize = function (options) {
        this.alternacijeColl = options.alternacije;
        this.dogodek = options.dogodek;
        this.tsColl = new TerminiStoritve(this.dogodek.get('terminiStoritve'));

        this.razdeliAlternacije();
        this.razdeliTS();
    };
    SodelujociView.prototype.razdeliTS = function () {
        var tsPodrocja = this.tsColl.razdeliPoPodrocjih();

        this.izbraniUmetniki = new TerminiStoritve();
        this.izbraniUmetniki.add(tsPodrocja.umetnik);
        this.izbraniUmetniki.add(tsPodrocja.igralec);

        this.izbraniTehniki = new TerminiStoritve();
        this.izbraniTehniki.add(tsPodrocja.tehnik);
        this.izbraniTehniki.add(tsPodrocja.inspicient);

        this.izbraniGosDez = new TerminiStoritve();
        this.izbraniTehniki.add(tsPodrocja.gostiDezurni);
    };
    SodelujociView.prototype.razdeliAlternacije = function () {
        var modeli = this.alternacijeColl.razdeli();

        this.izbraniUmetnikiColl = new Alternacije();
        this.umetnikiColl = new Alternacije();
        this.umetnikiColl.add(modeli.umetnik);
        this.umetnikiColl.add(modeli.igralec);

        this.izbraniTehnikiColl = new Alternacije();
        this.tehnikiColl = new Alternacije();
        this.tehnikiColl.add(modeli.tehnik);
        this.tehnikiColl.add(modeli.inspicient);

        this.izbraniGosDezColl = new Osebe();
        this.gosDezColl = new Osebe();
        this.gosDezColl.fetch({error: Radio.channel('error').request('handler', 'xhr')});
    };
    SodelujociView.prototype.onRender = function () {
        this.renderUmetniki();
        this.renderTehnika();
        this.renderGosDez();
    };
    SodelujociView.prototype.renderUmetniki = function () {
        var view = this.umetnikiView = new SeznamSodelujocihView({
            collection: this.izbraniUmetniki,
            naslov: 'Umetniki'
        });
        view.on('render:uredi', this.urediUmetnike, this);
        this.umetnikiR.show(view);
    };
    SodelujociView.prototype.renderTehnika = function () {
        var view = this.tehnikiView = new SeznamSodelujocihView({
            collection: this.izbraniTehniki,
            naslov: 'Tehniki'
        });
        view.on('render:uredi', this.urediTehnike, this);
        this.tehnikiR.show(view);
    };
    SodelujociView.prototype.renderGosDez = function () {
        var ItemView = Marionette.ItemView.extend({
            tagName: 'span',
            className: 'sodelujoc',
            template: Handlebars.compile('<label>{{ime}}</label>'),
            serializeData: function () {
                return{
                    ime: this.model.get('oseba').get('polnoIme')
                };
            }
        });

        var view = this.gosDezView = new SeznamSodelujocihView({
            collection: this.izbraniGosDez,
            naslov: 'Gosti/Dežurni',
            childView: ItemView
        });
        view.on('render:uredi', this.urediGoste, this);
        this.gosDezR.show(view);
    };
    SodelujociView.prototype.urediUmetnike = function ($el) {
        this.renderUredi({
            izbraniTS: this.izbraniUmetniki,
            izbrani: this.izbraniUmetnikiColl,
            mozni: this.umetnikiColl,
            $el: $el,
            tpl: Handlebars.compile('{{oseba.label}}')
        });
    };

    SodelujociView.prototype.urediTehnike = function ($el) {
        this.renderUredi({
            izbraniTS: this.izbraniTehniki,
            izbrani: this.izbraniTehnikiColl,
            mozni: this.tehnikiColl,
            $el: $el,
            tpl: Handlebars.compile('{{oseba.label}}')
        });
    };

    SodelujociView.prototype.urediGoste = function ($el) {
        this.renderUredi({
            izbraniTS: this.izbraniGosDez,
            izbrani: this.izbraniGosDezColl,
            mozni: this.gosDezColl,
            $el: $el,
            tpl: Handlebars.compile('{{polnoIme}}')
        });
    };
    SodelujociView.prototype.renderUredi = function (options) {
        var $e = $('<div class="selectlist-content"></div>');
        $('body').append($e);
        var view = new DualListView({
            izbrani: options.izbrani,
            mozni: options.mozni,
            itemTemplate: options.tpl,
            $anchor: options.$el,
            el: $e,
            title: "izbira oseb"
        });

        var self = this;
        //onclose proži changed:vrednosti
        view.on('changed:vrednosti', function () {
            self.trigger('changed:vrednosti');
            var tsModeli = options.izbrani.toTS({
                dogodek: this.dogodek,
                zacetek: moment(),
                konec: moment()
            });

            options.izbraniTS.reset(tsModeli);
        }, this);

        view.render();
    };
    return SodelujociView;
});