define([
    'baseUrl',
    'Backbone',
    'app/Max/Model/LookupModel'
], function (
        baseUrl,
        Backbone,
        LookupModel
        ) {    
    var VrstaFiltra = Backbone.Model.extend({
        urlRoot: baseUrl + '/rest/abonma',
        collIzbira: LookupModel,
        collIzbrani: LookupModel
    });
    return {
        Model: VrstaFiltra
    };
});