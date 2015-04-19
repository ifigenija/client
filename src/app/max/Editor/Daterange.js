/**
 * Modul za date range picker
 */

define([
    'backbone-forms',
    'underscore',
    'marionette',
    'jquery',
    'moment'],
        function(Form, _, Marionette, $, moment) {

            var DATE_FORMAT = 'DD.MM.YYYY';
            var Daterange = Form.editors.Base.extend({
                events: {
                    'change input': function() {

                        this.trigger('change', this);
                    },
                    'focus input': function() {
                        if (this.hasFocus) {
                            return;
                        }
                        this.trigger('focus', this);
                    },
                    'blur input': function() {
                        if (!this.hasFocus) {
                            return;
                        }
                        var self = this;
                        setTimeout(function() {
                            if (self.$('select:focus')[0]) {
                                return;
                            }
                            self.trigger('blur', self);
                        }, 0);
                    }
                },
                initialize: function(options) {
                    options = options || {};

                    this.value = options.value;
                    var schema = this.schema = options.schema;
                    //Store important data
                    _.extend(this, _.pick(options, 'key', 'form'));

                    this.validators = options.validators || schema.validators || [];
                    this.validators.push('validDateRange');
                    
                    //Set default date
                    if (!this.value) {
                        this.value = {start: null, end: null};
                    }

                },
                render: function() {
                    var options = this.options;


                    this.$el.append(this.template());
                    this.$start = this.$('.range-start');
                    this.$end = this.$('.range-end');

                    this.$('input').datepicker({
                        format: 'dd.mm.yyyy',
                        language: moment.lang(),
                        weekStart: 1,
                        calendarWeeks: true
                    }).on('changeDate', function(ev) {
                        $(this).datepicker('hide'); //close when select a date
                    });
                    this.setValue(this.value);
                    this.$('input').datepicker('update');

                    if (this.hasFocus) {
                        this.trigger('blur', this);
                    }
                    return this;
                },
                /**
                 * @return {Date}   Selected date
                 */
                getValue: function() {
                    var startm = moment.utc(this.$start.val(), DATE_FORMAT);
                    var endm = moment.utc(this.$end.val(), DATE_FORMAT);
                    var val = {
                        start: startm.isValid() ? startm.toISOString() : '',
                        end: endm.isValid() ? endm.toISOString() : ''
                    };
                    return val;
                },
                /**
                 * @param {Object} range
                 */
                setValue: function(range) {
                    if (range.start) {
                        this.$start.val(moment(range.start).format(DATE_FORMAT));
                    } else {
                        this.$start.val('');
                    }
                    if (range.end) {
                        this.$end.val(moment(range.end).format(DATE_FORMAT));
                    } else {
                        this.$end.val('');
                    }
                },
                focus: function() {
                    if (this.hasFocus) {
                        return;
                    }
                    this.$('input').first().focus();
                },
                blur: function() {
                    if (!this.hasFocus) {
                        return;
                    }
                    this.$('input:focus').blur();
                },
                //STATICS
                template: _.template('\
    <input class="range-start form-control" type="text"/>\
                <span class="input-group-addon"><i class="fa fa-calendar"></i></span><input class="range-end form-control" type="text"/>', null, Form.templateSettings)
            });
            return Daterange;
        });