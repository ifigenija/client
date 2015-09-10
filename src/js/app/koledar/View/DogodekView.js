/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'app/Dokument/View/FormView',
    'formSchema!dogodek',
    'template!../tpl/dogodek-form.tpl'
], function (
        Radio,
        i18next,
        FormView,
        dogodekSchema,
        dogodekFormTpl
        ) {

    var Fv = FormView.extend({
        formTitle: "naslov",
        buttons: {
            shrani: {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani'
            },
            preklici: {
                id: 'doc-preklici',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'preklici'
            },
            nasvet: {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        },
        schema: dogodekSchema.toFormSchema().schema,
        formTemplate: dogodekFormTpl
    });

    return  Fv;
});