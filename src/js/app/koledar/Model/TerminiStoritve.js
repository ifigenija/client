/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'backbone',
    'app/Max/Model/MaxPageableCollection',
    './Alternacije',
    './Osebe',
    'deep-model'
], function (
        baseUrl,
        Backbone,
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

    Collection.prototype.pretvoriVAlternacije = function () {
        var coll = new Alternacije();

        var models = this.models;
        for (var id in models) {
            coll.add(models[id].get('alternacija'));
        }
        
        return coll;
    };

    Collection.prototype.pretvoriVOsebe = function () {
        var coll = new Osebe();

        var models = this.models;
        for (var id in models) {
            coll.add(models[id].get('oseba'));
        }
        
        return coll;
    };

    return Collection;

});


