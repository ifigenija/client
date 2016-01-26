/* 
 * View je odgovoren za urejanje in prikaz podatkov
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'app/Dokument/View/FormView',
    'template!app/Dokument/tpl/form-simple.tpl',
    'template!../tpl/zasedenost-form.tpl',
    'formSchema!terminStoritve/zasedenost'
], function (
        Radio,
        i18next,
        FormView,
        template,
        formTpl,
        schema
        ) {
    /**
     * Definicija ZasedenostiView
     * @type @exp;FormView@call;extend
     */
    var ZasedenostView = FormView.extend({
        template: template,
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        buttons: {
            shrani: {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            skrij: {
                id: 'doc-skrij',
                label: i18next.t('std.skrij'),
                element: 'button-trigger',
                trigger: 'skrij'
            },
            brisi: {
                id: 'doc-brisi',
                icon: 'fa fa-trash',
                title: i18next.t('std.brisi'),
                element: 'button-trigger',
                trigger: 'brisi'
            },
            nasvet: {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                title: i18next.t('std.pomoc'),
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        }
    });

    //dokler se ne uredi rest
    ZasedenostView.prototype.shrani = function () {
        this.model.set('zasedenost', true);
        FormView.prototype.shrani.apply(this, arguments);
    };

    /**
     * Funkcija izbriše odprt model
     * V primeru da je model uspešno izbrisan se proši destroy:success
     * @returns {undefined}
     */
    ZasedenostView.prototype.onBrisi = function () {
        var self = this;
        this.model.destroy({
            success: function () {
                Radio.channel('error').command('flash', {message: 'Uspešno odstranjeno', code: 900900, severity: 'success'});
                self.trigger('destroy:success');
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };
    /**
     * Funkcija se kliče ko je model uspešno shranjen
     * Funkcija posreduje naprej trigger iz formview-a
     * @param {type} model
     * @returns {undefined}
     */
    ZasedenostView.prototype.onSaveSuccess = function (model) {
        this.trigger('save:success', model);
    };
    return ZasedenostView;
});