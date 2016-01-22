/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'app/Max/Module/Form',
    'options!dogodek.delte'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        Form,
        delte
        ) {

    var sch = {
        title: {
            title: i18next.t('ent.naslov'),
            name: 'title',
            type: 'Text',
            editorAttrs: {
                class: 'naziv-polje form-control',
                type: 'naziv',
                name: 'title'
            }
        },
        zacetek: {
            type: 'DateTimePicker',
            help: i18next.t('dogodek.d.zacetek'),
            title: i18next.t('dogodek.zacetek'),
            editorAttrs: {
                class: 'timestamp-polje form-control',
                'data-attach': 'datepicker',
                name: 'zacetek',
                prependIcon: 'fa fa-clock-o',
                type: 'datetime'
            }
        },
        konec: {
            type: 'DateTimePicker',
            help: i18next.t('dogodek.d.konec'),
            title: i18next.t('dogodek.konec'),
            editorAttrs: {
                class: 'timestamp-polje form-control',
                'data-attach': 'datepicker',
                name: 'konec',
                prependIcon: 'fa fa-clock-o',
                type: 'datetime'
            }
        },
        delZac: {
            type: 'Number',
            name: 'delZac',
            title: i18next.t('terminStoritve.delZac'),
            help: i18next.t('terminStoritve.d.delZac'),
            decimals: 0,
            editorAttrs: {
                class: 'integer-polje form-control',
                type: 'integer',
                name: 'delZac'
            }
        },
        delKon: {
            type: 'Number',
            name: 'delKon',
            title: i18next.t('terminStoritve.delKon'),
            help: i18next.t('terminStoritve.d.delKon'),
            decimals: 0,
            editorAttrs: {
                class: 'integer-polje form-control',
                type: 'integer',
                name: 'delKon'
            }
        }
    };

    var IzbiraCasView = Form.extend({
        template: Handlebars.compile('<form><div data-fields="title"></div><div class="row"><div class="col-sm-6" data-fields="zacetek,konec"></div><div class="col-sm-6" data-fields="delZac,delKon"></div></div></form>'),
        schema: sch
    });

    IzbiraCasView.prototype.initialize = function (options) {
        Form.prototype.initialize.apply(this, arguments);

        if (options && options.model) {
            this.model = options.model || this.model;

            this.zacetek = this.model.get('zacetek') || null;
            this.konec = this.model.get('konec') || null;
            this.title = this.model.get('title');
            
            this.delZac = this.model.get('delZac') || null;
            this.delKon = this.model.get('delKon') || null;
            
            switch (this.model.get('razred')) {
                case '400s':
                    this.delZac = this.delZac ? this.delZac : delte.delSplZac.value;
                    this.delKon = this.delKon ? this.delKon : delte.delSplKon.value;
                    break;
                case '600s':
                    this.delZac = this.delZac ? this.delZac : delte.delTehZac.value;
                    this.delKon = this.delKon ? this.delKon : delte.delTehKon.value;
                    break;
            }
            
        }

        this.on('change', this.onChange, this);
    };
    /*
     * V funkciji render poskrbimo da sezačetek in konec, ki ga imamo v modelu izpišeta
     * @param {type} options
     * @returns {undefined}
     */
    IzbiraCasView.prototype.render = function (options) {
        Form.prototype.render.apply(this, arguments);
        if (this.zacetek) {
            this.fields.zacetek.editor.setValue(this.zacetek);
        }
        if (this.konec) {
            this.fields.konec.editor.setValue(this.konec);
        }
        if (this.title) {
            this.fields.title.editor.setValue(this.title);
        }
        if (this.delZac) {
            this.fields.delZac.editor.setValue(this.delZac);
        }
        if (this.delKon) {
            this.fields.delKon.editor.setValue(this.delKon);
        }
        this.trigger('change');
    };

    /**
     * V funkciji preverimo ali zadoščujemo kriterijem.
     * Pomembno ali lahko nadaljujemo z naslednjim korakom v wizerdView-ju
     * @returns {undefined}
     */
    IzbiraCasView.prototype.onChange = function () {
        var zacetek = this.fields.zacetek.getValue();
        var konec = this.fields.konec.getValue();
        var title = this.fields.title.getValue();
        
        var delZac = this.fields.delZac.getValue();
        var delKon = this.fields.delKon.getValue();

        //če zadoščamo kriterijem dopolnimo model in prožimo ready
        if (zacetek && konec && title) {
            this.model.set('zacetek', zacetek);
            this.model.set('konec', konec);
            this.model.set('title', title);
            
            this.model.set('delZac', delZac);
            this.model.set('delKon', delKon);
            
            this.trigger('ready', this.model);
        } else {
            this.trigger('not:ready');
        }
    };

    return IzbiraCasView;
});