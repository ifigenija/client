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
        urlRoot: baseUrl + '/rest/programDela'
    });

    var Collection = PageableCollection.extend({
        url: baseUrl + '/rest/programDela',
        model: Model
    });

    return {
        Model: Model,
        Collection: Collection
    };

});