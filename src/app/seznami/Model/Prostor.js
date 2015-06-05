define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var ProstorModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/prostor'
    });
    return {
        Model: ProstorModel
    };
});