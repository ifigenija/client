define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var PostaModel = Dokument.Model.extend({
        urlRoot: '/rest/posta'
    });
    return {
        Model: PostaModel
    };
});