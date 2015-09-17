define([
    'baseUrl',
    'backbone'
], function (
        baseUrl,
        Backbone
        ) {
    var Model = Backbone.Model.extend({
        view: 'default',
        urlRoot: function () {
            return baseUrl + '/rest/dogodek/' + this.view;
        }
    });

    var Collection = Backbone.Collection.extend({
        model: Model,
        view: 'default',
        url: function () {
            return baseUrl + '/rest/dogodek/' + this.view;
        }
    });
    return {
        Model: Model,
        Collection: Collection
    };
});