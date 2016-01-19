/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'app/bars',
    'app/Max/Module/Form'
], function (
        i18next,
        Handlebars,
        Form
        ) {

    var IzbiraTipaVajeView = Form.extend({
        template: Handlebars.compile('<form><div data-fields="tipvaje"></form>')
    });

    IzbiraTipaVajeView.prototype.initialize = function (options) {
        this.schema = {
            tipvaje: {
                title: i18next.t('tipVaje.title'),
                name: 'tipVaje',
                type: 'Select',
                targetEntity: 'tipVaje',
                options: options.schemaOptions,
                editorAttrs: {
                    class: 'form-control',
                    type: 'select',
                    name: 'tipVaje'
                }
            }
        };
        
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