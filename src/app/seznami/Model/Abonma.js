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
    var AbonmaModel = Dokument.Model.extend({
        urlRoot: '/rest/abonma'
    });
    return {
        Model: AbonmaModel
    };
});