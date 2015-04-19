define([
    'baseUrl',
    'backbone',
    'underscore',
    'backgrid',
    'lib/pageable'
], function(baseUrl, Backbone, _, Backgrid, PageableCollection) {

    var LookupModel = Backbone.Model.extend({
        defaults: {
            id: '',
            label: '',
            ident: '',
            description: ''
        },
        nextElement: function(count) {
            var index = this.collection.indexOf(this);
            count = count || 1;
            if ((index + count) >= this.collection.length) {
                //It's the last model in the collection so return null
                return this.collection.last();
            }
            return this.collection.at(index + count);
        },
        prevElement: function(count) {
            var index = this.collection.indexOf(this);
            count = count || 1;
            if (index <= count) {
                return this.collection.first();
            }
            return this.collection.at(index - count);
        }
    });

    var collection = PageableCollection.extend({
        initialize: function(models, options) {
            this.entity = options.entity;
            this.fullEntity = options.fullEntity;
            this.master = '';
            this.srch = {};
        },
        model: LookupModel,
        state: {
            pageSize: 30,
            currentPage: 1
        },
        mode: "server",
        url: function() {
            var base = baseUrl + '/tip/lookup/' + this.entity;
            if (this.master) {
                base = base + '/' + this.master;
            }
            return base;
        },
        lookup: function(srch, options) {
            options = options || {};
            this.state.q = srch;
            this.state.fullEntity = this.fullEntity;

            this.getFirstPage(options);
        },
        findById: function(id, options) {
            options = options || {};
            options.data = {
                ids: id,
                all: options.fullEntity
            };
            this.getFirstPage(options);
        },
        findByIdent: function(id, options) {
            options = options || {};
            options.data = {
                ident: id,
                all: this.fullEntity
            };
            this.getFirstPage(options);
        },
        getMeta: function() {
            return this.meta;
        },
        parseState: function(resp, queryParams, state, options) {
            if (resp && _.isObject(resp.meta)) {
                this.meta = resp.meta;
                _.each(this.meta, function(item) {
                    if (item.cell === 'select' && item.optionValues) {
                        item.cell = Backgrid.SelectCell.extend({optionValues: _.pairs(_.invert(item.optionValues))});
                    }
                });
            }
            if (resp && _.isObject(resp.state)) {
                var newState = _.clone(state);
                var serverState = resp.state;
                _.extend(newState, serverState);
                return newState;
            }
        },
        parseRecords: function(resp, options) {
            if (resp && _.isArray(resp.data)) {
                return resp.data;
            }

            return resp;
        },
        setFilter: function(fieldname, value) {
            this.queryParams.filter[fieldname] = value;
        }
    });


    return {collection: collection, model: LookupModel};

});