define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var ZvrstSursModel = Dokument.Model.extend({
        urlRoot: '/rest/zvrstsurs'
    });
    return {
        Model: ZvrstSursModel
    };
});