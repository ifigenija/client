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
    var PostaModel = Dokument.Model.extend({
        urlRoot: '/rest/posta'
    });
    return {
        Model: PostaModel
    };
});