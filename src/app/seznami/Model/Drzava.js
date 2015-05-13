define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var DrzavaModel = Dokument.Model.extend({
        urlRoot: '/rest/drzava'
    });
    return {
        Model: DrzavaModel
    };
});