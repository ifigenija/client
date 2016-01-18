/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'underscore',
    'app/Max/Model/LookupModel'
], function (
        _,
        LookupModel
        ) {

    var KoledarModel = LookupModel.extend({});

    /**
     * Funkcija pretvori collection v polje objektov modelovih attributov.
     * @returns {Array|LookupModel@call;extend.prototype.getModels.polje}
     */
    KoledarModel.prototype.getResources = function () {
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