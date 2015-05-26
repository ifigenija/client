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

    var VlogaDovoljenja = Dokument.Postavka.extend({
        urlRoot: baseUrl + '/rest/permission'
    });
    
    var VlogaDovoljenjaCollection = Dokument.PostavkaCollection.extend({
        model: VlogaDovoljenja,
        url: baseUrl + '/rest/role',
        /**
         * 
         * @param {array} models
         * @param {object} options
         * @returns {undefined}
         */
        initialize: function (models, options ){
            
        }
    });
    
    var VlogaModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/role',       
    });
    return {
        Model: VlogaModel
    };
});