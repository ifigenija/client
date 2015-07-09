define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {
    
    var Permission = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/permission'
    });
    return {
        Model: Permission
    };
});