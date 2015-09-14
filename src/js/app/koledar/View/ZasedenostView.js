/* 
 * Licenca GPLv3
 */

define([
    'i18next',
    'app/Dokument/View/FormView',
    'formSchema!zasedenost',
    'template!../tpl/zasedenost-form.tpl'
], function (
        i18next,
        FormView,
        schema,
        tpl
        ) {
    var ZasedenostView = FormView.extend({
        formTitle: i18next.t('dogodek.title'),
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
            brisi: {
                id: 'doc-brisi',
                label: i18next.t('std.brisi'),
                element: 'button-trigger',
                trigger: 'brisi'
            }
        },
        schema: schema.toFormSchema().schema,
        formTemplate: tpl
    });

    return ZasedenostView;
});