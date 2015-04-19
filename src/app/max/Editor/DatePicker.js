define([
    'backbone',
    'backbone-forms',
    'jquery',
    'moment',
    'lib/bootstrap-datepicker'
], function(Backbone, Form, $, moment) {

    var DATE_FORMAT = 'DD.MM.YYYY';
    var DatePicker = Form.editors.Text.extend({
        initialize: function(options) {
            Backbone.Form.editors.Text.prototype.initialize.call(this, options);
            this.$el.addClass('datepicker input-small-custom');
            this.$el.attr('type', 'text');
            this.$el.datepicker({
                format: 'dd.mm.yyyy',
                language: moment.lang(),
                weekStart: 1,
                calendarWeeks: true
            }).on('changeDate', function(ev) {
                $(this).datepicker('hide'); //close when select a date
            });
            
            this.validators = options.schema.validators || [];
            this.validators.push('validDate');
        },
        getValue: function() {
            var val = this.$el.val();
            if (val) {
                moment.lang();
                var m = moment.utc(val, DATE_FORMAT);
                var xvalue = m.toISOString();
                return xvalue;
            }
            return null;
        },
        setValue: function(value) {
            if (value) {
                var v = moment(value).format(DATE_FORMAT);
                this.$el.val(v);
            } else {
                this.$el.val(value);
            }
            return this;
        },
        render: function() {
            Backbone.Form.editors.Text.prototype.render.apply(this, arguments);
            this.$el.datepicker({
                format: 'dd.mm.yyyy',
                language: moment.lang(),
                weekStart: 1,
                calendarWeeks: true
            });
            this.$el.datepicker('update');

            return this;
        }
    });
    return DatePicker;
});