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
    var ZvrstUprizoritveModel = Dokument.Model.extend({
        urlRoot: '/rest/zvrstUprizoritve'
    });
    return {
        Model: ZvrstUprizoritveModel
    };
});