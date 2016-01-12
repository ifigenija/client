/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone',
    'underscore',
    'app/bars',
    'marionette',
    'jquery',
    'app/Max/View/Confirm',
    'app/koledar/Model/Alternacije',
    'app/koledar/Model/Dogodki',
    'app/Max/View/TabControl',
    'app/Dokument/View/DokumentView',
    'app/Zapisi/View/ZapisiLayout',
    './SodelujociView',
    'formSchema!dogodek',
    'template!../tpl/dogodek-dok.tpl',
    'template!../tpl/dogodek-form.tpl'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Handlebars,
        Marionette,
        $,
        confirm,
        Alternacije,
        Dogodki,
        TabControl,
        DokumentView,
        ZapisiLayout,
        SodelujociView,
        schemaDogodek,
        dokumentTpl,
        dogodekTpl
        ) {

    var tabVse = [
        {id: 'naslov', name: i18next.t('dogodek.title'), event: 'dogodek'},
        {id: 'razred', name: i18next.t('dogodek.razred'), event: 'razred'},
        {id: 'sodelujoci', name: i18next.t('dogodek.sodelujoci'), event: 'sodelujoci'},
        {id: 'priloge', name: i18next.t('dogodek.priloge'), event: 'priloge'}
    ];

    var tabNovi = [
        {name: i18next.t('dogodek.title'), event: 'dogodek'}
    ];
    /**
     * Dogodekview namenjen prikazu dogodka in razreda dogodka
     * 
     * @type @exp;DokumentView@call;extend
     */
    var DogodekView = DokumentView.extend({
        template: dokumentTpl,
        formTemplate: dogodekTpl,
        schema: schemaDogodek.toFormSchema().schema,
        TipDogView: null,
        tipDogModel: null,
        regions: {
            tabsR: '.dogodek-tabs',
            sodelujociR: '.region-sodelujoci',
            razredDogodkaR: '.region-razred-dogodka',
            prilogeR: '.region-priloge'
        },
        buttons: {
            'doc-razmnozi': {
                id: 'doc-razmnozi',
                label: 'Razmnoži',
                element: 'button-trigger',
                trigger: 'razmnozi',
                disabled: false
            },
            'doc-zakljuci': {
                id: 'doc-zakljuci',
                label: 'Zaključi',
                element: 'button-trigger',
                trigger: 'zakljuci',
                disabled: true,
                hidden: true
            },
            'doc-odpovej': {
                id: 'doc-odpovej',
                label: 'Odpovej',
                element: 'button-trigger',
                trigger: 'odpovej',
                disabled: true,
                hidden: true
            },
            'doc-brisi': {
                id: 'doc-brisi',
                label: 'Briši',
                element: 'button-trigger',
                trigger: 'brisi',
                disabled: true,
                hidden: true
            },
            'doc-shrani': {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            'doc-skrij': {
                id: 'doc-skrij',
                label: i18next.t('std.skrij'),
                element: 'button-trigger',
                trigger: 'skrij'
            },
            'doc-nasvet': {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                title: i18next.t('std.pomoc'),
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        },
        triggers: {
            'click .prikazi-koledar': 'koledar:prostor'
        }
    });

    DogodekView.prototype.posodobiUrlNaslov = function () {
    };

    DogodekView.prototype.onKoledarProstor = function () {
        console.log('onKoledarProstor');
    };

    /**
     * 
     * @param {Array} options
     * @param {View} options.TipDogView, namenjen prikazu tipa dogodka
     * @param {model} options.TipDogModel model, ki bo uporabljen v tipDogView
     * @returns {undefined}
     */
    DogodekView.prototype.initialize = function (options) {
        this.schema = options.schema || this.schema;
        this.TipDogView = options.TipDogView || this.TipDogView;
        this.tipDogModel = options.tipDogModel || this.tipDogModel;
    };

    /**
     * Kaj se zgodi ko se je view že vstavil v DOM
     * @returns {undefined}
     */
    DogodekView.prototype.onRender = function () {
        this.tabs = tabVse;
        this.renderTabs(this.tabs);
    };

    /**
     * deselect taba 
     * @returns {undefined}
     */
    DogodekView.prototype.deselectTab = function () {
        this.$('.dogodek-panels .tab-pane').removeClass('active');
    };

    /**
     * Izris tabov
     * @returns {DogodekView_L11.TabControl}
     */
    DogodekView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        var tab = this.tabControl.findTab('razred');
        var razred = this.getRazredNiz();
        tab.set('name', razred);


        this.tabsR.show(this.tabControl);
        return this.tabControl;
    };

    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    DogodekView.prototype.onDogodek = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
    };

    DogodekView.prototype.onSodelujoci = function () {
        this.deselectTab();
        this.$('.pnl-sodelujoci').addClass('active');
        this.renderSodelujoci();

    };

    DogodekView.prototype.onRazred = function () {
        this.deselectTab();
        this.$('.pnl-razred-dogodka').addClass('active');
        this.renderRazredDogodka();

    };
    DogodekView.prototype.onPriloge = function () {
        this.deselectTab();
        this.$('.pnl-priloge').addClass('active');
        this.renderPriloge();

    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    DogodekView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'Dogodek'
        });
        this.prilogeR.show(view);
    };

    DogodekView.prototype.renderSodelujoci = function () {
        var self = this;
        var coll = this.collection = new Alternacije();
        coll.queryParams.uprizoritev = this.tipDogModel.get('uprizoritev');
        var dogodek = new Dogodki.prototype.model(self.tipDogModel.get('dogodek'));

        coll.fetch({
            success: function (coll) {
                var view = new SodelujociView({
                    alternacije: coll,
                    dogodek: dogodek
                });
                self.sodelujociR.show(view);
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    DogodekView.prototype.renderRazredDogodka = function () {
        if (this.TipDogView) {
            var view = new this.TipDogView({
                model: this.tipDogModel
            });
            this.razredDogodkaR.show(view);
        }
    };


    DogodekView.prototype.onBrisi = function (options) {
        var self = this;
        var brisi = function () {
            self.model.destroy({
                success: function () {
                    //alert('Dogodek izbrisan');
                    self.trigger('destroy:success');

                    self.trigger('skrij', self);
                }
            });
        };

        confirm({
            text: i18next.t('std.potrdiIzbris'),
            modalOptions: {
                title: "Briši postavko",
                okText: i18next.t("std.brisi")
            },
            ok: brisi
        });

    };

    //tk
    DogodekView.prototype.onOdpovej = function (options) {
        console.log('onOdpovej');
    };

    DogodekView.prototype.onZakljuci = function (options) {
        console.log('onZakljuci');
    };

    DogodekView.prototype.onRazmnozi = function (options) {
        console.log('onRazmnozi');
        
        //var razmnoziView = new RazmnoziView(); 
        
        //this.trigger('razmnozi', razmnoziView);
        //this.trigger('razmnozi');

    };

    DogodekView.prototype.getRazredNiz = function () {

        var razred = i18next.t(this.tipDogModel.get('dogodek').razred);
        var niz;
        if (razred === '100s') {
            niz = i18next.t('std.predstava');
        } else if (razred === '200s') {
            niz = i18next.t('std.vaja');
        }
        else if (razred === '300s') {
            niz = i18next.t('std.gostovanje');
        }
        else if (razred === '400s') {
            niz = i18next.t('std.splosno');
        }
        else if (razred === '500s') {
            niz = i18next.t('std.zasedenost');
        }
        else if (razred === '600s') {
            niz = i18next.t('std.tehnicni');
        }

        return niz;
    };
    
    //tk
    DogodekView.prototype.setButtons = function () {
        
        
        console.log('---- seting buttons ----');
        
        console.log('this:');
        console.log(this);
        console.table(this);

        /*
        
        //C FormView.prototype.getToolbarModel
        
        var coll = this.getToolbarModel();
        
        //uredim
    
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-shrani');
        if (but && but.get('disabled')) {
            but.set({
                disabled: false
            });
        }
        
        

        console.log('Test:');
        console.log('Options: ');console.table(this.options);
        console.log('regionToolbar: ');
        console.table(this.regionToolbar);
        console.dir(this.regionToolbar);
        
        console.log(this.toolbarView);
        
        console.log('model:'); console.log(this.model);
        
        var status = this.model.get('status');
        console.log('status: ', status);
        
        //C odkrij delete tab button
        
        var tb = this.getToolbarModel();
        
        console.log('tb: ', this.toolbarView);
        */
    };

    return DogodekView;
});
