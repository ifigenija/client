define([
    'backbone',
    'backbone-forms',
    'jquery',
    'moment',
    'bootstrap-datepicker'
], function(Backbone, Form, $, moment) {

    var DATE_FORMAT = 'DD.MM.YYYY';
    var DatePicker = Form.editors.Text.extend({
        initialize: function(options) {
            Backbone.Form.editors.Text.prototype.initialize.call(this, options);
            this.$el.addClass('datepicker input-small-custom');
            this.$el.attr('type', 'text');
            this.$el.datetimepicker({
                format: 'DD.MM.YYYY',
                locale: moment.locale(),

            }).on('changeDate', function(ev) {
                $(this).datetimepicker('hide'); //close when select a date
            });
            
            this.validators = options.schema.validators || [];
            this.validators.push('validDate');
        },
        getValue: function() {
            var val = this.$el.val();
            if (val) {
                moment.locale();
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
            this.$el.datetimepicker({
                format: 'DD.MM.YYYY',
                locale: moment.locale(),
                
            });
            this.$el.datetimepicker('update');

            return this;
        }
    });
    return DatePicker;
});