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
                var model = this.models[key];
                var obj = _.clone(model.attributes);
                obj.start = moment(model.get('zacetek'));
                obj.end = moment(model.get('konec'));

                polje.push(obj);
            }
        }
        return polje;
    };

    return KoledarModel;

});