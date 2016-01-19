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

    this.schema = {
        title: {
            title: i18next.t('ent.naslov'),
            name: 'title',
            type: 'Text',
            editorAttrs: {
                class: 'naziv-polje form-control',
                type: 'naziv',
                name: 'title'
            }
        }
    };

    var IzbiraTipaVajeView = Form.extend({
        template: Handlebars.compile('<form><div data-fields="title"></form>'),
        schema: schema
    });

    IzbiraTipaVajeView.prototype.initialize = function (options) {
        Form.prototype.initialize.apply(this, arguments);

        if (options && options.model) {
            this.title = options.model.get('title');
        }

        this.on('change', this.nadaljuj, this);
    };

    IzbiraTipaVajeView.prototype.render = function (options) {
        Form.prototype.render.apply(this, arguments);
        if (this.title) {
            this.fields.title.editor.setValue(this.title);
        }
        this.trigger('change');
    };

    /**
     * V primeru tipavaje ni nujno da ga zberemo in mora imeti uporabnik možnost da nadaljuje
     * @returns {undefined}
     */
    IzbiraTipaVajeView.prototype.nadaljuj = function () {
        var title = this.fields.title.getValue();

        if (title) {
            this.model.set('title', title);
            this.trigger('ready', this.model);
        } else {
            this.trigger('ready', this.model);
        }
    };

    return IzbiraTipaVajeView;
});