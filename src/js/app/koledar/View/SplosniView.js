/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/FormView',
    'template!app/Dokument/tpl/form-simple.tpl',
    'template!../tpl/splosni-form.tpl',
    'formSchema!dogodekSplosni'
], function (
        FormView,
        simpleTpl,
        tpl,
        schema
        ) {

    var SplosniView = FormView.extend({
        template: simpleTpl,
        formTemplate: tpl,
        schema: schema.toFormSchema().schema,
        buttons: FormView.prototype.defaultButtons
    });

    return SplosniView;
});
