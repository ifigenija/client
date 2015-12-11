/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/FormView',
    'template!app/Dokument/tpl/form-simple.tpl',
    'template!../tpl/tehnicni-form.tpl',
    'formSchema!dogodekTehnicni'
], function (
        FormView,
        simpleTpl,
        tpl,
        schema
        ) {

    var TehnicniView = FormView.extend({
        template: simpleTpl,
        formTemplate: tpl,
        schema: schema.toFormSchema().schema,
        buttons: FormView.prototype.defaultButtons
    });

    return TehnicniView;
});
