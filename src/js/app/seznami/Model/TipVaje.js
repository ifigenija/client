define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var TipVajeModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/tipVaje'
    });
    return {
        Model: TipVajeModel
    };
});