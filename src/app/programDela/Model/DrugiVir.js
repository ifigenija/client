define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore'
], function (
        baseUrl,
        Dokument,
        _
        ) {    
    var Model = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/drugiVir'
    });    
    var Collection = Dokument.PostavkaCollection.extend({
        model: Model,
        url: baseUrl + '/rest/drugiVir'
    });
    
    return {
        Model: Model,
        Collection: Collection
    };
});