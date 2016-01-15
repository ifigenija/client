/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'moment',
    'backbone',
    'underscore',
    'app/Max/Model/LookupModel'
], function (
        baseUrl,
        moment,
        Backbone,
        _,
        LookupModel
        ) {

    var KoledarModel = LookupModel.extend({});

    KoledarModel.prototype.getEventObjects = function () {
        var polje = [];
        if (this.models.length) {
            for (var key in this.models) {
                polje.push(_.clone(this.models[key].attributes));
            }
        }
        return polje;
    };

    return KoledarModel;

});