/*
 * TK
 */

define([
    'i18next',
    'backbone',
    'marionette',
    'app/Dokument/View/FormView',
    'template!../tpl/razmnozi.tpl',
    'template!../tpl/razmnozi-form.tpl'
], function (
        i18next,
        Backbone,
        Marionette,
        FormView,
        tpl,
                formTpl
        ) {
    
    var RazmnoziView = FormView.extend({
       //template: tpl,
       schema: {
           zacetek: {name: 'zacetek', type: 'DatePicker', validators: ['required'], editorAttrs:{class: 'form-control'}},
           konec: {name: 'konec', type: 'DatePicker', validators: ['required'], editorAttrs:{class: 'form-control'}},
           xxx: {name: 'xxx', type: 'Checkbox', editorAttrs:{}}
       },
  //     formTemplate: formTpl,
       buttons: FormView.prototype.defaultButtons
       
    });
    
    /**
     * Kličemo RPC metodo za razmnoževanje dogodka
     * @returns {undefined}
     */            
    RazmnoziView.prototype.shrani = function () {
        var self = this;
        
        
        this.trigger('save:success', 'nekaj');
        return;
        var rpc = new $.JsonRpcClient({
            ajaxUrl: baseUrl + '/rpc/dogodek'
        });
       
       rpc.call('razmnozi...', {           
       }, function (response) {
           self.trigger('save:success', response)
        }, Radio.channel('error').request('handler','flash')
       )
    };

    
    return RazmnoziView;
});