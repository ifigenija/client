define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var SezonaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/sezona'
    });
    return {
        Model: SezonaModel
    };
});