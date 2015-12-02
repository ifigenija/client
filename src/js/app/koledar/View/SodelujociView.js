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
    'jquery',
    './SeznamSodelujocihView',
    'template!../tpl/sodelujoci.tpl',
    '../Model/Alternacije',
    '../Model/Osebe',
    'app/filter/View/DualListView'
], function (
        Radio,
        i18next,
        Backbone,
        Handlebars,
        Marionette,
        _,
        $,
        SeznamSodelujocihView,
        sodelujociTpl,
        Alternacije,
        Osebe,
        DualListView
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
        if (options && options.uprizoritev) {
            this.uprizoritev = options.uprizoritev;
        } else {
            throw new Error('SodelujociView nima definirane uprizoritve.');
        }

        var coll = this.collection = new Alternacije();
        coll.queryParams.uprizoritev = this.uprizoritev;
        var self = this;
        coll.fetch({
            success: function () {
                self.razdeliCollection();
                self.onRender();
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
        this.izbraniUmetniki = new Backbone.Collection();
        this.izbraniTehniki = new Backbone.Collection();
        this.izbraniGosti = new Backbone.Collection();
    };
    SodelujociView.prototype.razdeliCollection = function () {
        var modeli = this.collection.razdeli();
        this.umetnikiColl = new Alternacije();
        this.umetnikiColl.add(modeli.umetnik);
        this.umetnikiColl.add(modeli.igralec);
        this.tehnikiColl = new Alternacije();
        this.tehnikiColl.add(modeli.tehnik);
        this.tehnikiColl.add(modeli.inspicient);
        this.gostiColl = new Osebe();
        this.gostiColl.fetch({error: Radio.channel('error').request('handler', 'xhr')});
    };
    SodelujociView.prototype.onRender = function () {
        this.renderUmetniki();
        this.renderTehnika();
        this.renderGosti();
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
    SodelujociView.prototype.renderGosti = function () {
        var view = this.gostiView = new SeznamSodelujocihView({
            collection: this.izbraniGosti,
            naslov: 'Gosti'
        });
        view.on('render:uredi', this.urediGoste, this);
        this.gostiR.show(view);
    };
    SodelujociView.prototype.urediUmetnike = function ($el) {
        this.renderUredi({
            izbrani: this.izbraniUmetniki,
            mozni: this.umetnikiColl,
            $el: $el,
            tpl: Handlebars.compile('{{oseba.label}}')
        });
    };

    SodelujociView.prototype.urediTehnike = function ($el) {
        this.renderUredi({
            izbrani: this.izbraniTehniki,
            mozni: this.tehnikiColl,
            $el: $el,
            tpl: Handlebars.compile('{{oseba.label}}')
        });
    };

    SodelujociView.prototype.urediGoste = function ($el) {
        this.renderUredi({
            izbrani: this.izbraniGosti,
            mozni: this.gostiColl,
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

        //onclose proži changed:vrednosti
        view.on('changed:vrednosti', function () {
            this.trigger('changed:vrednosti');
        }, this);

        view.render();
    };
    return SodelujociView;
});