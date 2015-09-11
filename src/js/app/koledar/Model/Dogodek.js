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
    
    var DogodekCollection = Backbone.Collection.extend({
        model: DogodekModel,
        urlRoot: baseUrl + '/rest/dogodek'
    });
    return {
        Model: DogodekModel,
        Collection : DogodekCollection
    };
});