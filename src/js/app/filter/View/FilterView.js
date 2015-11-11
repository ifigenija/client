/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhnodni podatki:
 *      vrste filtrov
 *      prednastavljeni filter
 *      {
 *      vrsta1:{ids:{}},
 *      vrsta2:{ids:{}}
 *      }
 *
 * Prikaz vrst filtrov
 * toolbar z gumboma dodaj vrsto filtra in ponastavi filtre
 * 
 * Izhodni podatki:
 *      {
 *      vrsta1:{ids:{}},
 *      vrsta2:{ids:{}}
 *      }
 */

define([
    'radio',
    'i18next',
    'backbone',
    'underscore',
    'marionette',
    '../tpl/filter.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Marionette,
        tpl
        ) {
    
    var FilterView = new Marionette.CompositeView.extend({
        template: tpl,
        childViewContainer: '.filter-vrstefiltra'
    });
    
    FilterView.prototype.getChildView = function(){
        return this.VrstaFiltraView;
    };
    
    /**
     * Poskrbeli bomo da lahko nastavljamo različne viewje kot optione
     * @param Array options
     * @returns {undefined}
     */
    FilterView.prototype.initialize = function(options){
        this.template = options.template || this.template;
        this.VrstaFiltraView = options.VrstaFiltraView || VrstaFiltraView;
    };
    
    FilterView.prototype.renderSeznam = function(options){
        
    };
    
    /**
     * Kaj se zgodi ko izberemo enga od vnosov
     * @param {type} options
     * @returns {undefined}
     */
    FilterView.prototype.onSelect = function(options){
        
    };
    
    /**
     * Kaj se zgodi ko zavržemo izbiro enga izbranih vnosov
     * @param {type} options
     * @returns {undefined}
     */
    FilterView.prototype.onDeselect = function(options){
        
    };

    return FilterView;
});



