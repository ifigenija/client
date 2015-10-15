define([
    'baseUrl',
    'app/Dokument/Model/Dokument'
], function (
        baseUrl,
        Dokument
        ) {
    var TipPopaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/tipPopa'
    });
    return {
        Model: TipPopaModel
    };
});