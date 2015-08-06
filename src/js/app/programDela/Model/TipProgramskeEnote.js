define([
    'baseUrl',
    'backbone'
], function (
        baseUrl,
        Backbone
        ) {    
    var TPEModel = Backbone.Model.extend({
        urlRoot: baseUrl + '/rest/tipProgramskeEnote'
    });
    return TPEModel;
});