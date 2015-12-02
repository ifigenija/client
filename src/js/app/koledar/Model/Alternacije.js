/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'backbone',
    'app/Max/Model/MaxPageableCollection',
    'deep-model'
], function (
        baseUrl,
        Backbone,
        Collection
        ) {

    var Model = Backbone.DeepModel.extend({
        urlRoot: baseUrl + '/rest/alternacija'
    });
    var Collection = Collection.extend({
        url: baseUrl + '/rest/alternacija',
        model: Model,
        mode: "server"
    });

    Collection.prototype.razdeli = function () {
        var models = this.models;

        var object = {};

        for (var id in models) {
            var model = models[id];
            var podrocje = model.get('funkcija.tipFunkcije.podrocje');
            if (!object[podrocje]) {
                object[podrocje] = [];
            }

            object[podrocje].push(model);
        }

        return object;
    };

    return Collection;

});


