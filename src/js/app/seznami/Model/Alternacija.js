define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var AlternacijaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/alternacija'
    });
    return {
        Model: AlternacijaModel
    };
});