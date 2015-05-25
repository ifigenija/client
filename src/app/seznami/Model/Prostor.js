define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore',
    'baseUrl'
], function (
        baseUrl,
        Dokument,
        _,
        baseUrl
        ) {    
    var ProstorModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/prostor'
    });
    return {
        Model: ProstorModel
    };
});