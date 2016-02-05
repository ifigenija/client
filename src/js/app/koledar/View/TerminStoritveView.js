/* 
 * View je odgovoren za urejanje in prikaz podatkov
 * Licenca GPLv3
 */

define([
    'i18next',
    'app/Dokument/View/FormView',
    'template!app/Dokument/tpl/form-simple.tpl',
    'template!../tpl/terminStoritve-form.tpl',
    'formSchema!terminStoritve'
], function (
        i18next,
        FormView,
        template,
        formTpl,
        schema
        ) {
    /**
     * Definicija TerminStoritveiView
     * @type @exp;FormView@call;extend
     */
    var TerminStoritveView = FormView.extend({
        template: template,
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        buttons: {
            skrij: {
                id: 'doc-skrij',
                label: i18next.t('std.skrij'),
                element: 'button-trigger',
                trigger: 'skrij'
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
    return TerminStoritveView;
});