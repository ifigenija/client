/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhodni podatki:
 *      - collection izbranih kriterijev
 * Izhod:
 *      - izpis podatkov v collectionu
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
    
    var KriterijFiltraView = Marionette.ItemView.extend({
        template: 'simple template'
    });
    
    var KriterijiFiltraView = Marionette.CollectionView.extend({
        template: 'simple template'
    });
    
    /**
     * Poskrbeli bomo da lahko nastavljamo različne viewje kot optione
     * @param Array options
     * @returns {undefined}
     */
    KriterijiFiltraView.prototype.initialize = function(options){
        
    };
    
    KriterijiFiltraView.prototype.renderSeznam = function(options){
        
    };

    return KriterijiFiltraView;
});





