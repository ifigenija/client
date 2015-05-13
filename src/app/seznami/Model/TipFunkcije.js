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
        urlRoot: '/rest/tipFunkcije'
    });
    return {
        Model: TipFunkcijeModel
    };
});