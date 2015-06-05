define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var BesediloModel = Dokument.Model.extend({
        urlRoot: baseUrl + baseUrl + '/rest/besedilo'
    });
    return {
        Model: BesediloModel
    };
});