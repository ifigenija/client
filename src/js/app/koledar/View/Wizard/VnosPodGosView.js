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
        naslov: {
            title: i18next.t('ent.naslov'),
            name: 'naslov',
            type: 'Text',
            editorAttrs: {
                class: 'naziv-polje form-control',
                type: 'naziv',
                name: 'naslov',
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
        template: Handlebars.compile('<form><div class="row"><div class="col-sm-6" data-fields="naslov,vrsta"></div><div class="col-sm-6" data-fields="drzava,barva"></div></div></form>'),
        schema: schema
    });

    VnosPodGosView.prototype.initialize = function (options) {
        Form.prototype.initialize.apply(this, arguments);

        if (options && options.model) {
            this.naslov = options.model.get('naslov');
            this.drzava = options.model.get('drzava');
            this.vrsta = options.model.get('vrsta');
            this.barva = options.model.get('barva');
        }

        this.on('change', this.onChange, this);
    };

    VnosPodGosView.prototype.render = function (options) {
        Form.prototype.render.apply(this, arguments);
        if (this.naslov) {
            this.fields.naslov.editor.setValue(this.naslov);
        }
        if (this.drzava) {
            this.fields.drzava.editor.setValue(this.drzava);
        }
        if (this.vrsta) {
            this.fields.vrsta.editor.setValue(this.vrsta);
        }
        if (this.barva) {
            this.fields.barva.editor.setValue(this.barva);
        }
        this.trigger('change');
    };

    /**
     * V primeru tipavaje ni nujno da ga zberemo in mora imeti uporabnik možnost da nadaljuje
     * @returns {undefined}
     */
    VnosPodGosView.prototype.onChange = function () {
        var naslov = this.fields.naslov.getValue();
        var drzava = this.fields.drzava.getValue();
        var barva = this.fields.barva.getValue();
        var vrsta = this.fields.vrsta.getValue();

        if (naslov && drzava && barva) {
            this.model.set('naslov', naslov);
            this.model.set('drzava', drzava);
            this.model.set('vrsta', vrsta);
            this.model.set('barva', barva);
            this.trigger('ready', this.model);
        } else {
            this.trigger('ready', this.model);
        }
    };

    return VnosPodGosView;
});