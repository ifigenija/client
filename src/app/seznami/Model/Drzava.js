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
        urlRoot: baseUrl + '/rest/drzava'
    });
    return {
        Model: DrzavaModel
    };
});