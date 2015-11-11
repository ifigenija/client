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
    'backbone',
    'underscore',
    'marionette',
    'template!../tpl/dualList.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Marionette,
        dualListTpl
        ) {

    var columns = [
        {
            cell: 'select-row',
            headerCell: 'select-all',
            name: ""
        },
        {
            cell: 'string',
            editable: false,
            label: i18next.t('std.label'),
            name: 'label',
            sortable: true
        },
        {
            cell: 'string',
            editable: false,
            label: i18next.t('std.ident'),
            name: 'ident',
            sortable: true
        }
    ];
    
    var DualListView = Marionette.LayoutView.extend({
        template: dualListTpl,
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
        this.collectionIzbrani = options.collectionIzbrani || null;
        this.collectionIzbira = options.collectionIzbira || null;
        this.columns = options.columns || columns;

        if (!this.collectionIzbira) {
            throw 'Ni nastavljen collection izbira';
        }

        if (!this.collectionIzbrani) {
            throw 'Ni nastavljen collection izbrani';
        }

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
        var view = new IzbiraCollectionView({
            collection: this.collectionIzbira
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
        var view = new IzbraniCollectionView({
            collection: this.collectionIzbrani
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
        console.log('VD');
    };

    /**
     * Premaknemo izbrane elemente iz levega stolpca v desnega
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onPremakniIzbraneDesno = function (options) {
        console.log('ID');
    };

    /**
     * Premaknemo izbrane elemente iz desnega stolpca v levega
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onPremakniIzbraneLevo = function (options) {
        console.log('IL');
    };

    /**
     * Premaknemo vse elemente iz desnega stolpca v levega
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onPremakniVseLevo = function (options) {
        console.log('VL');
    };

    /**
     * Kaj se zgodi ko izberemo enga od vnosov
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onSelect = function (options) {

    };

    /**
     * Kaj se zgodi ko zavržemo izbiro enga izbranih vnosov
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onDeselect = function (options) {

    };

    return DualListView;
});


