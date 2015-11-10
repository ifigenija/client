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
    'app/Max/Model/MaxPageableCollection'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Marionette,
        Backgrid,
        Coll
        ) {
    
    var ToggleListView = new Marionette.LayoutView.extend({});
    
    /**
     * Poskrbeli bomo da lahko nastavljamo različne viewje kot optione
     * @param Array options
     * @returns {undefined}
     */
    ToggleListView.prototype.initialize = function(options){
        
    };
    
    ToggleListView.prototype.renderSeznam = function(options){
        
    };
    
    /**
     * Kaj se zgodi ko izberemo enga od vnosov
     * @param {type} options
     * @returns {undefined}
     */
    ToggleListView.prototype.onSelect = function(options){
        
    };
    
    /**
     * Kaj se zgodi ko zavržemo izbiro enga izbranih vnosov
     * @param {type} options
     * @returns {undefined}
     */
    ToggleListView.prototype.onDeselect = function(options){
        
    };

    return ToggleListView;
});



