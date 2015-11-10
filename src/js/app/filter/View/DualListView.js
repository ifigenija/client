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
    'app/Max/Module/Backgrid',
    'app/Max/Model/LookupModel',
    '../tpl/dualList.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Marionette,
        Backgrid,
        LookupModel,
        dualListTpl
        ) {

    var DualListView = new Marionette.LayoutView.extend({
        template: dualListTpl,
        regions: {
            filterR: 'duallist-filter',
            leviSeznamR: 'duallist-seznam-levi',
            gumbiR: 'duallist-gumbi',
            desniSeznamR: 'duallist-seznam-desni'
        }
    });

    /**
     * Poskrbeli bomo da lahko nastavljamo različne viewje kot optione
     * @param Array options
     * @returns {undefined}
     */
    DualListView.prototype.initialize = function (options) {
        this.template = options.tempalte || this.template;
        this.collection = options.collection || this.collection;

        this.listenTo(this.collection, 'selectValue', this.onSelected);
    };

    DualListView.prototype.renderFilter = function (options) {
        var filter = new Backgrid.Extension.ServerSideFilter({
            collection: this.collection,
            name: 'q',
            placeholder: 'Išči..'
        });

        this.filterR.show(filter);
    };

    DualListView.prototype.renderSeznam = function (options) {
        var grid = new Backgrid.Grid({
            collection: this.collection,
            row: Backgrid.ClickableRow,
            columns: this.columns
        });
        this.leviSeznamR.show(grid);
        return grid;
    };

    DualListView.prototype.renderSeznamIzbranih = function (options) {
        var grid = new Backgrid.Grid({
            collection: this.collectionIzbrani,
            row: Backgrid.ClickableRow,
            columns: this.columns
        });
        this.leviSeznamR.show(grid);
        return grid;
    };

    /**
     * Premaknemo vse elemente iz levega stolpca v desnega
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onPremakniVseDesno = function (options) {
    };

    /**
     * Premaknemo izbrane elemente iz levega stolpca v desnega
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onPremakniIzbraneDesno = function (options) {

    };

    /**
     * Premaknemo izbrane elemente iz desnega stolpca v levega
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onPremakniIzbraneLevo = function (options) {

    };

    /**
     * Premaknemo vse elemente iz desnega stolpca v levega
     * @param {type} options
     * @returns {undefined}
     */
    DualListView.prototype.onPremakniVseLevo = function (options) {

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


