define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var ZvrstUprizoritveModel = Dokument.Model.extend({
        urlRoot: '/rest/zvrstUprizoritve'
    });
    return {
        Model: ZvrstUprizoritveModel
    };
});