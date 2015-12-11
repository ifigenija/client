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
        tpl,
        schema
        ) {

    var VajaView = FormView.extend({
        template: simpleTpl,
        formTemplate: tpl,
        schema: schema.toFormSchema().schema,
        buttons: FormView.prototype.defaultButtons,
        triggers:{
            'click .prikazi-koledar': 'prikazi:koledar:prostor'
        }
    });

    return VajaView;
});
