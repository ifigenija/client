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
    var BesediloModel = Dokument.Model.extend({
        urlRoot: baseUrl + baseUrl + '/rest/besedilo'
    });
    return {
        Model: BesediloModel
    };
});