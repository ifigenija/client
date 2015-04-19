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
    '../View/LookupGrid',
], function (
        Form,
        Backbone,
        Marionette,
        _,
        $,
        LookupModel,
        LookupGrid) {
    var toone = Form.editors.Base.extend({
        defaultValue: null,
        previousValue: '',
        template: _.template('<div class="input-group lookup">\
    <input type="text" name="<%= key %>_text" class="form-control"   autocomplete="off"/>\
    <span class="lookup-label input-group-addon"></span>\
</div><input type="hidden" name="<%= key %>"  class="lookup-id"/>\
<div class="lookup-description"></div>\
</div>'),
        events: {
            'keyup input.form-control': 'keyup',
            'blur input.form-control': 'onBlur',
            'keypress': function (event) {
                var self = this;
                _.debounce(function () {
                    self.determineChange();
                }, 10);
            },
            'select': function (event) {
                this.trigger('select', this);
            },
            'focus': function (event) {
                this.trigger('focus', this);
            },
            'blur': function (event) {
                this.trigger('blur', this);
            },
            'click .lookup-label': 'showLookup'
        },
        ui: {
            inpText: 'input.form-control',
            inpId: 'input.lookup-id',
            label: '.lookup-label',
            description: '.lookup-description'
        }
    });

    toone.prototype.initialize = function (options) {
        // ali je prva sprememba vrednosti (da ne izpraznimo slave fieldov ko prvič napolnimo form)
        this._firstChange = true;

        Form.editors.Base.prototype.initialize.call(this, options);

        this.flash = Backbone.Wreqr.radio.channel('global').FlashManager;
        // če model nima id-ja, ga izbrišemo (backbone po defaultu ustvari praznega)
        if (this.model && !this.model.id) {
            this.model = null;
        }

        var schema = this.schema;
        // kolekcija in model
        this.collection = new LookupModel.collection(null, {
            entity: schema.targetEntity,
            fullEntity: schema.fullEntity
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
    };
    /**
     * Adds the editor to the DOM
     */
    toone.prototype.render = function () {
        var self = this;
        this.$el.html(this.template({schema: this.schema, key: this.key}));
        Marionette.View.prototype.bindUIElements.call(this);
        this.setValue(this.value);
        this.$el.removeClass('form-control');
        if (typeof this.schema.editorAttrs.disabled !== 'undefined' && this.schema.editorAttrs.disabled) {
            this.ui.inpText.attr('disabled', 'disabled');

            this.ui.label.css('pointer-events', 'none');
            this.ui.label.css('cursor', 'default');
        }

        this.$el.find('input.form-control').prop('name', this.editorId);
        return this;
    };
    toone.prototype.determineChange = function (event) {
        var currentValue = this.ui.inpId.val();
        var changed = (currentValue !== this.previousValue);

        if (changed && !this._firstChange) {
            this.previousValue = currentValue;
            this.trigger('change', this);
        }
        this._firstChange = false;

    };
    /**
     * Odpiranje / zapiranje lookup-a
     * @param {type} opened
     * @returns {undefined}
     */
    toone.prototype.setOpened = function (opened) {
        if (!this.opened && opened === true) {
            this.showLookup();

        }
        if (this.opened && opened !== true) {
            this.hideLookup();
        }
        this.opened = opened === true;
    };
    /**
     * Returns the current editor value
     * @return {String}
     */
    toone.prototype.getValue = function () {
        if (this.schema.fullEntity) {
            if (!this.model) {
                return null;
            }
            return this.model.get('fullEntity');
        }
        return this.ui.inpId.val();
    };
    /**
     * počisti vnosna polja
     * @returns {undefined}
     */
    toone.prototype.clearInput = function (partial) {
        this.ui.inpId.val('');
        if (!partial) {
            this.ui.inpText.val('');
        }
        this.ui.label.html('(Brez)');
        //this.ui.description.html('');
        this.model = null;
        _.debounce(this.determineChange, 50)();
    };
    /**
     * Vpiše vrednosti modela v ui polja
     * @param {type} model
     * @returns {undefined}
     */
    toone.prototype.setInputs = function () {
        if (this.model && this.model.id) {

            this.ui.inpId.val(this.model.id);
            this.ui.inpText.val(this.model.get('ident'));
            this.ui.label.html(this.model.get('label'));
            //this.ui.description.html(model.get('description'));
        } else {
            this.ui.inpId.val('');
            this.ui.inpText.val('');
            this.ui.label.html('');
            //this.ui.description.html('');
        }

        _.debounce(this.determineChange, 50)();

    };
    /**
     * Sets the value of the form element
     * @param {String}
     */
    toone.prototype.setValue = function (value) {
        var self = this;
        var val;

        if (value === null || typeof value === 'undefined') {
            this.model = null;

            this.clearInput();
        } else {

            //coll.queryParams.all = this.schema.editorAttrs.fullEntity;
            if (this.schema.fullEntity) {
                if (value.id) {
                    val = value.id;
                } else {
                    val = value;
                }

                this.value = val;
                this.collection.findById(val, {
                    success: function (coll, response) {
                        self.model = coll.first();
                        self.setInputs();
                        self.hideLookup();
                    },
                    fullEntity: true
                });
            } else if (value instanceof Backbone.Model) {
                this.model = value;

                this.setInputs();
                this.hideLookup();
            } else if (_.isObject(value) && typeof value.id !== 'undefined' && typeof value.ident !== 'undefined' && typeof value.label !== 'undefined') {
                this.model = new Backbone.Model(value);
                this.setInputs();
            } else {
                if (value.id) {
                    this.value = value.id;
                } else {
                    this.value = value;
                }

                if (this.value) {
                    this.collection.findById(this.value, {
                        success: function (coll, response) {
                            self.model = coll.first();
                            self.setInputs();
                        }
                    });
                }
            }
        }
    };
    toone.prototype.focus = function () {
        if (this.hasFocus) {
            return;
        }
        this.ui.inpText.focus();
    };
    toone.prototype.onBlur = function () {
        if (this.cancelBlur) {
            delete this.cancelBlur;
            return;
        }
        if (!this.openingLookup) {
            if (this.ui.inpText.val() && !this.ui.inpId.val()) {
                this.resolvIdent();
            }
        } else {
            this.openingLookup = false;
        }

        //this.ui.inpText.blur();
    };
    toone.prototype.blur = function () {
        this.ui.inpText.blur();
    };
    /**
     * dogodek ki se odziva na pritisnjene tipke v input-u
     * @param {type} event
     * @returns {Boolean}
     */
    toone.prototype.keyup = function (event) {
        var self = this;
        if (event.which === 8 || event.which === 46) {
            this.clearInput(true);
        }
        if (event.which === 13) {
            this.resolvIdent();
        }
        if (event.which === 120 || event.which === 113) {
            this.showLookup();
        }
        return false;
    };
    toone.prototype.resolvIdent = function () {
        var self = this;
        this.collection.queryParams.filter = this.getFilterArgs();
        this.collection.findByIdent(this.ui.inpText.val(), {
            success: function (coll, response) {
                self.model = coll.first();
                self.setInputs();
            },
            error: function () {
                self.flash.fromXhr.apply(this, arguments);
                self.clearInput();
            }
        });

    };
    toone.prototype.select = function () {
        this.ui.inpText.select();
    };
    /**
     * prikaži lookup
     * @returns {undefined}
     */
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
    toone.prototype.showLookup = function () {
        var $e = $('<div class="lookup-modal"><div class="cnt"></div></div>');
        $('body').append($e);
        this.openingLookup = true;

        var coll = new LookupModel.collection(null, {
            entity: this.schema.targetEntity
        });

        // Upoštevaj filtre
        var filterVals = this.getFilterArgs();
        coll.queryParams.filter = filterVals;

        this.lookupgrid = new LookupGrid({
            collection: coll,
            fieldname: this.schema.title,
            search: this.ui.inpText.val(),
            el: $e,
            filters: filterVals
        });
        this.lookupgrid.render();
        this.listenTo(this.lookupgrid, 'close', this.hideLookup);
        this.listenTo(coll, 'selectValue', this.setValue);
    };
    toone.prototype.hideLookup = function () {
        if (!this.lookupgrid) {
            return;
        }
        this.lookupgrid.close();
        this.ui.inpText.select();
        this.stopListening(this.lookupgrid);
    };
    /**
     * Dodaj filter na lookup.
     * Fieldname nam pove, katero polje lookupa se bo filtriralo, value pa
     * je objekt, ki lahko ima več možnosti:
     *      -element: ime elementa v formi, iz katerega se vzeme vrednost
     *      -value: konstantna vrednost
     * 
     * @param {type} fieldName
     * @param {type} value
     * @returns {undefined}
     */
    toone.prototype.setFilter = function (fieldName, value) {
        if (!this.filters) {
            this.filters = {};
        }
        this.filters[fieldName] = value;
    };
    toone.prototype.onMasterChange = function (form, editor) {
        // če se spremeni master tega editorja, spraznimo sebe
        if (!editor._firstChange) {
            this.clearInput();
        }

    };

    return toone;
});
