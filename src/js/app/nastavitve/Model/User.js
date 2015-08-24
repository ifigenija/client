define([
    'baseUrl',
    'app/Dokument/Model/Dokument'
], function (
        baseUrl,
        Dokument
        ) {
    
    var Uporabnik = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/user'
    });
    return {
        Model: Uporabnik
    };
});