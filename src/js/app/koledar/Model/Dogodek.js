define([
    'baseUrl',
    'backbone'
], function (
        baseUrl,
        Backbone
        ) {
    var DogodekModel = Backbone.Model.extend({
        urlRoot: baseUrl + '/rest/dogodek'
    });
    return DogodekModel;
});