/* 
 * Licenca GPLv3
 */
define([
    'app/bars',
    'backbone',
    'marionette',
    'app/Max/View/Toolbar',
    'app/Dokument/View/SeznamView',
    'app/Dokument/View/FormView',
    'formSchema!option?filter=1',
    'i18next',
    'app/Max/View/TabControl',
    'radio',
    'template!../tpl/moznosti.tpl',
    'baseUrl',
    
    'bootstrap-colorpicker',
], function (
        Handlebars,
        Backbone,
        Marionette,
        Toolbar,
        SeznamView,
        FormView,
        filterSchema,
        i18next,
        TabControl,
        Radio,
        moznostiTpl,
        baseUrl
        ) {


    //var forceGlobalPermission = false;  //undefined, false = force false, true forse

    var configData = {
        'dogodek.delte': {
            objtype: 'array',
            datatypes: {
                value: 'integer' //todo: prenesi ItemView-ov data-type sem
            }
        },
        'dogodek.termini': {
            objtype: 'arrayHM'
        },
        'dogodek.barve': {
            objtype: 'colorpicker'
        },
        'test1.barva.ozadja': {},
        'test2.glob': {},
        'test4': {},
        'test5.notperUser': {},
        'dogodek.razred': {},
        'tomaz.barva.ozadja': {
            objtype: 'scalar'
        },
    };

    var tabs = [
        {name: i18next.t('nastavitve.moznosti.perUser'), event: 'tabPerUser'},
        {name: i18next.t('nastavitve.moznosti.global'), event: 'tabGlobal'},
    ];

    Handlebars.registerHelper("formatHM", function(value) {
        var s = "00"+value
        return s.substr(-2);
    });

    /*
     * Detail views
     * 
     * DetailItemView/DetailItemArrayView, DetailCollection, DetailView 
     */


    var DetailItemView = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td><div class="col-xs-4 row"><input type="text" name="{{key}}" data-type="scalar" class="form-control" value="{{value}}"></div></td>')
    });

    var DetailItemViewReadOnly = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td>{{value}}</td>')
    });

    var DetailItemArrayView = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td>{{label}}:</td><td><input type="text" id="{{id}}" name="{{id}}" data-label="{{label}}" class="form-control" value="{{value}}"></td>')
    });

    var DetailItemArrayViewReadOnly = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td>{{label}}:</td><td width="30%">{{value}}</td>')
    });

    DetailItemHourMinuteView = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td>{{label}}:</td><td width="30%">'+
                     '<input type="text" id="h-{{id}}" name="h-{{id}}" data-label="{{label}}" class="form-control hour-minute" size="2" value="{{formatHM h}}">:'+
                     '<input type="text" id="m-{{id}}" name="m-{{id}}" class="form-control hour-minute" size="2" value="{{formatHM m}}"></td>')
    });
    
    DetailItemHourMinuteViewReadOnly = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td>{{label}}:</td><td width="30%">{{h}}:{{m}}</td>')
    });

    var DetailItemNoEdit = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td> ??? </td>')
    });
    
    DetailItemColorPickerView = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td><div class="moznosti-label">{{label}}:</div></td><td width="30%">'+
                '<div class="input-group colorpicker"><input type="text" id="{{id}}" name="{{id}}" data-label="{{label}}" class="form-control" value="{{value}}" /><span class="input-group-addon"><i></i></span></td>')
    });


    var DetailCollection = Backbone.Collection.extend({
        fetchRpc: function (options) {

            var rpc = new $.JsonRpcClient({ajaxUrl: options.url});

            var self = this;
            rpc.call(options.method, options.parameters,
                    function (data) {
                        //console.log('rpc call success');
                        //console.log(data);  


                        if (typeof data === 'string') {

                            var bm = new Backbone.Model({value: data});
                            self.add(bm);

                        } else {  //array

                            for (var i in data) {

                                var bm = new Backbone.Model(data[i]);
                                bm.set('id', i);
                                self.add(bm);

                                //console.log(i + ': ', data[i]);
                                //console.log('Adding to collection, model id:', i);
                                //console.log('collection length:', self.length);
                            }
                        }

                        var success = options.success;
                        if (success)
                            success.call(options);
                    },
                    function (data) {
                        console.dir(data);
                        throw new Marionette.Error('rpc call error');
                    }
            );

        }
    });

    var DetailView = Marionette.CollectionView.extend({
        tagName: 'table',
        className: 'table',
        getChildView: function (item) {

            var readonly = (this.perUser === false) && (this.userGlobalPermission === false);
            //console.log('readonly test', this.perUser , this.userGlobalPermission, 'readonly: ', readonly);

            if (typeof configData[this.optionName] == 'undefined') {
                console.log('No configuration for ' + this.optionName);
                return DetailItemNoEdit;
            }


            switch (configData[this.optionName].objtype) {
                case 'array':
                    if (readonly) {
                        return DetailItemArrayViewReadOnly;
                    }
                    return DetailItemArrayView;

                case 'arrayHM':
                    if(readonly) {
                        return DetailItemHourMinuteViewReadOnly;
                    }
                    return DetailItemHourMinuteView;
                    
                case 'scalar':
                case 'integer':
                case 'string':
                    
                    if (readonly) {
                        return DetailItemViewReadOnly;
                    }
                    return DetailItemView;

                    
                case 'colorpicker':
                    this.useColorPicker = true;
                    if (readonly) {
                        this.useColorPickerDisabled = true;
                    }
                    return DetailItemColorPickerView;
                
                default:
                    return DetailItemNoEdit;
            }

            return DetailItemNoEdit;
        }
    });

    DetailView.prototype.initialize = function (options) {
        this.optionName = options.optionName;
        this.perUser = options.perUser;
        this.userGlobalPermission = options.userGlobalPermission;
    };




    /**
     * 
     * IzbranaMoznostView
     * view se prikaže po izbiri opcije iz seznama 
     */


    var IzbranaMoznostView = Marionette.LayoutView.extend({
        template: moznostiTpl,
        regions: {
            detailsR: '.region-details',
            tabsR: '.region-tabs'
        },
        buttons: {
            shrani: {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'doc-preklici',
                label: i18next.t('std.zapri'),
                element: 'button-trigger',
                trigger: 'preklici'
            },
            nasvet: {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                title: i18next.t('std.pomoc'),
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        },
        constructor: function (options) {

            Marionette.LayoutView.call(this, options);

            if (!this.regionToolbar) {
                this.addRegions({regionToolbar: '.region-toolbar'});
            }

            this.on('render', this.renderToolbar, this);
        }
    });

    IzbranaMoznostView.prototype.initialize = function (options) {

        //console.log('IzbranaMoznostView.initialize', options);
        //this.model = options.model;
    };


    IzbranaMoznostView.prototype.onRender = function (options) {
        //console.log('IzbranaMoznostView.onRender');
        

        var name = this.optionName = this.model.get('name');
        var perUser = this.perUser = !!this.model.get('perUser');
        //!! -> convert undefined to false

        this.userGlobalPermission = Radio.channel('global').request('isGranted', 'OptionValue-writeGlobal');
        //console.log('userGlobalPermission', this.userGlobalPermission);

        //force
        if(typeof forceGlobalPermission !== 'undefined') {
           //forcing ..
           this.userGlobalPermission = forceGlobalPermission;
           console.log('== Forcing userGlobalPermission to ' + this.userGlobalPermission);
        }
        


        //narisi tabe, ko je opcija tudi za uporabnika in 
        //uporabnik lahko ureja globalno
        if (this.userGlobalPermission && this.perUser) {

            this.renderTabs(tabs);
        } else {
            this.renderUserOptions();
        }
    };

    IzbranaMoznostView.prototype.renderGlobalOptions = function () {
        //console.log('renderGlobalOptions');

        this.optionLevel = 'global';

        var coll = new DetailCollection();
        var parameters = {'name': this.optionName, nouser: true};


        var self = this;
        coll.fetchRpc({
            url: baseUrl + '/rpc/app/options',
            method: 'getOptions',
            parameters: parameters,
            success: function () {
                //console.log('GL fetch success');

                var detailGlobalView = new DetailView({
                    collection: coll,
                    optionName: self.optionName,
                    perUser: self.perUser,
                    userGlobalPermission: self.userGlobalPermission
                });

                self.detailsR.show(detailGlobalView);
                
                if(detailGlobalView.useColorPicker) {
                    detailGlobalView.$('.colorpicker').colorpicker({format: 'hex'});
                }

            },
            error: function () {
                //console.log('GL fetch error');
            }
        });
    };

    IzbranaMoznostView.prototype.renderUserOptions = function () {
        //console.log('renderUserOptions');

        var coll = new DetailCollection();
        var parameters = {'name': this.optionName, nouser: false};

        this.optionLevel = 'user';

        //override if not peruser
        if (this.perUser === false) {
            parameters.nouser = true;
            this.optionLevel = 'global';
        }

        var self = this;
        coll.fetchRpc({
            url: baseUrl + '/rpc/app/options',
            method: 'getOptions',
            parameters: parameters,
            success: function () {
                //console.log('US fetch success');

                var detailUserView = new DetailView({
                    collection: coll,
                    optionName: self.optionName,
                    perUser: self.perUser,
                    userGlobalPermission: self.userGlobalPermission
                });

                self.detailsR.show(detailUserView);
                                
                if(detailUserView.useColorPicker) {
                    
                    detailUserView.$('.colorpicker').colorpicker({format: 'hex'});
                     
                    if(detailUserView.useColorPickerDisabled) { 
                        detailUserView.$('.colorpicker').colorpicker('disable');
                    } else {
                       
                    }
                }

                //uporabnik lahko ureja globalno ALI je opcija za uporabnika
                if (self.userGlobalPermission || self.perUser) {
                    self.omogociShraniGumb();
                }

            },
            error: function () {
                //console.log('US fetch error');
            }
        });
    };




    /*toolbar*/

    IzbranaMoznostView.prototype.prepareToolbar = function () {
        return [Object.keys(this.buttons).map(function (key) {
                return this.buttons[key];
            }, this)];
    };


    IzbranaMoznostView.prototype.renderToolbar = function () {

        var groups = this.prepareToolbar();

        var toolbar = new Toolbar({
            buttonGroups: groups,
            listener: this,
            size: 'md'
        });

        this.regionToolbar.show(toolbar);
        return toolbar;
    };

    IzbranaMoznostView.prototype.getToolbarModel = function () {

        return this.regionToolbar.currentView.collection;
    };

    /*tabs*/

    IzbranaMoznostView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        this.tabsR.show(this.tabControl);
        return this.tabControl;
    };

    /**
     * 
     * Omogoči (enable) shrani gumb
     */

    IzbranaMoznostView.prototype.omogociShraniGumb = function () {
        //console.log('IzbranaMoznostView.omogociShraniGumb');

        var tb = this.getToolbarModel();
        var buttonShrani = tb.getButton('doc-shrani');


        if (buttonShrani && buttonShrani.get('disabled')) {
            buttonShrani.set({
                disabled: false
            });
        }
    };

    IzbranaMoznostView.prototype.onTabPerUser = function () {

        //console.log('onTabPerUser');

        this.renderUserOptions();

    };

    IzbranaMoznostView.prototype.onTabGlobal = function () {
        //console.log('onTabGlobal');

        this.renderGlobalOptions();
    };

    /*save*/

    IzbranaMoznostView.prototype.onShrani = function () {
        //console.log('IzbranaMoznostView.onShrani');
        //console.log(this);

        var detailView = this.detailsR.currentView;

        var inputFields = detailView.$('input[type=text]');
        var result = {};


        var inputVal = {};
        var inputId, part, newKey, innerKey;

        if (inputFields) {
            for (var i = 0; i < inputFields.length; i++) {

                inputVal = {};
                
                switch(configData[this.optionName].objtype) {
                    case 'scalar':
                        //console.log('type is scalar');
                        result = inputFields[i].value;
                        break;
                        
                    case 'array':
                    case 'colorpicker':
                        //console.log('type is array');
                        inputId = inputFields[i].id;
                        inputVal.label = detailView.$(inputFields[i]).data('label');
                        inputVal.value = inputFields[i].value;

                        result[inputId] = inputVal;                     
                        break;
                        
                    case 'arrayHM':
                        //console.log('type is array HM ');//console.dir(inputFields[i]);
                    
                        inputId = inputFields[i].id;
                        part = inputId.split('-'); //console.log('part', part);
                        newKey = part[1];
                        innerKey = part[0]
                        if(typeof result[newKey] === 'undefined') { result[part[1]] = {}; }
                        result[newKey][innerKey] = parseInt( inputFields[i].value, 10);
                        if(typeof detailView.$(inputFields[i]).data('label') !== 'undefined') {
                            result[newKey]['label'] = detailView.$(inputFields[i]).data('label');  //samo urni vsebuje label
                        }
                        break;
                        
                    default:
                        console.error('Unknown objtype: ' + configData[this.optionName].objtype + ' for option ' + this.optionName);
                } 

            }
        }
        

        
        //console.group('Result'); console.log(result); console.groupEnd();

        var callObject = {name: this.optionName, value: result};

        //console.log('callObject', callObject);
        //console.log('STOP'); return;

        //rezultat takoj shrani, rpc klic
        var rpc = new $.JsonRpcClient({ajaxUrl: baseUrl + '/rpc/app/options'});

        var self = this;

        var method;

        if (this.optionLevel && (this.optionLevel == 'global')) {
            method = 'setGlobalOption';

        } else {
            method = 'setUserOption';
        }

        //console.log('call method debug: method = ' + method + ', optionLevel = ' + this.optionLevel);

        rpc.call(method, callObject,
                function (data) {
                    console.log('save success');
                    console.log(data);
                    Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                },
                function (data) {
                    console.log('save error');
                    console.dir(data);
                    var errMsg = '', errCode = 0;
                    if (data.message) {
                        errMsg = data.message;
                        errCode = data.code;
                    }
                    Radio.channel('error').command('flash', {message: 'Napaka pri shranjevanju: ' + errMsg, code: errCode, severity: 'error'});
                }
        );
    };

    /**
     * 
     * MoznostiView
     * glavni view strani izviza možnosti
     * izpise vse možnosti (opcije) 
     * 
     */



    var MoznostiView = SeznamView.extend({
        url: baseUrl + '/rest/option',
        title: i18next.t('moznosti.title'),
        skrivajTabelo: true,
        filterSchema: filterSchema,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('moznosti.opis'),
                name: 'description',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('moznosti.perUser'),
                name: 'perUser'
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'uredi', title: i18next.t('std.uredi')}
                ]
            }
        ]
    });

    // override toolbar, blank
    MoznostiView.prototype.renderToolbar = function () {};

    MoznostiView.prototype.zamenjajUrl = function () {
    };
        
    MoznostiView.prototype.getFormView = function (model) {

        return new IzbranaMoznostView({model: model});

    };
    return MoznostiView;
});
