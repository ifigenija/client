/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'backbone',
    'underscore',
    'app/Max/Model/MaxPageableCollection',
    './Alternacije',
    './Osebe',
    'deep-model'
], function (
        baseUrl,
        Backbone,
        _,
        Collection,
        Alternacije,
        Osebe
        ) {

    var Model = Backbone.DeepModel.extend({
        urlRoot: baseUrl + '/rest/terminStoritve'
    });
    var Collection = Collection.extend({
        url: baseUrl + '/rest/terminStoritve',
        model: Model,
        mode: "server"
    });

    Collection.prototype.razdeli = function () {
        var alterColl = new Alternacije();
        var osebeColl = new Osebe();

        var models = this.models;
        for (var id in models) {
            var model = models[id];
            var alter = model.get('alternacija');
            if (alter) {
                if (_.isObject(alter)) {
                    alterColl.add(alter);
                } else {
                    alterColl.add({id: alter});
                }
            } else {
                var oseba = model.get('oseba');

                if (_.isObject(oseba)) {
                    osebeColl.add(oseba);
                } else {
                    osebeColl.add({id: oseba});
                }
            }
        }

        return {
            osebe: osebeColl,
            alternacije: alterColl
        };
    };

    return Collection;

});


