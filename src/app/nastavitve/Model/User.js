define([
    'baseUrl',
    'backbone',
    'underscore',
    'app/Max/Model/RelationCollection',
    'baseUrl'
], function (
        baseUrl,
        Backbone,
        _,
        RelationColl,
        baseUrl
        ) {

    var UporabnikModel = Backbone.Model.extend({
        urlRoot: baseUrl + '/rest/user'      
    });
    
    return {
        Model: UporabnikModel
    };
});