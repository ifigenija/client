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
        urlRoot: '/rest/besedilo'
    });
    return {
        Model: BesediloModel
    };
});