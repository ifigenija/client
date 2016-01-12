/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'app/Max/Module/Form'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        Form
        ) {

    var sch = {
        tipvaje: {
            type: 'Toone',
            targetEntity: 'tipvaje',
            title: i18next.t('vaja.tipvaje'),
            help: i18next.t('vaja.d.tipvaje'),
            editorAttrs: {
                class: 'form-control'
            }
        }
    };

    var IzbiraTipaVajeView = Form.extend({
        template: Handlebars.compile('<form><div data-fields="tipvaje"></form>'),
        schema: sch
    });

    IzbiraTipaVajeView.prototype.initialize = function (options) {
        Form.prototype.initialize.apply(this, arguments);

        if (options && options.model) {
            this.tipvaje = options.model.get('tipvaje');
        }

        this.on('change', this.nadaljuj, this);
    };

    IzbiraTipaVajeView.prototype.render = function (options) {
        Form.prototype.render.apply(this, arguments);
        if (this.tipvaje) {
            this.fields.tipvaje.editor.setValue(this.tipvaje);
        }
        this.trigger('change');
    };

    /**
     * V primeru tipavaje ni nujno da ga zberemo in mora imeti uporabnik možnost da nadaljuje
     * @returns {undefined}
     */
    IzbiraTipaVajeView.prototype.nadaljuj = function () {
        var tipvaje = this.fields.tipvaje.getValue();

        if (tipvaje) {
            this.model.set('tipvaje', tipvaje);
            this.trigger('ready', this.model);
        } else {
            this.trigger('ready', this.model);
        }
    };

    return IzbiraTipaVajeView;
});