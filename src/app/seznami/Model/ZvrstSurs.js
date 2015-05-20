define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore',
    'baseUrl'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var ZvrstSursModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/zvrstSurs'
    });
    return {
        Model: ZvrstSursModel
    };
});