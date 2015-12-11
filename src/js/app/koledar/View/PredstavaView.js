/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/FormView',
    'template!app/Dokument/tpl/form-simple.tpl',
    'template!../tpl/predstava-form.tpl',
    'formSchema!predstava'
], function (
        FormView,
        simpleTpl,
        tpl,
        schema
        ) {

    var PredstavaView = FormView.extend({
        template: simpleTpl,
        formTemplate: tpl,
        schema: schema.toFormSchema().schema,
        buttons: FormView.prototype.defaultButtons
    });

    return PredstavaView;
});
