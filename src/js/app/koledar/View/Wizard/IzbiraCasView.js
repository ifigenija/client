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
        }
    };

    var IzbiraCasView = Form.extend({
        template: Handlebars.compile('<form><div data-fields="zacetek"></div><div data-fields="konec"></div></form>'),
        schema: sch
    });

    IzbiraCasView.prototype.initialize = function (options) {
        Form.prototype.initialize.apply(this, arguments);

        if (options && options.model) {
            this.model = options.model || this.model;

            this.zacetek = this.model.get('zacetek') || null;
            this.konec = this.model.get('konec') || null;
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

        //če zadoščamo kriterijem dopolnimo model in prožimo ready
        if (zacetek && konec) {
            this.model.set('zacetek', zacetek);
            this.model.set('konec', konec);
            this.trigger('ready', this.model);
        } else {
            this.trigger('not:ready');
        }
    };

    return IzbiraCasView;
});