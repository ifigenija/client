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
    var AlternacijaModel = Dokument.Model.extend({
        urlRoot: '/rest/alternacija'
    });
    return {
        Model: AlternacijaModel
    };
});