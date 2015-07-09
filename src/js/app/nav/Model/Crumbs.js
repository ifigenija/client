/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    
], function (Backbone) {
    
    
    var Model = Backbone.Model.extend({
        initialize: function(attributes,options) {
            this.on("change", this.handler, this);
        },
        handler: function(e) {
            console.log("spam");
        }
    });
    
    
    var Coll = Backbone.Collection.extend({
        model: Model,
        addCrumb: function (label, url) {
            this.add({
                label: label,
                url: url
            });

        }
    });
    
    
    return Coll;
    
});