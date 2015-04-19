define([   
    'backbone',
    'underscore',
    'backbone-forms',
    'jquery',
    'moment',
    'lib/bootstrap-datepicker'
], function (Backbone, _, Form, $, moment) {

var App;


    var cena = {
        defaultValue: null,
        template: _.template('<div class="input-group lookup">\
            <span class="input-group-addon"><i class="fa fa-money"></i></span>\
    <input type="text" name="<%= key %>" class="form-control decimal-polje" autocomplete="off"/>\
    <span class="input-group-addon cenik-button">Cenik</span>\
</div>\
<div class="lookup-description"></div>'),
        previousValue: '',
        events: {
            'keyup input.form-control': 'keyup',
            'keypress input.form-control': 'onKeyPress',
            'change': 'onKeyPress',
            'click .cenik-button': 'showCenik',
            'select': function (event) {
                this.trigger('select', this);
            },
            'focus': function (event) {
                this.trigger('focus', this);
            },
            'blur': function (event) {
                this.trigger('blur', this);
            }
        },
        initialize: function (options) {
            
            Form.editors.Base.prototype.initialize.call(this, options);
            var schema = options.schema || this.schema || {};
            schema.editorAttrs.type = 'text';
            this.schema = schema;

            this.formatter = new window.App.UI.Backgrid.NumberFormatter();

            // Upoštevam filtre
            if (schema.editorAttrs.filters) {
                this.filters = schema.editorAttrs.filters;
                delete schema.editorAttrs.filters;
            }

            _.bindAll(this, 'setValue');
            _.bindAll(this, 'onKeyPress');

        },
        onKeyPress: function (event) {
            var self = this;
            var delayedDetermineChange = function () {
                setTimeout(function () {
                    self.determineChange();
                }, 0);
            };

            // allow backspace
            if (event.charCode === 0) {
                delayedDetermineChange();
                return;
            }

            // get the whole new value so that we can prevent things like double decimals points etc.
            var newVal = this.$el.val();
            if (event.charCode !== undefined) {
                newVal = newVal + String.fromCharCode(event.charCode);
            }

            // števila v slovenski obliki '1000', '10,12', '1.000,23'
            // preverjanje je bolj loose, ker je onKeyPress
            var numeric = /^[0-9]*(\.[0-9]*)*(,[0-9]*)?$/.test(newVal);
            if (numeric) {
                delayedDetermineChange();
            }
            else {
                event.preventDefault();
            }
        },
        setValue: function (value) {
            value = this.formatter.fromRaw(value);
            this.$('input.form-control').val(value);
        },
        getValue: function (value) {

            var val = this.formatter.toRaw(this.$('input.form-control').val());

            return val === "" ? null : parseFloat(val, 10);
        },
        focus: function () {
            if (this.hasFocus) {
                return;
            }
            this.$('input.form-control').focus();
        },
        blur: function () {
            if (!this.hasFocus) {
                return;
            }
            this.$('input.form-control').blur();
        },
        select: function () {
            this.$('input.form-control').select();
        },
        render: function () {
            var self = this;
            this.$el.html(this.template({schema: this.schema, key: this.key}));
            this.setValue(this.value);
            this.$el.removeClass('form-control');
            if (typeof this.schema.editorAttrs.disabled !== 'undefined' && this.schema.editorAttrs.disabled) {
                this.$('input.form-control').prop('disabled', 'disabled');
            }
            this.$('input.form-control').prop('name', this.editorId);

            return this;
        },
        showCenik: function () {

            // Upoštevaj filtre
            var filterVals = {};
            var self = this;
            _.each(this.filters, function (val, filter) {
                var value = null;
                // Vrednost iz form elementa?
                if (val.element) {
                    value = self.form.fields[val.element].getValue();
                    // Če je zloadan cel objekt, vrnem id namesto vsega
                    if (value && value.id) {
                        value = value.id;
                    }
                    // Navadna vrednost?
                } else if (val) {
                    value = val;
                }

                if (value) {
                    filterVals[filter] = value;
                }

            });

            if (!filterVals.artikel) {
                window.App.FlashManager.flash({
                    message: 'Artikel ni izbran. Cenika ne morem prikazati.',
                    severity: 'info'
                });
            } else {
                // pokliči okno cenika   
                // funkcijo dodamo na cena.prototype v modulu materialno
               this.izberiCeno(filterVals, this.setValue);

            }

        }
        

    };
    var Cena = Form.editors.Base.extend(cena);

    return Cena;
});