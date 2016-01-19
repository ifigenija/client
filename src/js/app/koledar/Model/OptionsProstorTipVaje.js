/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'app/Max/Model/LookupModel'
], function (
        LookupModel
        ) {

    var prostori, tipiVaje, loadCount = 0, cb;

    var sinhronizator = function () {
        loadCount++;
        if (loadCount === 2) {
            cb(prostori, tipiVaje);
        }
    };

    var prSuccess = function (collection) {
        prostori = {};
        collection.each(function (model) {
            prostori[model.get('id')] = model.get('ident') + ', ' + model.get('label');
        });

        sinhronizator();
    };

    var tvSuccess = function (collection) {
        tipiVaje = {};
        collection.each(function (model) {
            tipiVaje[model.get('id')] = model.get('ident') + ', ' + model.get('label');
        });
//        tipiVaje = collection.map(function (model) {
//            return [model.get('id'), model.get('label')];
//        });

        sinhronizator();
    };

    var loadOptions = function (callback) {
        cb = callback;

        if (prostori && tipiVaje) {
            callback(prostori, tipiVaje);
            return false;
        }

        var p = new LookupModel([], {
            entity: 'prostor'
        });

        p.fetch({
            success: prSuccess
        });

        var tv = new LookupModel([], {
            entity: 'tipVaje'
        });

        tv.fetch({
            success: tvSuccess
        });

        return false;
    };

    return loadOptions;

});