define(['backbone-forms'], function (Form) {
    /*
     * TextArea ki sinhronizira podatke med .text() in .val() zato ker
     * selenium bere vrednosti textarea z .text()
     */
    var TextArea = Form.editors.TextArea.extend();

    TextArea.prototype.getValue = function () {
        return this.$el.text();
    };

    TextArea.prototype.setValue = function (value) {
        this.$el.text(value);
        this.$el.val(value);
        this.previousValue = this.$el.val();
    };

    TextArea.prototype.determineChange = function (event) {
        var currentValue = this.$el.val();
        var changed = (currentValue !== this.previousValue);

        if (changed) {
            this.setValue(currentValue);
            this.trigger('change', this);
        }
    };

    return TextArea;
});