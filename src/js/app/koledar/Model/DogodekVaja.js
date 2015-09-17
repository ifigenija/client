define([
    'baseUrl',
    'backbone'
], function (
        baseUrl,
        Backbone
        ) {
    var Model = Backbone.Model.extend({
        urlRoot: baseUrl + '/rest/dogodek/vaja'
    });

    var Collection = Backbone.Collection.extend({
        model: Model,
        url: baseUrl + '/rest/dogodek/vaja'
    });
    return {
        Model: Model,
        Collection: Collection
    };
});