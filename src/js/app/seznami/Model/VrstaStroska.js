define([
    'baseUrl',
    'app/Dokument/Model/Dokument'
], function (
        baseUrl,
        Dokument
        ) {
    var VrstaStroskaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/vrstaStroska'
    });
    return {
        Model: VrstaStroskaModel
    };
});