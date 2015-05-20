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
    var DrzavaModel = Dokument.Model.extend({
        urlRoot: '/rest/drzava'
    });
    return {
        Model: DrzavaModel
    };
});