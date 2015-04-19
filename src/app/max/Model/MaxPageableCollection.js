define([
    'lib/pageable',
    'underscore'
], function (
        PageableCollection,
        _
        ) {
    var MaxPageableCollection = PageableCollection.extend({
        state: {
            firstPage: 1,
            lastPage: null,
            currentPage: null,
            pageSize: 15,
            totalPages: null,
            totalRecords: null,
            sortKey: null,
            order: -1
        },
        queryParams: {
            directions: {
                'asc': 'asc',
                'desc': 'desc'
            }
        },
        constructor: function (models, options) {
            this._filters = {};
            if (options && options.parent) {
                this.parent = options.parent;
            }
            PageableCollection.apply(this, arguments);
        },
        fetch: function (options) {
            options = options || {};
            if (!options.data) {
                options.data = {};
            }

            // dodaj filtre v query
            var filters = _.extend({}, this._filters, this.filters);
            for (var attribute in filters) {
                var value = filters[attribute];
                filters[attribute] = _.isFunction(value) ? value.call(this) : value;
            }
            _.defaults(options.data, filters);

            return PageableCollection.prototype.fetch.call(this, options);
        },
        getParentId: function () {
            return this.parent ? this.parent.id : undefined;
        },
        addFilter: function (attribute, value) {
            this._filters[attribute] = value;
        },
        parseState: function (resp, queryParams, state, options) {
            if (resp && _.isObject(resp.meta)) {
                this.meta = resp.meta;
            }
            if (resp && _.isObject(resp.state)) {
                var newState = _.clone(state);
                var serverState = resp.state;
                _.extend(newState, serverState);
                return newState;
            }
        },
        parseRecords: function (resp, options) {
            if (resp && _.isArray(resp.data)) {
                return resp.data;
            }
            return resp;
        }
    });
    return MaxPageableCollection;
});