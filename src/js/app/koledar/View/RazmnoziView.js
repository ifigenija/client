/*
 * TK
 */

define([
    'radio',
    'i18next',
    'backbone',
    'marionette',
    'moment',
    'app/Max/Module/Form',
    'app/Dokument/View/FormView',
    'template!../tpl/razmnozi-form.tpl',   
    'options!dogodek.termini',
    'baseUrl'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        moment,
        Form,
        FormView,
        formTpl,        
        termini,
        baseUrl
        ) {
    
 
    
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

            stevilo_ponovitev: {title: 'Število ponovitev', name: 'stevilo_ponovitev', type: 'Text', editorAttrs:{} },
          
            time_dop: { type: 'Text', editorAttrs:{class:'koledar-razmnozi'}},


            time_pop: { type: 'Text', editorAttrs:{class:'koledar-razmnozi'}},


            time_zve: { type: 'Text', editorAttrs:{class:'koledar-razmnozi'}},
            
            show_mode: { type: 'Hidden', name: 'show_mode', value: 'tedenski'}


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

    RazmnoziView.prototype.formChange = function (form) {

        var mode = this.form.fields.show_mode.getValue();
        //console.log('formChange, valudate. mode= ' + mode);
        
        //fix value
        if(mode==='') {
            mode = 'tedenski';
            this.form.fields.show_mode.setValue(mode);
        }
        
        if( mode == 'hitri' ) {
            st = this.form.fields.stevilo_ponovitev.getValue();
            //console.log('st', st, st.length);
            if(st.length>0) {
                this.enableSaveButton();
            } else {
                this.disableSaveButton();
            }            
                        
        } else { //tedenski

            konec = this.form.fields.konec.getValue();
            //console.log('konec', konec, konec.length);
            if(konec && konec.length>0) {
               

                var self = this;
                var chkCount = 0;
                Object.keys(this.form.fields).forEach(function (elem) {
                    if(elem.substr(0,4) == 'chk_') {
                        //console.log(elem);
                        if( self.form.fields[elem].getValue() ) { chkCount++; }
                    }                   
                });
                if(chkCount>0) {
                    this.enableSaveButton();
                } else {
                    this.disableSaveButton();
                }
                
            } else {
                this.disableSaveButton();
            } 
        }     
        
    };

    RazmnoziView.prototype.enableSaveButton = function () {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-shrani');
        if (but && but.get('disabled')) {
            but.set({
                disabled: false
            });
        }        
    };

    RazmnoziView.prototype.disableSaveButton = function () {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-shrani');
        if (but && !but.get('disabled')) {
            but.set({
                disabled: true
            });
        }        
    };
    
    RazmnoziView.prototype.onShowTedenski = function () {
        
        this.form.fields.show_mode.setValue('tedenski');
        
        //izbriše pilje št. ponovitev
        //console.log(this.form.fields);
        this.form.fields.stevilo_ponovitev.setValue('');
        
        this.form.fields.show_mode.setValue('tedenski');
        
        this.$('#stevilo-ponovitev').hide();
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
        
        this.form.fields.show_mode.setValue('hitri');
        //console.log( this.form.fields );
        
        this.$('#stevilo-ponovitev').show();
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
        
    };
    
    RazmnoziView.prototype.onBeforeShrani = function (options) {
       // console.log('onBeforeShrani');
       
        var ok = true; //not implemented
        
        if (!this.form.commit()) {
            
            if(ok) {
                this.shrani(options);
            } else {
                Radio.channel('error').command('flash', {message: 'onBeforeShrani error'});
            }
        }
    };
    
    RazmnoziView.prototype.onShrani = function (options) {
        
        //console.log('onShrani');
        
        if(this.checkBeforeSave) {
            this.onBeforeShrani(options);
        } else {
            this.shrani(options);
        }
        
        
       
    };
    
    /**
     * Kličemo RPC metodo za razmnoževanje dogodka
     * @returns {undefined}
     */            
    RazmnoziView.prototype.shrani = function () {
        var self = this;
        
        //console.log('shrani');
        
        var get_termini_fn = function(model) {
            var data = [];
            var key, i;
            var terminiVDnevu = ['dop', 'pop', 'zve'];
            
            for(var dan=1;dan<8;dan++) {
                for(i in terminiVDnevu) {
                    key = "chk_"+ terminiVDnevu[i] +"_"+ dan;
                    // za debug checkboxov// console.log(key, model.get(key));
                    if(model.get(key) === true) {
                        if(!data[dan]) {data[dan] = [];}; //init array row
                        data[dan].push(terminiVDnevu[i].toUpperCase());
                    }
                }
            }
            
            return data;
        };
        
        var get_casi_pricetka_fn = function(model) {
            
            var d,p,z;
            d = model.get('time_dop').split(':');
            p = model.get('time_pop').split(':');
            z = model.get('time_zve').split(':');
            
            var data = {
                dop: {
                        h: parseInt(d[0], 10),
                        m: parseInt(d[1], 10)
                },
                pop: {
                        h: parseInt(p[0], 10),
                        m: parseInt(p[1], 10)
                },
                zve: {
                        h: parseInt(z[0], 10),
                        m: parseInt(z[1], 10)
                     }
            };
            
            return data;
        };
        

        var steviloPonovitev = 0;
        if (typeof this.model.get('stevilo_ponovitev') !== 'undefined') {
            steviloPonovitev = +this.model.get('stevilo_ponovitev');
        }

        this.callObject = {
            dogodekId: this.model.get('id'),
            steviloPonovitev: steviloPonovitev,
            upostevajPraznike: this.model.get('upostevaj_praznike'),
            upostevajSobote: this.model.get('upostevaj_sobote'), 
            upostevajNedelje: this.model.get('upostevaj_nedelje')              
        }; 

        if(this.model.get('show_mode') === 'tedenski') {
            //console.log('tedenski is set ...');

            _.extend(this.callObject, {
                zacetekObdobja: this.model.get('zacetek'),
                konecObdobja: moment(this.model.get('konec')).endOf('day').toISOString(),
                tedenskiTermini: get_termini_fn(this.model),
                casiPricetka: get_casi_pricetka_fn(this.model)
            });
        }

        console.group('Model:');console.dir(this.model);console.groupEnd();            
        console.group('Call object:');console.dir(this.callObject);console.groupEnd();
            

        
        
        //console.log('Stopped before call');
        //return;
        
        // ----------------------------------
        
        var rpc = new $.JsonRpcClient({ajaxUrl: baseUrl + '/rpc/koledar/dogodek'});
        
        rpc.call('razmnozi', this.callObject,
                function (response) {
                    
                    console.log('rpc call success');
                    
                    Radio.channel('error').command('flash', {message: 'Uspešno razmnoženo', code: 0, severity: 'success'});
                    
                    self.trigger('save:success', response);
                },
                
                function (response) {
                    console.log('rpc call error');
                    console.log(response);
                    
                    var errMsg = '', errCode = 0;
                    if (response.message) {
                        errMsg = response.message;
                        errCode = response.code;
                    }
                    
                    Radio.channel('error').command('flash', {message: 'Napaka pri razmnoževanju dogodka: ' + errMsg, code: errCode, severity: 'error'});
                }
       );
       

    };

    
    return RazmnoziView;
});