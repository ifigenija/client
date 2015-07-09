define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var TipFunkcijeModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/tipFunkcije'
    });
    return {
        Model: TipFunkcijeModel
    };
});