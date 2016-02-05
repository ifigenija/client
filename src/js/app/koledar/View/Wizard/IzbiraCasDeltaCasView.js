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
    'template!../../tpl/izbira-deltacas.tpl',
    'options!dogodek.delte'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        Form,
        tpl,
        delte
        ) {

    var sch = {
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
        },
        delZacTeh: {
            type: 'Number',
            name: 'delZacTeh',
            title: i18next.t('terminStoritve.delZacTeh'),
            help: i18next.t('terminStoritve.d.delZacTeh'),
            decimals: 0,
            editorAttrs: {
                class: 'integer-polje form-control',
                type: 'integer',
                name: 'delZacTeh'
            }
        },
        delKonTeh: {
            type: 'Number',
            name: 'delKonTeh',
            title: i18next.t('terminStoritve.delKonTeh'),
            help: i18next.t('terminStoritve.d.delKonTeh'),
            decimals: 0,
            editorAttrs: {
                class: 'integer-polje form-control',
                type: 'integer',
                name: 'delKonTeh'
            }
        }
    };

    var IzbiraCasView = Form.extend({
        template: tpl,
        schema: sch
    });

    IzbiraCasView.prototype.initialize = function (options) {
        Form.prototype.initialize.apply(this, arguments);

        if (options && options.model) {
            this.model = options.model || this.model;

            this.zacetek = this.model.get('zacetek') || null;
            this.konec = this.model.get('konec') || null;

            this.delZac = this.model.get('delZac') || null;
            this.delZacTeh = this.model.get('delZacTeh') || null;
            this.delKon = this.model.get('delKon') || null;
            this.delKonTeh = this.model.get('delKonTeh') || null;

            switch (this.model.get('razred')) {
                case '100s':
                    this.delZac = this.delZac ? this.delZac : delte.delPreZac.value;
                    this.delZacTeh = this.delZacTeh ? this.delZacTeh : delte.delPreZacTeh.value;
                    this.delKon = this.delKon ? this.delKon : delte.delPreKon.value;
                    this.delKonTeh = this.delKonTeh ? this.delKonTeh : delte.delPreKonTeh.value;
                    break;
                case '200s':
                    this.delZac = this.delZac ? this.delZac : delte.delVajZac.value;
                    this.delZacTeh = this.delZacTeh ? this.delZacTeh : delte.delVajZacTeh.value;
                    this.delKon = this.delKon ? this.delKon : delte.delVajKon.value;
                    this.delKonTeh = this.delKonTeh ? this.delKonTeh : delte.delVajKonTeh.value;
                    break;
                case '300s':
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
        if (this.delZac) {
            this.fields.delZac.editor.setValue(this.delZac);
        }
        if (this.delZacTeh) {
            this.fields.delZacTeh.editor.setValue(this.delZacTeh);
        }
        if (this.delKon) {
            this.fields.delKon.editor.setValue(this.delKon);
        }
        if (this.delKonTeh) {
            this.fields.delKonTeh.editor.setValue(this.delKonTeh);
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
        var delZac = this.fields.delZac.getValue();
        var delZacTeh = this.fields.delZacTeh.getValue();
        var delKon = this.fields.delKon.getValue();
        var delKonTeh = this.fields.delKonTeh.getValue();

        //če zadoščamo kriterijem dopolnimo model in prožimo ready
        if (zacetek && konec) {
            this.model.set('zacetek', zacetek);
            this.model.set('konec', konec);

            this.model.set('delZac', delZac);
            this.model.set('delZacTeh', delZacTeh);
            this.model.set('delKon', delKon);
            this.model.set('delKonTeh', delKonTeh);

            this.trigger('ready', this.model);
        } else {
            this.trigger('not:ready');
        }
    };

    return IzbiraCasView;
});