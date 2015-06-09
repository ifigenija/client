/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'backbone',
    'radio',
    'i18next',
    'baseUrl',
    'app/Dokument/View/DokumentView',
    'template!../tpl/pd-dokument.tpl',
    'template!../tpl/pd-form.tpl',
    'formSchema!programDela'
], function (
        Marionette,
        Backbone,
        Radio,
        i18next,
        baseUrl,
        DokumentView,
        formTpl,
        dokumentTpl,
        formSchema
        ) {

    var ch = Radio.channel('layout');

    var PdDokumentView = DokumentView.extend({
        template: dokumentTpl,
        formTemplate: formTpl,
        schema: formSchema.toFormSchema().schema,
        regions: {
        }
    });

    return PdDokumentView;
});