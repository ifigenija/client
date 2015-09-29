/*
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'underscore',
    'app/Dokument/View/FormView',
    'formSchema!dogodek',
    'template!../tpl/dogodek-form.tpl',
    'template!../tpl/dogodek.tpl'
], function (
    Radio,
    i18next,
    _,
    FormView,
    dogodekSchema,
    dogodekFormTpl,
    dogodekTpl) {

    var Fv = FormView.extend({
        buttons: {
            shrani: {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'doc-preklici',
                label: i18next.t('std.preklici'),
                element: 'button-trigger',
                trigger: 'preklici'
            },
            nasvet: {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                element: 'button-trigger',
                trigger: 'nasvet'
            },
        },
        schema: dogodekSchema.toFormSchema().schema,
        formTemplate: dogodekFormTpl,
        template: dogodekTpl
    });

    Fv.prototype.serializeData = function () {
        return _.extend(this.model.toJSON(), {
            formTitle: this.formTitle,
            dogodekIme: {
                '100s': 'Vaja',
                '200s': 'Predstava',
                '300s': 'Gostovnaje',
                '400s': 'Splošni dogodek',
                '500s': 'Zasedenost'
            }[this.model.get('razred')]
        });
    };

    Fv.prototype.onFormChange = function (form) {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-shrani');
        if (but && but.get('disabled')) {
            but.set({
                disabled: false
            });
        }
    };

    return Fv;
});