define([
    'baseUrl',
    'backbone',
    'underscore',
    'app/Max/Model/MaxPageableCollection'
], function (
        baseUrl,
        Backbone,
        _,
        PageableCollection
        ) {

    var Model = Backbone.Model.extend({
        urlRoot: baseUrl + '/rest/programDela/seznam'
    });

    var Collection = PageableCollection.extend({
        url: baseUrl + '/rest/programDela/seznam',
        model: Model
    });

    return {
        Model: Model,
        Collection: Collection
    };

});