/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'app/Dokument/View/FormView',
    'formSchema!vaja',
    'template!../tpl/vajaPlan-form.tpl'
], function (
        Radio,
        i18next,
        FormView,
        schema,
        formTpl
        ) {

    var Fv = FormView.extend({
        buttons: {
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
            }
        },
        schema: schema.toFormSchema().schema,
        formTemplate: formTpl
    });

    return  Fv;
});