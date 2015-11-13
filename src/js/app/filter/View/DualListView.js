/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhodni podatki:
 *      - vrsta filtra
 *      - collection
 *
 * Izbira kriterijev filtra
 *
 * Izhodni podatki:
 *      - collection izbranih kriterijev
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'underscore',
    'marionette',
    'template!../tpl/dualList.tpl',
    './DualListCollView'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette,
        dualListTpl,
        DualListCollView
        ) {

    var DualListView = Marionette.LayoutView.extend({
        template: dualListTpl,
        className: 'duallist',
        regions: {
            filterR: '.duallist-filter',
            leviSeznamR: '.duallist-seznam-levi',
            gumbiR: '.duallist-gumbi',
            desniSeznamR: '.duallist-seznam-desni'
        },
        triggers: {
            'click .vsiDesno': 'premakniVseDesno',
            'click .izbraniDesno': 'premakniIzbraneDesno',
            'click .izbraniLevo': 'premakniIzbraneLevo',
            'click .vsiLevo': 'premakniVseLevo'
        }
    });

    /**
     * Poskrbeli bomo da lahko nastavljamo različne viewje kot optione
     * @param Array options
     * @returns {undefined}
     */
    DualListView.prototype.initialize = function (options) {
        this.template = options.tempalte || this.template;
        this.collIzbrani = options.collIzbrani || new Backbone.Collection();
        this.collIzbira = options.collIzbira || new Backbone.Collection();
        this.IzbiraView = options.IzbiraView || DualListCollView;
        this.IzbraniView = options.IzbraniView || DualListCollView;
        this.left = options.left || null;
        this.top = options.top || null;

        this.listenTo(this.collection, 'selectValue', this.onSelect);
    };

    /**
     * Kaj se zgodi ob izrisu Viewja
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onRender = function (options) {
        this.filter = this.renderFilter(options);
        this.leviSeznam = this.renderLeviSeznam(options);
        this.desniSeznam = this.renderDesniSeznam(options);
        if (this.top) {
            this.$el.css('top', this.top);
        }
        if (this.left) {
            this.$el.css('left', this.left);
        }
    };

    /**
     * Izris filtra filtriramo vedno.
     * Ker uporabljamo obstoječ collection možnih izbir moremo filtrirat na clientu
     * @param {type} options
     * @returns {DualListView_L24.Marionette.LayoutView.extend.prototype.renderFilter.filter|DualListView_L24.Backgrid.Extension.ServerSideFilter}
     */
    DualListView.prototype.renderFilter = function (options) {
        return null;
    };

    /**
     * Levi seznam je namenjen prikazu vseh elementov, ki jih lahko izberemo
     * Poizbiri elementa bi bilo dobro da se postavijo na prvo mesto, da uporabnik vidi kaj je vse izbral
     * @param {type} options
     * @returns {DualListView_L24.Backgrid.Grid|DualListView_L24.Marionette.LayoutView.extend.prototype.renderLeviSeznam.grid}
     */
    DualListView.prototype.renderLeviSeznam = function (options) {
        var view = this.izbiraView = new this.IzbiraView({
            collection: this.collIzbira
        });

        this.leviSeznamR.show(view);
        return view;
    };

    /**
     * Desni seznam je namenjen Prikazu že izbranih elementov
     * @param {type} options
     * @returns {DualListView_L24.Backgrid.Grid|DualListView_L24.Marionette.LayoutView.extend.prototype.renderDesniSeznam.grid}
     */
    DualListView.prototype.renderDesniSeznam = function (options) {
        var view = this.izbraniView = new this.IzbraniView({
            collection: this.collIzbrani
        });

        this.desniSeznamR.show(view);
        return view;
    };

    /**
     * Premaknemo vse elemente iz levega stolpca v desnega
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onPremakniVseDesno = function (options) {
        var models = this.izbiraView.getAllModels();

        for (var index in models) {
            this.izbraniView.collection.add(models[index]);
        }

        this.nastaviFilter();
        this.refresh();
    };

    /**
     * Premaknemo izbrane elemente iz levega stolpca v desnega
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onPremakniIzbraneDesno = function (options) {
        var models = this.izbiraView.getSelectedModels();

        for (var index in models) {
            this.izbraniView.collection.add(models[index]);
        }

        this.nastaviFilter();
        this.refresh();
    };

    /**
     * Premaknemo izbrane elemente iz desnega stolpca v levega
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onPremakniIzbraneLevo = function (options) {
        var models = this.izbraniView.getSelectedModels();

        for (var index in models) {
            this.izbraniView.collection.remove(models[index]);
        }

        this.nastaviFilter();
        this.refresh();
    };

    /**
     * Premaknemo vse elemente iz desnega stolpca v levega
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onPremakniVseLevo = function (options) {
        var models = this.izbraniView.getAllModels();

        for (var index in models) {
            this.izbraniView.collection.remove(models[index]);
        }

        this.nastaviFilter();
        this.refresh();
    };

    /*
     * Nastavimo filter za prikaz modelov v levemseznamu, ki niso v med izbranimi modeli
     * @returns {undefined}
     */
    DualListView.prototype.nastaviFilter = function () {
        var self = this;
        this.izbiraView.filter = function (child, index, collection) {
            var models = self.izbraniView.collection.models;
            for (var index in models) {
                if (child.get('id') === models[index].get('id')) {
                    return false;
                }
            }
            return true;
        };
    };
    /**
     * Osvežimo tabele in izbrane modele pri posameznih 
     * @returns {undefined}
     */
    DualListView.prototype.refresh = function () {
        this.izbraniView.render();
        this.izbiraView.render();

        this.izbraniView.resetSelection();
        this.izbiraView.resetSelection();
    };


    return DualListView;
});


