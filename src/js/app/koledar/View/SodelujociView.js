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
            gostiR: '.region-gosti'
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

    /**
     * Termine storitve iz dogodkarazdelimo po področjih v tri različne kolekcije.
     * te kolekcije predstavljajo izbrane umetnike, tehnike in goste/dežurne
     * @returns {undefined}
     */
    SodelujociView.prototype.razdeliTS = function () {
        var tsPodrocja = this.tsColl.razdeliPoPodrocjih();

        this.izbraniUmetniki = new TerminiStoritve();
        this.izbraniUmetniki.add(tsPodrocja.umetnik);
        this.izbraniUmetniki.add(tsPodrocja.igralec);

        this.izbraniTehniki = new TerminiStoritve();
        this.izbraniTehniki.add(tsPodrocja.tehnik);
        this.izbraniTehniki.add(tsPodrocja.inspicient);

        this.izbraniGosti = new TerminiStoritve();
        this.izbraniTehniki.add(tsPodrocja.gosti);
    };
    /**
     * V tej funkciji inicializiramo 2 kolekciji ki predstavljajo alternacije umetnikov in tehnikov,
     * ter kolekcijo gostov/dežurni, ki predstavljajo osebe.
     * Prav tako inicializiramo 3 prazne kolekcije v katerih bomo izbra
     * @returns {undefined}
     */
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

        this.izbraniGostiColl = new Osebe();
        this.gostiColl = new Osebe();
        this.gostiColl.fetch({error: Radio.channel('error').request('handler', 'xhr')});
    };
    SodelujociView.prototype.onRender = function () {
        this.renderUmetniki();
        this.renderTehnika();
        this.renderGosti();
    };
    /**
     * Izris seznam izbranih umetnikov
     * @returns {undefined}
     */
    SodelujociView.prototype.renderUmetniki = function () {
        var view = this.umetnikiView = new SeznamSodelujocihView({
            collection: this.izbraniUmetniki,
            naslov: 'Umetniki'
        });
        view.on('render:uredi', this.urediUmetnike, this);
        this.umetnikiR.show(view);
    };
    /**
     * Izris seznam izbranih tehnikov
     * @returns {undefined}
     */
    SodelujociView.prototype.renderTehnika = function () {
        var view = this.tehnikiView = new SeznamSodelujocihView({
            collection: this.izbraniTehniki,
            naslov: 'Tehniki'
        });
        view.on('render:uredi', this.urediTehnike, this);
        this.tehnikiR.show(view);
    };
    
    /**
     * Izris seznam izbranih gostov/dežurnih
     * @returns {undefined}
     */
    SodelujociView.prototype.renderGosti = function () {
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

        var view = this.gostiView = new SeznamSodelujocihView({
            collection: this.izbraniGosti,
            naslov: 'Gosti',
            childView: ItemView
        });
        view.on('render:uredi', this.urediGoste, this);
        this.gostiR.show(view);
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
            izbraniTS: this.izbraniGosti,
            izbrani: this.izbraniGostiColl,
            mozni: this.gostiColl,
            $el: $el,
            tpl: Handlebars.compile('{{polnoIme}}')
        });
    };
    /**
     * Ob kliku na gum uredi se nam odpre dualListView. Namen je da izberemo alternacije/osebe, ki bodo povabljene na dogodek.
     * @param {type} options
     * @returns {undefined}
     */
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

        // ko dual list proži changed:vrednosti se kolekcija alternacij/oseb pretvori v polje objektov TS
        var self = this;
        //onclose proži changed:vrednosti
        view.on('changed:vrednosti', function () {
            self.trigger('changed:vrednosti');
            var tsModeli = options.izbrani.toTS({
                dogodek: this.dogodek,
                zacetek: moment(),
                konec: moment()
            });

            // kolekcijo izbranihTerminostoritev resetiramo in dodamo v tem trenutku izbrane alternacije/osebe
            options.izbraniTS.reset(tsModeli);
        }, this);

        view.render();
    };
    return SodelujociView;
});