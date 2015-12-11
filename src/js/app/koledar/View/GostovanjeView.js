/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/FormView',
    'template!app/Dokument/tpl/form-simple.tpl',
    'template!../tpl/gostovanje-form.tpl',
    'formSchema!gostovanje'
], function (
        FormView,
        simpleTpl,
        tpl,
        schema
        ) {

    var GostovanjeView = FormView.extend({
        template: simpleTpl,
        formTemplate: tpl,
        schema: schema.toFormSchema().schema,
        buttons: FormView.prototype.defaultButtons
    });

    return GostovanjeView;
});
