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
        urlRoot: baseUrl + '/rest/abonma'
    });
    return {
        Model: AbonmaModel
    };
});