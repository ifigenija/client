define([
    'baseUrl',
    'app/Dokument/Model/Dokument'
], function (
        baseUrl,
        Dokument
        ) {
    
    var Vloga = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/role'
    });
    return {
        Model: Vloga
    };
});