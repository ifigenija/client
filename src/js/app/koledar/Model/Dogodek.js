define([
    'baseUrl',
    'backbone'
], function (
        baseUrl,
        Backbone
        ) {
    var DogodekModel = Backbone.Model.extend({
        urlRoot: baseUrl + '/rest/dogodek',
        initialize: function () {
            this.start = this.get('zacetek');
            this.end = this.get('konec');
        }
    });

    var DogodekCollection = Backbone.Collection.extend({
        model: DogodekModel,
        url: baseUrl + '/rest/dogodek'
    });
    return {
        Model: DogodekModel,
        Collection: DogodekCollection
    };
});