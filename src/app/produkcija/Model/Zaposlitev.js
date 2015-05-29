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
    var ZaposlitevModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/zaposlitev'
    });
    return {
        Model: ZaposlitevModel
    };
});