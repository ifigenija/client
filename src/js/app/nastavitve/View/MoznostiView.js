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
    'radio',
    'template!../tpl/moznosti.tpl',
    'baseUrl'
], function (
        Handlebars,
        Backbone,
        Marionette,
        Toolbar,
        SeznamView,
        FormView,
        filterSchema,
        i18next,
        Radio,
        moznostiTpl,
        baseUrl
        ) {
    

    var metaData = {
        'dogodek.delte': {
            objtype: 'object',
            datatypes: {
                value: 'integer'
            }
        },
        'test1.barva.ozadja': {
            objtype: 'array',
            datatypes: {
                value: 'integer'
            }
        },
        'test2.glob': {
            objtype: 'array'
        },
        'test4': {
            objtype: 'array'
        },
        'test5.notperUser': {
            objtype: 'array'
        },
        'dogodek.razred': {
            objtype: 'object'
        }
    };


    /*
     * Detail views
     * 
     * DetailItemView/DetailItemArrayView, DetailCollection, DetailView 
     */


    var DetailItemView = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td><input type="text" name="{{key}}" data-type="scalar" data-input-type="string" value="{{value}}"></td>')
    });

    var DetailItemViewReadOnly = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td>{{value}}</td>')
    });
    
    var DetailItemArrayView = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td>{{label}}:</td><td><input id="{{id}}" data-type="array" data-input-type="string" data-label="{{label}}" type="text" name="{{id}}" value="{{value}}"></td>')
    });

    var DetailItemArrayViewReadOnly = Marionette.ItemView.extend({
        tagName: 'tr',
        template: Handlebars.compile('<td>{{label}}:</td><td width="30%">{{value}}</td>')
    });

    var DetailCollection = Backbone.Collection.extend({
        fetchRpc: function (options) {

            var rpc = new $.JsonRpcClient({ajaxUrl: options.url});

            var self = this;
            rpc.call(options.method, options.parameters,
                function (data) {
                    //console.log('rpc call success');
                    //console.log(data);                   

                    for (var i in data) {
                        //console.log( i + ': ', data[i]);

                        var bm = new Backbone.Model(data[i]);
                        bm.set('id', i);
                        self.add(bm);
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

            var readonly = (this.perUser === false)  && (this.userGlobalPermission === false);
            //console.log('readonly test', this.perUser , this.userGlobalPermission, 'readonly: ', readonly);

            switch (this.optionName) {
                case '':
                case 'dogodek.delte':
                case 'dogodek.razred':
                case 'dogodek.termini':
                case 'dogodek.barve':
                    
                    if( readonly ) { return DetailItemArrayViewReadOnly; }
                    return DetailItemArrayView;

                case 'test1.barva.ozadja':
                case 'test2.glob':
                case 'test4':
                case 'test5.notperUser':
                default:
                    if(readonly) { return DetailItemViewReadOnly; }
                    return DetailItemView;
            }

            return DetailItemView;
        }
    });

    DetailView.prototype.initialize = function (options) {
        this.optionName           = options.optionName;
        this.perUser              = options.perUser;
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
            tabsR: '.nastavitve-tabs'
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

        var coll = new DetailCollection();

        var name    = this.optionName = this.model.get('name');
        var perUser = this.perUser    = !!this.model.get('perUser'); 
                                        //!! -> convert undefined to false

              
        var userGlobalPermission = Radio.channel('global').request('isGranted', 'OptionValue-writeGlobal');

        console.log('userGlobalPermission', userGlobalPermission);

        //force
        userGlobalPermission = true;
        console.log('== Testing, userGlobalPermission to ' + userGlobalPermission);
        console.log('== setting: perUser:' + perUser + ' vs userGlobalPermission: ' + userGlobalPermission );
               
        var parameters = {'name': name, nouser: perUser};

        var self = this;
        coll.fetchRpc({
            url: baseUrl + '/rpc/app/options',
            method: 'getOptions',
            parameters: parameters,
            success: function () {
                //console.log('fetch success');

                var detailView = new DetailView({
                    collection: coll,
                    optionName: name,
                    perUser: perUser,
                    userGlobalPermission: userGlobalPermission
                });
                self.detailsR.show(detailView);

                //console.log('aa', userGlobalPermission, perUser);
                
                if(userGlobalPermission || perUser) {
                    self.omogociShraniGumb();
                }
                
                if(userGlobalPermission && perUser ) {
                    console.log('Omogoči tabe');
                    
                    //self.$('#nastavitve-tab').removeClass('hide');
                }

            },
            error: function () {
                //console.log('fetch error');
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

    /*save*/

    IzbranaMoznostView.prototype.onShrani = function () {
        //console.log('IzbranaMoznostView.onShrani');
        //console.log(this);

        var detailView = this.detailsR.currentView;

        var inputFields = detailView.$('input[type=text]');
        var result = {};

        var inputVal = {};
        var inputId;

        if (inputFields) {
            for (var i = 0; i < inputFields.length; i++) {

                inputVal = {};


                //if scalar
                if (detailView.$(inputFields[i]).data('type') === 'scalar') {
                    console.log('type is scalar');
                    inputId = i;
                    inputVal.key = inputFields[i].name;
                    inputVal.value = inputFields[i].value;
                    
                    result = inputVal;
                }

                //if array
                if (detailView.$(inputFields[i]).data('type') === 'array') {
                    console.log('type is array');
                    inputId = inputFields[i].id;
                    inputVal.label = detailView.$(inputFields[i]).data('label');
                    inputVal.value = inputFields[i].value;

                    result[inputId] = inputVal;
                }
            }
        }
        console.group('Result');
        console.log(result);
        console.groupEnd();

        var callObject = {name: this.optionName, value: result};

        //rezultat takoj shrani, rpc klic
        var rpc = new $.JsonRpcClient({ajaxUrl: baseUrl + '/rpc/app/options'});

        var self = this;
        
        var method;
        
        if(this.perUser === true) {
            method = 'setUserOption';
        } else {
            method = 'setGlobalOption';
        }
        
        //
        
        rpc.call(method, callObject,
                function (data) {
                    console.log('save success');
                    console.log(data);
                },
                function (data) {
                    console.error('save error');
                    console.dir(data);
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

    MoznostiView.prototype.getFormView = function (model) {

        return new IzbranaMoznostView({model: model});

    };
    return MoznostiView;
});
