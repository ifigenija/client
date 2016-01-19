/*
 * TK
 */

define([
    'radio',
    'i18next',
    'backbone',
    'marionette',
    'app/Max/Module/Form',
    'app/Dokument/View/FormView',
    'template!../tpl/razmnozi.tpl',
    'template!../tpl/razmnozi-form.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        Form,
        FormView,
        tpl,
        formTpl
        ) {
    
    
    //var nacin_options = {
    //    value1: "Hitri vnos" ,
    //    value2: "Tedenski vnos" 
    //};

    
    var RazmnoziView = FormView.extend({
       //template: tpl,
       
       checkBeforeSave: true,
       
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

            stevilo: {name: 'zacetek', type: 'Text', editorAttrs:{} },
          
            time_dop_from: { type: 'Text', editorAttrs:{class:'koledar-razmnozi'}},
            time_dop_to:   { type: 'Text', editorAttrs:{class:'koledar-razmnozi'}},

            time_pop_from: { type: 'Text', editorAttrs:{class:'koledar-razmnozi'}},
            time_pop_to:   { type: 'Text', editorAttrs:{class:'koledar-razmnozi'}},

            time_zve_from: { type: 'Text', editorAttrs:{class:'koledar-razmnozi'}},
            time_zve_to:   { type: 'Text', editorAttrs:{class:'koledar-razmnozi'}}

        },
       
        triggers: {
            'click .btnTedenski': 'show:tedenski',
            'click .btnHitri':    'show:hitri'    
        },     
        
       formTemplate: formTpl,
       buttons: FormView.prototype.defaultButtons
       
    });
    
    //
    RazmnoziView.prototype.addRequiredValidator = function (val) {
        val.push('required');
        return val;
    };

    RazmnoziView.prototype.removeRequiredValidator = function (val) {
        var index = val.indexOf('required');
        val.splice(index, 1);
        return val;
    };

    RazmnoziView.prototype.onShowTedenski = function () {
        this.$('#stevilo').hide();
        this.$('#upostevaj-sobote').hide();
        this.$('#upostevaj-nedelje').hide();
        this.$('#tedenski').show();
        this.$('#zacetek-konec').show();
        
        this.$('#btnHitri').removeClass('disabled');
        this.$('#btnTedenski').addClass('disabled');
        
        //d//console.log('Enable-aj required.');
        //d//console.log(this.schema.zacetek.validators);console.log(this.schema.konec.validators);
        
        this.schema.zacetek.validators = this.addRequiredValidator(this.schema.zacetek.validators); 
        this.schema.konec.validators = this.addRequiredValidator(this.schema.konec.validators); 

        //d//console.log(this.schema.zacetek.validators);console.log(this.schema.konec.validators);
        
    };
    

    
    RazmnoziView.prototype.onShowHitri = function () {
        this.$('#stevilo').show();
        this.$('#upostevaj-sobote').show();
        this.$('#upostevaj-nedelje').show();
        this.$('#tedenski').hide();
        this.$('#zacetek-konec').hide();
        
        this.$('#btnTedenski').removeClass('disabled');
        this.$('#btnHitri').addClass('disabled');
        
        //d//console.log('Disable-aj required.');  
        //d//console.log(this.schema.zacetek.validators);console.log(this.schema.konec.validators);
        
        this.schema.zacetek.validators = this.removeRequiredValidator(this.schema.zacetek.validators); 
        this.schema.konec.validators = this.removeRequiredValidator(this.schema.konec.validators); 

        //d//console.log(this.schema.zacetek.validators);console.log(this.schema.konec.validators);
        
        //window.obj = this; debugger;
    };
    
    RazmnoziView.prototype.onBeforeShrani = function (options) {
        console.log('onBeforeShrani');
       
        
        var ok = true; //future checkes
        
        if (!this.form.commit()) {
            
            if(ok) {
                this.shrani(options);
            } else {
                Radio.channel('error').command('flash', {message: 'onBeforeShrani error'});

            }
        }
    };
    
    RazmnoziView.prototype.onShrani = function (options) {
        
        console.log('onShrani');
        
        if(this.checkBeforeSave) {
            this.onBeforeShrani(options);
        } else {
            this.shrani(options);
        }
        
        
        
        /*
        Radio.channel('error').command('flash', {
                    message: 'AAAAAA Shranjeno',
                    severity: 'success'
                });
        */
    };
    
    /**
     * Kličemo RPC metodo za razmnoževanje dogodka
     * @returns {undefined}
     */            
    RazmnoziView.prototype.shrani = function () {
        var self = this;
        
        console.log('shrani');
        
        var get_termini_fn = function(m) {
            var data = [];
            var key, i, terminiVDnevu = ['dop', 'pop', 'zve'];
            
            for(var dan=1;dan<8;dan++) {
                for(i in terminiVDnevu) {
                    key = "chk_"+ terminiVDnevu[i] +"_"+ dan;
                    // za debug checkboxov// console.log(key, m.get(key));
                    if(m.get(key) == true) {
                        if(!data[dan]) {data[dan] = []}; //init array row
                        data[dan][terminiVDnevu[i]] = 1;
                    }
                    
                }
            }
            
            return data;
        };
        
        if (!this.form.commit()) {
            console.log('After commit, prepare object for RPC Call');
            
            this.callObject = {
                id: this.model.get('id'),  //id_dogodka
                zacetek: this.model.get('zacetek'),
                konec: this.model.get('konec'),
                ura_od: '10:00',
                ura_do: '14:00',
                termini: get_termini_fn(this.model),
                upostevaj_praznike: this.model.get('upostevaj_praznike'),
                upostevaj_sobote: this.model.get('upostevaj_sobote'), //ce bo to aktualno
                upostevaj_nedelje: this.model.get('upostevaj_nedelje'), //ce bo to aktualno
                stevilo_vaj: this.model.get('stevilo_vaj'), //ce bo to aktualno
            }
            
      
            console.group('Model:');console.dir(this.model);console.groupEnd();
            
            console.group('Call object:');console.dir(this.callObject);console.groupEnd();
            
            console.trace();
            
            //ure za termina dop,pop,zve, kot 10h-14
            //tedenski vnos: zakrij upoštevajsobote in upoštevaj nedelje
            //hitri vnos: Zakori začetek in konec
            //
            
        }
        
        this.trigger('save:success', 'nekaj');
        return;
        
        // ----------------------------------
        var rpc = new $.JsonRpcClient({
            ajaxUrl: baseUrl + '/rpc/dogodek'
        });
       
       rpc.call('razmnozi...', {           
       }, function (response) {
           self.trigger('save:success', response)
        }, Radio.channel('error').request('handler','flash')
       );
    };

    
    return RazmnoziView;
});