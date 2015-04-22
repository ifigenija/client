/* 
 * Licenca GPLv3
 */

define(["backbone"],function (Backbone) {
    
    var Coll = Backbone.Collection.extend({
       model: Backbone.Model
    });
    
    return Coll;
});
