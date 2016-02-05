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
            title: i18next.t('ent.title'),
            name: 'title',
            type: 'Text',
            editorAttrs: {
                class: 'naziv-polje form-control',
                type: 'naziv',
                name: 'title',
                placeholder: i18next.t('std.vnosNaslova')
            }
        },
        drzava: {
            type: 'Toone',
            targetEntity: "drzava",
            title: i18next.t('ent.drzava'),
            editorAttrs: {
                class: 'form-control'
            }
        },
        vrsta: {
            type: 'Text',
            help: i18next.t('dogodek.d.vrsta'),
            title: i18next.t('dogodek.vrsta'),
            editorAttrs: {
                class: 'form-control'
            }
        }
    };

    var VnosPodGosView = Form.extend({
        template: Handlebars.compile('<form><div class="row"><div class="col-sm-6" data-fields="title,vrsta"></div><div class="col-sm-6" data-fields="drzava"></div></div></form>'),
        schema: schema
    });

    VnosPodGosView.prototype.initialize = function (options) {
        Form.prototype.initialize.apply(this, arguments);

        if (options && options.model) {
            this.title = options.model.get('title');
            this.drzava = options.model.get('drzava');
            this.vrsta = options.model.get('vrsta');
        }

        this.on('change', this.onChange, this);
    };

    VnosPodGosView.prototype.render = function (options) {
        Form.prototype.render.apply(this, arguments);
        if (this.title) {
            this.fields.title.editor.setValue(this.title);
        }
        if (this.drzava) {
            this.fields.drzava.editor.setValue(this.drzava);
        }
        if (this.vrsta) {
            this.fields.vrsta.editor.setValue(this.vrsta);
        }
        this.trigger('change');
    };

    /**
     * V primeru tipavaje ni nujno da ga zberemo in mora imeti uporabnik možnost da nadaljuje
     * @returns {undefined}
     */
    VnosPodGosView.prototype.onChange = function () {
        var title = this.fields.title.getValue();
        var drzava = this.fields.drzava.getValue();
        var vrsta = this.fields.vrsta.getValue();

        if (title && drzava) {
            this.model.set('title', title);
            this.model.set('drzava', drzava);
            this.model.set('vrsta', vrsta);
            this.trigger('ready', this.model);
        } else {
            this.trigger('not:ready', this.model);
        }
    };

    return VnosPodGosView;
});