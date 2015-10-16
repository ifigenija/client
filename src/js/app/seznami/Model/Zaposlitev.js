define([
    'baseUrl',
    'app/Dokument/Model/Dokument',
    'underscore',
    'app/Max/Model/MaxPageableCollection'
], function (
        baseUrl,
        Dokument,
        _,
        Paginator
        ) {    
    var ZaposlitevModel = Dokument.Model.extend({
        urlRoot: baseUrl + '/rest/zaposlitev'
    });
    
    var Zaposlitve = Paginator.extend({
        model: ZaposlitevModel,
        initialize: function(options) {
            this.orgEnota = null;
        },
        state: {
            pageSize: 20,
            currentPage: 1
        },
        mode: "server",
        // the URL (or base URL) for the service
        url: baseUrl + '/rest/zaposlitev',
        setOrgEnota: function(orgEnota) {
            this.orgEnota = orgEnota;
            this.queryParams.organizacijskaenota = this.orgEnota.id;
        }
    });
    
    return {
        Model: ZaposlitevModel,
        Collection: Zaposlitve
    };
});