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
    'app/Max/View/TabControl',
    'app/Dokument/View/DokumentView',
    'formSchema!dogodek',
    'template!../tpl/dogodek-dok.tpl',
    'template!../tpl/dogodek-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    './SodelujociView',
    'jquery.jsonrpc'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Handlebars,
        Marionette,
        $,
        TabControl,
        DokumentView,
        schemaDogodek,
        dokumentTpl,
        dogodekTpl,
        ZapisiLayout,
        SodelujociView
        ) {
    
    var tabVse = [
        {name: i18next.t('dogodek.title'), event: 'dogodek'},
        {name: i18next.t('dogodek.razred'), event: 'razred'},
        {name: i18next.t('dogodek.sodelujoci'), event: 'sodelujoci'}
    ];

    var tabNovi = [
        {name: i18next.t('dogodek.title'), event: 'dogodek'}
    ];

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
        triggers: {
            'click .prikazi-koledar': 'koledar:prostor'
        }
    });

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
        var chPermission = Radio.channel('global');
        
        var tabs = tabVse;
        this.renderTabs(tabs);
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
        if (this.model.get('id')) {
            this.renderPriloge();
        }
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
        var view = new SodelujociView({
            uprizoritev: this.model.get('uprizoritev')
        });
        this.sodelujociR.show(view);
    };

    DogodekView.prototype.renderRazredDogodka = function () {        
        var view = new this.TipDogView({
            model: this.tipDogModel
        });        
        this.razredDogodkaR.show(view);
    };

    return DogodekView;
});
