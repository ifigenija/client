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
    'app/bars',
    'template!../tpl/filter.tpl',
    'template!../tpl/vrsta-filtra.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Marionette,
        Handlebars,
        tpl,
        itemTpl
        ) {
    
    var VrstaFiltraView = Marionette.ItemView.extend({
        template: itemTpl,
        className: 'vrsta-filtra-item',
        triggers:{
            'click .vrsta-filtra-brisi' : 'brisi',
            'click .vrsta-filtra' : 'uredi'
        }
    });
    
    var FilterView = Marionette.CompositeView.extend({
        template: tpl,
        className: 'filter-select',
        childViewContainer: '.region-vrste-filtra',
        onChildviewUredi: function(item){
            console.log('uredi');
        },
        onChildviewBrisi: function(item){
            console.log('brisi');
        }
    });
    
    FilterView.prototype.getChildView = function(){
        return VrstaFiltraView;
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
    
    FilterView.prototype.onrender = function(options){
        this.renderToolbar();
    };
    
    FilterView.prototype.renderToolbar = function(){
        
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



