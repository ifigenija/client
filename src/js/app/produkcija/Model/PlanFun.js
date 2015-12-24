/* 
 * Planirane funkcije
 * 
 * Licenca GPLv3
 */
define([
    'baseUrl',
    'backbone'
], function (
        baseUrl,
        Backbone
        ) {
    var PlanFun = Backbone.Collection.extend({
        url: function () {
            return baseUrl + '/rest/funkcija/planirane?uprizoritev=' + this.id;
        },
        initialize: function (attrs, opts) {
            this.id = attrs.uprizoritevId;
        }
    });
    return PlanFun;
});