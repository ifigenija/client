define([
    'baseUrl',
    'app/Dokument/Model/Dokument'
], function (
        baseUrl,
        Dokument
        ) {
    
    var Permission = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/permission'
    });
    return {
        Model: Permission
    };
});