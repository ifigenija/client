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
        barva: {
            type: 'ColorPicker',
            help: i18next.t('dogodek.d.barva'),
            title: i18next.t('dogodek.barva'),
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
        template: Handlebars.compile('<form><div class="row"><div class="col-sm-6" data-fields="title,vrsta"></div><div class="col-sm-6" data-fields="drzava,barva"></div></div></form>'),
        schema: schema
    });

    VnosPodGosView.prototype.initialize = function (options) {
        Form.prototype.initialize.apply(this, arguments);

        if (options && options.model) {
            this.title = options.model.get('title');
        }

        this.on('change', this.nadaljuj, this);
    };

    VnosPodGosView.prototype.render = function (options) {
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
    VnosPodGosView.prototype.nadaljuj = function () {
        var title = this.fields.title.getValue();

        if (title) {
            this.model.set('title', title);
            this.trigger('ready', this.model);
        } else {
            this.trigger('ready', this.model);
        }
    };

    return VnosPodGosView;
});