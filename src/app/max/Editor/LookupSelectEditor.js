/**
 * Modul za toone relacije, ki se jih ureja po referenci z lookup collection
 *
 * Gre za form element, ki se uporablja pri javascript formah
 */

define([
    'backbone-forms',
    'backbone',
    'marionette',
    'underscore',
    'jquery',
    '../Model/LookupModel',
    '../View/LookupGrid'
], function (  
        Form,
        Backbone,
        Marionette,
        _,
        $,
        LookupModel,
        LookupGrid) {

    var toone = Form.editors.Select.extend({
        defaultValue: null,
    });


    var OpModel = LookupModel.model.extend({
        toString: function () {
            return this.get('ident') + ' / ' + this.get('label');
        }
    });


    toone.prototype.initialize = function (options) {
        // ali je prva sprememba vrednosti (da ne izpraznimo slave fieldov ko prvič napolnimo form)
        this._firstChange = true;

        Form.editors.Base.prototype.initialize.call(this, options);

        // če model nima id-ja, ga izbrišemo (backbone po defaultu ustvari praznega)
        if (this.model && !this.model.id) {
            this.model = null;
        }

        var schema = this.schema;

        // kolekcija in model
        this.collection = new LookupModel.collection(null, {
            entity: schema.targetEntity,
            model: OpModel
        });
        _.bindAll(this, 'determineChange');

        // Upoštevam filtre
        if (schema.filters) {
            this.filters = schema.filters;

            // obesimo event na master element, tako da ob spremembi mastera počistimo sebe
            for (var attribute in this.filters) {
                var value = this.filters[attribute];
                if (_.isObject(value) && value.element) {
                    this.form.on(value.element + ':change', this.onMasterChange, this);
                }
            }
        }

        // this.listenTo(this.collection, 'sync', this.cacheLookup);
    };

    var hashCode = function (str) {
        var hash = 0;
        if (str.length === 0) {
            return hash;
        }
        for (var i = 0; i < str.length; i++) {
            var character = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    /**
     * počisti vnosna polja
     * @returns {undefined}
     */
    toone.prototype.clearInput = function () {
        this.$el.val('');
        _.debounce(this.determineChange, 50)();
    };

    toone.prototype.cacheLookup = function (coll) {
        var key = this.computeCacheKey();
        sessionStorage.setItem(key, coll.toJSON());
    };

    toone.prototype.computeCacheKey = function (filter) {
        var str = '';
        _.each(filter, function (v, k) {
            str += v + k;
        });
        str += this.schema.targetEntity;
        return hashCode(str);

    };

    toone.prototype.loadOptions = function () {

        // Upoštevaj filtre
        var filterVals = this.getFilterArgs();
        // var json;

        // var key = this.computeCacheKey(filterVals);
        // json = sessionStorage.getItem(key);
        // if (json) {
        //    this.collection.reset(JSON.parse(json));
        //} else {
        this.collection.queryParams.filter = filterVals;
        this.collection.reset();

        //}
        var masterValues = true,
                tmp;
        // preverim če imajo master polje vrednosti
        for (var attribute in this.filters) {
            var filterDef = this.filters[attribute];

            if (_.isObject(filterDef) && filterDef.element) {
                tmp = this.form.getValue(filterDef.element);
                if (typeof tmp === "undefined" || tmp === null || tmp === "") {
                    masterValues = false;
                }
            }
        }
        if (masterValues) {
            console.log('load options');
            this.setOptions(this.collection);
        }

    };
    toone.prototype.render = function () {
        this.loadOptions();
        return this;
    };
    toone.prototype.getFilterArgs = function () {
        var result = {};
        _.each(this.filters, function (val, filter) {
            var value = null;
            // Vrednost iz form elementa?
            if (val.element) {
                value = this.form.fields[val.element].getValue();
                // Če je zloadan cel objekt, vrnem id namesto vsega
                if (value && value.id) {
                    value = value.id;
                }
                // Navadna vrednost?
            } else {
                value = val;
            }

            if (value !== '') {
                result[filter] = value;
            }
        }, this);
        return result;
    };



    toone.prototype.onMasterChange = function (form, editor) {
        // če se spremeni master tega editorja, spraznimo sebe
        if (!editor._firstChange) {
            this.clearInput();
            this.loadOptions();
        }

    };


    return toone;

});
