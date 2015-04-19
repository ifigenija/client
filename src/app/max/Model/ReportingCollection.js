define([
    'baseUrl',
    'underscore',
    'backbone',
    'lib/pageable'
], function (
        baseUrl,
        _,
        Backbone,
        PageableCollection
        ) {


    var collection = PageableCollection.extend({
        initialize: function (models, options) {

            this.onePage = options.onePage || false;
            if (options.sortKey) {
                this.state.sortKey = options.sortKey;
            }
            if (options.order) {
                this.state.order = options.order;
            }

            if (options.url) {
                this.url = baseUrl + options.url;
            }
        },
        model: Backbone.Model,
        mode: 'client',
        state: {
            firstPage: 1,
            lastPage: null,
            currentPage: null,
            pageSize: 15,
            totalPages: null,
            totalRecords: null,
            sortKey: 'sifra',
            order: -1
        },
        parseState: function (resp, queryParams, state, options) {
            if (resp && _.isObject(resp.meta)) {
                this.meta = resp.meta;
            }
            if (resp && _.isObject(resp.state)) {
                var serverState = _.omit(resp.state, 'lastPage', 'pagesize');
                if (this.onePage) {
                    serverState.pageSize = resp.state.totalRecords || 50;
                    serverState.totalPages = 1;
                } else {
                    serverState.pageSize = Number(localStorage.getItem('tip-per-page')) || 20;
                    serverState.totalPages = Math.max(Math.ceil(serverState.totalRecords / serverState.pageSize), 1);
                }
                return serverState;
            }
        },
        parseRecords: function (resp, options) {
            if (resp && _.isArray(resp.data)) {
                return resp.data;
            }
            return resp;
        }
    });
    return collection;
});