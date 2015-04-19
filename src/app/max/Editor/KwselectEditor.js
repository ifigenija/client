
/**
 * Modul za toone relacije, ki se jih ureja po referenci z lookup collection
 *
 */

define(['backbone-forms',
    'underscore',
    'marionette',
    'jquery',
    'moment'],
        function(Form, _, Marionette, $, moment) {

            /**
             * KW editor
             *
             * Schema options
             * @param {Number|String} [options.schema.yearStart]  First year in list. Default: 100 years ago
             * @param {Number|String} [options.schema.yearEnd]    Last year in list. Default: current year
             *
             */
            var Kwselect = Form.editors.Base.extend({
                events: {
                    'change select': function() {
                        this.updateHidden();
                        this.trigger('change', this);
                    },
                    'focus select': function() {
                        if (this.hasFocus) {
                            return;
                        }
                        this.trigger('focus', this);
                    },
                    'blur select': function() {
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
                    Form.editors.Base.prototype.initialize.call(this, options);
                    var today = moment();
                    //Schema defaults
                    this.schema = _.extend({
                        yearStart: today.year() - 10,
                        yearEnd: today.year() + 10
                    }, options.schema || {});
                    //Cast to Date
                    if (this.value && !_.isDate(this.value)) {
                        this.value = new Date(this.value);
                    }

                    //Set default date
                    if (!this.value) {
                        this.value = today.isoWeek() + '-' + today.isoWeekYear();
                    }

                    //Template
                    this.template = options.template || this.constructor.template;
                },
                render: function() {
                    var options = this.options,
                            schema = this.schema;
                    var weeksOptions = _.map(_.range(1, 53), function(date) {
                        return '<option value="' + date + '">' + date + '</option>';
                    });
                    var yearRange = (schema.yearStart < schema.yearEnd) ? _.range(schema.yearStart, schema.yearEnd + 1) : _.range(schema.yearStart, schema.yearEnd - 1, -1);
                    var yearsOptions = _.map(yearRange, function(year) {
                        return '<option value="' + year + '">' + year + '</option>';
                    });
                    //Render the selects
                    var $el = $($.trim(this.template({
                        weeks: weeksOptions.join(''),
                        years: yearsOptions.join('')
                    })));
                    //Store references to selects
                    this.$weeks = $el.find('[data-type="weeks"]');
                    this.$year = $el.find('[data-type="year"]');
                    //Create the hidden field to store values in case POSTed to server
                    this.$hidden = $('<input type="hidden" name="' + this.key + '" />');
                    $el.append(this.$hidden);
                    //Set value on this and hidden field
                    this.setValue(this.value);
                    //Remove the wrapper tag
                    this.setElement($el);
                    this.$el.attr('id', this.id);
                    this.$el.attr('name', this.getName());
                    if (this.hasFocus) {
                        this.trigger('blur', this);
                    }
                    return this;
                },
                /**
                 * @return {Date}   Selected date
                 */
                getValue: function() {
                    var year = this.$year.val(),
                            week = this.$week.val();
                    if (!year || !week) {
                        return null;
                    }
                    return year + '-' + week;
                },
                /**
                 * @param {Date} date
                 */
                setValue: function(date) {
                    this.$date.val(date.getDate());
                    this.$month.val(date.getMonth());
                    this.$year.val(date.getFullYear());
                    this.updateHidden();
                },
                focus: function() {
                    if (this.hasFocus) {
                        return;
                    }
                    this.$('select').first().focus();
                },
                blur: function() {
                    if (!this.hasFocus) {
                        return;
                    }
                    this.$('select:focus').blur();
                },
                /**
                 * Update the hidden input which is maintained for when submitting a form
                 * via a normal browser POST
                 */
                updateHidden: function() {
                    var val = this.getValue();
                    if (_.isDate(val)) {
                        val = val.toISOString();
                    }
                    this.$hidden.val(val);
                },
                getWeek: function(d) {

                    // Create a copy of this date object
                    var target = new Date(d.valueOf());
                    // ISO week date weeks start on monday
                    // so correct the day number
                    var dayNr = (d.getDay() + 6) % 7;
                    // Set the target to the thursday of this week so the
                    // target date is in the right year
                    target.setDate(target.getDate() - dayNr + 3);
                    // ISO 8601 states that week 1 is the week
                    // with january 4th in it
                    var jan4 = new Date(target.getFullYear(), 0, 4);
                    // Number of days between target date and january 4th
                    var dayDiff = (target - jan4) / 86400000;
                    // Calculate week number: Week 1 (january 4th) plus the
                    // number of weeks between target date and january 4th
                    var weekNr = 1 + Math.ceil(dayDiff / 7);
                    return weekNr;
                },
                //STATICS
                template: _.template('\
    <div>\
      <select class="teden-polje" data-type="week"><%= weeks %></select>\
      <select class="leto-polje" data-type="year"><%= years %></select>\
    </div>', null, Form.templateSettings)
            });
            return Kwselect;
        });