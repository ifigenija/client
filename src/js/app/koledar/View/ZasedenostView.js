/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'marionette',
    'underscore',
    'jquery',
    'app/Dokument/View/FormView',
    'template!app/Dokument/tpl/form-simple.tpl',
    'template!../tpl/zasedenost-form.tpl',
    'formSchema!terminStoritve/zasedenost'
], function (
        Radio,
        i18next,
        Marionette,
        _,
        $,
        FormView,
        template,
        formTpl,
        schema
        ) {

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

    ZasedenostView.prototype.shrani = function () {
        this.model.set('zasedenost', true);
        FormView.prototype.shrani.apply(this, arguments);
    };

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
    ZasedenostView.prototype.onSaveSuccess = function (model) {
        this.trigger('save:success', model);
    };
    return ZasedenostView;
});