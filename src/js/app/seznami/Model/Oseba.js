define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {

    var OsebaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/oseba'
    });
    return {
        Model: OsebaModel
    };
});