define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var AbonmaModel = Dokument.Model.extend({
        urlRoot: '/rest/abonma'
    });
    return {
        Model: AbonmaModel
    };
});