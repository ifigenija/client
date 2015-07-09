define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {
    
    var Vloga = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/role'
    });
    return {
        Model: Vloga
    };
});