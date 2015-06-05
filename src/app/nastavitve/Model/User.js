define([
    'baseUrl',
    'backbone',
    'underscore',
    'app/Max/Model/RelationCollection'
], function (
        baseUrl,
        Backbone,
        _,
        RelationColl
        ) {

    var UporabnikModel = Backbone.Model.extend({
        urlRoot: baseUrl + '/rest/user'      
    });
    
    return {
        Model: UporabnikModel
    };
});