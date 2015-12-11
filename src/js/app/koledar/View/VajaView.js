/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/FormView',
    'template!app/Dokument/tpl/form-simple.tpl',
    'template!../tpl/vaja-form.tpl',
    'formSchema!vaja'
], function (
        FormView,
        simpleTpl,
        vajaTpl,
        schemaVaja
        ) {

    var VajaView = FormView.extend({
        template: simpleTpl,
        formTemplate: vajaTpl,
        schema: schemaVaja.toFormSchema().schema,
        buttons: FormView.prototype.defaultButtons,
        triggers:{
            'click .prikazi-koledar': 'prikazi:koledar:prostor'
        }
    });

    return VajaView;
});
