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
            'click .vsiDesno': 'vseDesno',
            'click .izbraniDesno': 'izbraneDesno',
            'click .izbraniLevo': 'izbraneLevo',
            'click .vsiLevo': 'vseLevo'
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

        this.listenTo(this.collection, 'selectValue', this.onSelect);
    };

    /**
     * Kaj se zgodi ob izrisu Viewja
     * @returns {undefined}
     */
    DualListView.prototype.onRender = function () {
        this.filter = this.renderFilter();
        this.leviSeznam = this.renderLeviSeznam();
        this.desniSeznam = this.renderDesniSeznam();
    };

    DualListView.prototype.renderFilter = function () {
        return null;
    };

    /**
     * Levi seznam je namenjen prikazu vseh elementov, ki jih lahko izberemo
     * Poizbiri elementa bi bilo dobro da se postavijo na prvo mesto, da uporabnik vidi kaj je vse izbral
     * @returns {DualListView_L24.Backgrid.Grid|DualListView_L24.Marionette.LayoutView.extend.prototype.renderLeviSeznam.grid}
     */
    DualListView.prototype.renderLeviSeznam = function () {
        var view = this.izbiraView = new this.IzbiraView({
            collection: this.collIzbira
        });

        this.leviSeznamR.show(view);
        return view;
    };

    /**
     * Desni seznam je namenjen Prikazu že izbranih elementov
     * @returns {DualListView_L24.Backgrid.Grid|DualListView_L24.Marionette.LayoutView.extend.prototype.renderDesniSeznam.grid}
     */
    DualListView.prototype.renderDesniSeznam = function () {
        var view = this.izbraniView = new this.IzbraniView({
            collection: this.collIzbrani
        });

        this.desniSeznamR.show(view);
        return view;
    };

    /**
     * Premaknemo vse elemente iz levega stolpca v desnega
     * @returns {undefined}
     */
    DualListView.prototype.onVseDesno = function () {
        var models = this.izbiraView.getAllModels();

        this.izbraniView.collection.add(models);

        this.nastaviFilter();
        this.refresh();
    };

    /**
     * Premaknemo izbrane elemente iz levega stolpca v desnega
     * @returns {undefined}
     */
    DualListView.prototype.onIzbraneDesno = function () {
        var models = this.izbiraView.getSelectedModels();

        this.izbraniView.collection.add(models);

        this.nastaviFilter();
        this.refresh();
    };

    /**
     * Premaknemo izbrane elemente iz desnega stolpca v levega
     * @returns {undefined}
     */
    DualListView.prototype.onIzbraneLevo = function () {
        var models = this.izbraniView.getSelectedModels();

        this.izbraniView.collection.remove(models);

        this.nastaviFilter();
        this.refresh();
    };

    /**
     * Premaknemo vse elemente iz desnega stolpca v levega
     * @returns {undefined}
     */
    DualListView.prototype.onVseLevo = function () {
        var models = this.izbraniView.getAllModels();

        this.izbraniView.collection.remove(models);

        this.nastaviFilter();
        this.refresh();
    };

    /*
     * Nastavimo filter za prikaz modelov v levems eznamu, ki niso v med izbranimi modeli
     * @returns {undefined}
     */
    DualListView.prototype.nastaviFilter = function () {
        this.izbiraView.search({
            search: 'ton',
            coll: this.izbraniView.collection
        });
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


