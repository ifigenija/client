define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var ZaposlitevModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/zaposlitev'
    });
    return {
        Model: ZaposlitevModel
    };
});