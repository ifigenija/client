define([
    'app/Dokument/View/FormView',
    'template!../tpl/alternacijaUredi-form.tpl',
    'template!app/Dokument/tpl/form-simple.tpl',
    'formSchema!alternacija/uredi',
    'i18next'
], function (
        FormView,
        formTpl,
        tpl,
        schema,
        i18next
        ) {

    var AlterUrediView = FormView.extend({
        formTemplate: formTpl,
        template: tpl,
        schema: schema.toFormSchema().schema,
        buttons: {
            'doc-shrani': {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            'doc-cancel': {
                id: 'doc-cancel',
                label: i18next.t('std.preklici'),
                element: 'button-trigger',
                trigger: 'preklici',
                disabled: false
            }
        }
    });

    return AlterUrediView;
});