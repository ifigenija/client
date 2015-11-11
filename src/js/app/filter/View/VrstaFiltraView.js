/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhodni podatki:
 *      - collection
 *      - izpiši vse kriterije(bolean: default false)
 *      - število izpisov pri izpisu izbranih kriterijev
 * 
 * Izpis izbranih kriterijev:
 *      - celoten seznam
 *      - povzetek(default)
 * 
 * Izbrira kriterijev vrste filtra
 * 
 * Izhodni podatki:
 * collection izbranih kriterijev vrste filtra
 */
define([
    'radio',
    'i18next',
    'backbone',
    'underscore',
    'marionette'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Marionette
        ) {

    var VrstaFiltraView = Marionette.LayoutView.extend({});

    /**
     * Poskrbeli bomo da lahko nastavljamo različne viewje kot optione
     * @param Array options
     * @returns {undefined}
     */
    VrstaFiltraView.prototype.initialize = function (options) {
        this.template = '';
        this.DolociView = options.DolociView || this.DolociView;
    };

    /**
     * Kaj se zgodi ko se izriše vrstafiltra view
     * @param {type} options
     * @returns {undefined}
     */
    VrstaFiltraView.prototype.onRrender = function (options) {

    };

    /**
     * Izpis seznama kriterijev
     * @param {type} options
     * @returns {undefined}
     */
    VrstaFiltraView.prototype.renderSeznamKriterijev = function (options) {

    };
    /**
     * povzetek, podatkov iz collectiona
     * @param {type} options
     * @returns {undefined}
     */
    VrstaFiltraView.prototype.renderPovzetek = function (options) {

    };

    /**
     * kaj se zgodi ko želimo izbrati kriterije vrste filtra
     * @param {type} options
     * @returns {undefined}
     */
    VrstaFiltraView.prototype.onDolociKriterije = function (options) {
        if (this.DolociView) {
            var dolociView = new this.DolociView(filteredOptions);
            
        }
    };

    return VrstaFiltraView;
});



