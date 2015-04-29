define(['baseUrl', 'backbone', 'underscore', 'jquery'], function (baseUrl, Backbone, _, $) {

    var field = Backbone.Model.extend({
        entity: 'Column'
    });

    var fields = Backbone.Collection.extend({
        model: field
    });

    fields.prototype.getFormMeta = function (controller, view, callback) {
        if (!controller) {
            throw 'Controller ni bil podan';
        }

        var url = '/rest/' + controller;

        view = view | '';
        if (view)
        {
            url = url + '/' + view;
        }

        this.cacheSchema('fieldset-meta.' + controller + '.' + view, url, callback);
    };

    /**
     * Poišče definicijo forme v cache ali pa gre po nji na server, če še je ni
     * v session storage 
     * 
     * 
     * @param {string} name ime forme za katereo si bomo zapomnili metapodatke
     * @param {bool} disableCache izključi cache - vedno povprašaj na server 
     * @returns {undefined}
     */
    fields.prototype.cacheSchema = function (name, url, callback, disableCache) {
        var cache = null;
        var self = this;
        if (!disableCache) {
            cache = sessionStorage.getItem(name);
        }
        if (cache === null) {
            $.ajax({
                url: url,
                method: 'OPTIONS',
                mimeType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    //shrano modele v collection
                    for (var k in data) {
                        self.add(data[k]);
                    }

                    var result = self.toFormSchema();

                    sessionStorage.setItem(name, JSON.stringify(data));
                    callback(result.schema);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        } else {
            var data = JSON.parse(cache);
            for (var k in data) {
                self.add(data[k]);
            }
            
            this.filterDefaults = sessionStorage.getItem(name + '.defaults');
            var result = self.toFormSchema();
            callback(result.schema);
        }
    };

    /**
     * Pretvorimo kolekcijo v definico form scheme
     * 
     */
    fields.prototype.toFormSchema = function () {
        var schema = {},
                self = this;
        this.each(function (model) {
            schema[model.get('name')] = self.createFieldDefinition(model);
        });
        var result = {};
        result.schema = schema;
        result.fieldsets = this.getFieldsets();
        return result;
    };
    /**
     * Prečisti podatke iz strežnika, vzame samo to kar potrebujemo za
     * rendering forme ostalo pa ignorira
     * 
     * @param {Backbone.Model} def
     * @returns {Object}
     */
    fields.prototype.createFieldDefinition = function (def) {

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
    };
    /**
     * Zbere definicijo fieldseta po imenu skupine polj v group atributu
     * modelov iz kolekcije
     * @returns {}
     */
    fields.prototype.getFieldsets = function () {
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
    };

    /**
     * Definicije polj za filter formo
     *
     * @param {string} entity
     * @param {string} fieldset
     * @returns object
     */
    //potrebno spremeniti formname v controller
    fields.prototype.getFilter = function (formName)
    {
        var self = this;
        if (!formName) {
            throw "Ime forme je obvezno!!";
        }

        var cacheName = 'filter-meta.' + formName;
        this.parse = function (resp) {
            self.filterDefaults = JSON.stringify(resp.defaults);
            sessionStorage.setItem(cacheName + '.defaults', self.filterDefaults);
            return resp.schema;
        };
        this.formName = formName;
        this.url = baseUrl + '/tip/filterFormMeta/' + formName;
        return this.cacheSchema(cacheName);
    };
    /**
     * 
     * @returns {FormMetaCollection_L1.getDefaults.FormMetaCollectionAnonym$6|MYJSON.parse.j|JSON.parse.j|Array|Object}
     */
    fields.prototype.getDefaults = function () {
        if (this.filterDefaults) {
            return JSON.parse(this.filterDefaults);
        }
        return {};
    };

    return fields;
});