define(['underscore', 'backbone-forms'], function (_, Form) {
    var NumberEditor = Form.editors.Number.extend();

    var numRe = /^[-]*[0-9]*(\.[0-9]*)*(,[0-9]*)?$/;

    NumberEditor.prototype.initialize = function (options) {
        _.extend(this.events, {blur: 'onBlur'});
        Form.editors.Text.prototype.initialize.call(this, options);
        this.validators.push('validNumber');
        
        var formatOpts = {};
        if (options.schema.decimals) {
            formatOpts.decimals = options.schema.decimals;
        }
        
        this.formatter = new window.App.UI.Backgrid.NumberFormatter(formatOpts);

    };

    NumberEditor.prototype.onBlur = function (event) {
        var val = this.$el.val().trim();
        // če je nosno polje prazno, potem je vresnot 0
        if (val.length === 0) {
            this.setValue(0);
            return;
        }


        val = val.replace('.', '');
        val = val.replace(',', '.');
        if (isNaN(val)) {
            this.$el.parent().addClass('has-error');
            event.preventDefault();
            return false;

        } else {
            this.setValue(parseFloat(val));
        }
        this.$el.parent().removeClass('has-error');

    };

    NumberEditor.prototype.onKeyPress = function (event) {
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
        var char;
        if (event.charCode !== undefined) {
            char = String.fromCharCode(event.charCode);
            // števila v slovenski obliki '1000', '10,12', '1.000,23'
            // preverjanje je bolj loose, ker je onKeyPress
            var numeric = /[-0-9.,]/.test(char);
            if (numeric) {
                delayedDetermineChange();
            } else {
                event.preventDefault();
                return false;
            }
        }

    };

    NumberEditor.prototype.getValue = function () {
        // pretvori formatiran 10.000,123 zapis v float
        var value = this.$el.val().trim();
        if (numRe.test(value)) {
            var processed = value.replace('.', '').replace(',', '.');
            return value.length === 0 ? 0 : parseFloat(processed, 10);
        } else {
            return NaN;
        }
    };

    NumberEditor.prototype.setValue = function (value) {
        if (!_.isNumber(value)) {
            value = parseFloat(value);
        }
        value = this.formatter.fromRaw(value);
        this.$el.val(value);
    };

    return NumberEditor;
});