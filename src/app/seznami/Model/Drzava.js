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
        urlRoot: baseUrl + '/rest/drzava'
    });
    return {
        Model: DrzavaModel
    };
});