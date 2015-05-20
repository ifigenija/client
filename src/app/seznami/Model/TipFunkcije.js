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
    var TipFunkcijeModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/tipFunkcije'
    });
    return {
        Model: TipFunkcijeModel
    };
});