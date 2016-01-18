/*
 * TK
 */

define([
    'i18next',
    'backbone',
    'marionette',
    'app/Max/Module/Form',
    'app/Dokument/View/FormView',
    'template!../tpl/razmnozi.tpl',
    'template!../tpl/razmnozi-form.tpl'
], function (
        i18next,
        Backbone,
        Marionette,
        Form,
        FormView,
        tpl,
        formTpl
        ) {
    
    
    var nacin_options = {
        value1: "Hitri vnos" ,
        value2: "Tedenski vnos" 
    };

    
    var RazmnoziView = FormView.extend({
       //template: tpl,
       
       //class: 'form-control'
       
       schema: {
           zacetek: {name: 'zacetek', type: 'DatePicker', validators: ['required'], editorAttrs:{class: 'form-control'}},
           konec: {name: 'konec', type: 'DatePicker', validators: ['required'], editorAttrs:{class: 'form-control'}},


           chk_dop_1: {name: 'dopoldan', type: 'Checkbox', editorAttrs:{}},
           chk_pop_1: {name: 'popoldan', type: 'Checkbox', editorAttrs:{}},
           chk_zve_1: {name: 'zvecer',   type: 'Checkbox', editorAttrs:{}},

           chk_dop_2: {name: 'dopoldan', type: 'Checkbox', editorAttrs:{}},
           chk_pop_2: {name: 'popoldan', type: 'Checkbox', editorAttrs:{}},
           chk_zve_2: {name: 'zvecer',   type: 'Checkbox', editorAttrs:{}},

           chk_dop_3: {name: 'dopoldan', type: 'Checkbox', editorAttrs:{}},
           chk_pop_3: {name: 'popoldan', type: 'Checkbox', editorAttrs:{}},
           chk_zve_3: {name: 'zvecer',   type: 'Checkbox', editorAttrs:{}},

           chk_dop_4: {name: 'dopoldan', type: 'Checkbox', editorAttrs:{}},
           chk_pop_4: {name: 'popoldan', type: 'Checkbox', editorAttrs:{}},
           chk_zve_4: {name: 'zvecer',   type: 'Checkbox', editorAttrs:{}},

           chk_dop_5: {name: 'dopoldan', type: 'Checkbox', editorAttrs:{}},
           chk_pop_5: {name: 'popoldan', type: 'Checkbox', editorAttrs:{}},
           chk_zve_5: {name: 'zvecer',   type: 'Checkbox', editorAttrs:{}},

           chk_dop_6: {name: 'dopoldan', type: 'Checkbox', editorAttrs:{}},
           chk_pop_6: {name: 'popoldan', type: 'Checkbox', editorAttrs:{}},
           chk_zve_6: {name: 'zvecer',   type: 'Checkbox', editorAttrs:{}},

           chk_dop_7: {name: 'dopoldan', type: 'Checkbox', editorAttrs:{}},
           chk_pop_7: {name: 'popoldan', type: 'Checkbox', editorAttrs:{}},
           chk_zve_7: {name: 'zvecer',   type: 'Checkbox', editorAttrs:{}},

           upostevaj_praznike: {title: 'Upoštevaj praznike', name: 'zvecer',   type: 'Checkbox', editorAttrs:{}},
           upostevaj_sobote:   {title: 'Upoštevaj sobote',   name: 'zvecer',   type: 'Checkbox', editorAttrs:{}},
           upostevaj_nedelje:  {title: 'Upoštevaj nedelje',  name: 'zvecer',   type: 'Checkbox', editorAttrs:{}},
           
           nacin_vnosa: {title: 'Izberi način vnosa',  name: 'nacin:vnosa',   type: 'Radio', options: nacin_options, editorAttrs:{}},

           stevilo: {name: 'zacetek', type: 'Text', editorAttrs:{} } 

       },
        
       formTemplate: formTpl,
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