define(['baseUrl', 'backbone', 'underscore'], function (baseUrl, Backbone, _) {

    var field = Backbone.Model.extend({
        entity: 'Column'
    });

    var fields = Backbone.Collection.extend({
        model: field,
        /**
         * Definicije polj za formo
         *
         * @param {string} entity
         * @param {string} fieldset
         * @returns object
         */
        getSchema: function (entity, fieldset)
        {
            fieldset = fieldset | '';
            if (!entity) {
                throw 'Entiteta forme ne sme biti prazna';
            }

            var url = '/tip/formMeta' + (entity ? '/' + entity : '');
            if (fieldset) {
                url = url + '/fieldset/' + fieldset;
            }
            this.url = baseUrl + url;

            return this.cacheSchema('fieldset-meta.' + entity + '.' + fieldset);
        },
        /**
         * Definicije polj za filter formo
         *
         * @param {string} entity
         * @param {string} fieldset
         * @returns object
         */
        getFilter: function (formName)
        {
            var self = this;
            if (!formName) {
                throw "Ime forme je obvezno!!";
            }
            
            var cacheName = 'filter-meta.' + formName;
            this.parse = function (resp) {
                self.filterDefaults = JSON.stringify(resp.defaults);
                sessionStorage.setItem(cacheName  + '.defaults', self.filterDefaults);
                return resp.schema;
            };
            this.formName = formName;
            this.url = baseUrl + '/tip/filterFormMeta/' + formName;
            return this.cacheSchema(cacheName);
        },
        getDefaults: function () {
            if (this.filterDefaults) {
                return JSON.parse(this.filterDefaults);
            }
            return {}  ;
        },
        /**
         * Poišče definicijo forme v cache ali pa gre po nji na server, če še je ni
         * v session storage 
         * 
         * 
         * @param {string} name ime forme za katereo si bomo zapomnili metapodatke
         * @param {bool} disableCache izključi cache - vedno povprašaj na server 
         * @returns {undefined}
         */
        cacheSchema: function (name, disableCache) {
            var cache = null;
            if (!disableCache) {
                cache = sessionStorage.getItem(name);
            }
            var fm = Backbone.Wreqr.radio.channel('global');
            if (cache === null) {
                this.fetch({
                    async: false,
                    error: fm.fromXhr
                });
                var i = this.toJSON();
                var s = JSON.stringify(i);
                sessionStorage.setItem(name, s);
            } else {
                this.add(JSON.parse(cache));
                this.filterDefaults = sessionStorage.getItem(name + '.defaults');
            }

            return  this.toFormSchema();
        },
        /**
         * Pretvorimo kolekcijo v definico form scheme
         * 
         */
        toFormSchema: function () {
            var schema = {},
                    self = this;
            this.each(function (item) {
                schema[item.get('name')] = self.createFieldDefinition(item);
            });
            var result = {};
            result.schema = schema;
            result.fieldsets = this.getFieldsets();
            return result;
        },
        /**
         * Prečisti podatke iz strežnika, vzame samo to kar potrebujemo za
         * rendering forme ostalo pa ignorira
         * 
         * @param {Backbone.Model} def
         * @returns {Object}
         */
        createFieldDefinition: function (def) {

            var schema = _.pick(def.attributes, [
                'type',
                'targetEntity',
                'title',
                'name',
                'options',
                'prependIcon',
                'validators',
                'help',
                'editorAttrs',
                'decimals',
                'minLength',
                'subSchema',
                'filters',
                'fullEntity'
            ]);
            return schema;
        },
        /**
         * Zbere definicijo fieldseta po imenu skupine polj v group atributu
         * modelov iz kolekcije
         * @returns {}
         */
        getFieldsets: function () {
            var sets = this.groupBy(function (m) {
                return m.get('group');
            });
            // delete sets.undefined;
            sets = _.map(sets, function (set, key) {
                return {legend: key, fields: _.map(set, function (item) {
                        return item.get('name');
                    })};
            });
            return sets;
        }


    });
    return fields;
});