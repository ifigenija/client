define(['backbone-forms'], function (Form) {
    /*
     * Text ki sinhronizira podatke med .text() in .val() zato ker
     * selenium bere vrednosti textarea z .text()
     */
    var Text = Form.editors.Text.extend();

    Text.prototype.setValue = function (value) {
        this.$el.val(value);
        this.previousValue = this.$el.val();
    };

    return Text;
});