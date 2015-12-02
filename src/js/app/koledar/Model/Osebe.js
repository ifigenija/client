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
        urlRoot: baseUrl + '/rest/oseba'
    });
    var Collection = Collection.extend({
        url: baseUrl + '/rest/oseba',
        model: Model,
        mode: "server"
    });

    return Collection;

});


