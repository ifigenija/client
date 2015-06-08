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

    var Uporabnik = Backbone.Model.extend({
        urlRoot: baseUrl + '/rest/user'      
    });
    
    return {
        Model: Uporabnik
    };
});