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
    'formSchema!vaja',
    'template!../tpl/vajaPlan-form.tpl',
    'template!../tpl/vaja-dok.tpl',
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
        schemaVaja,
        vajaTpl,
        dokumentTpl,
        ZapisiLayout,
        SodelujociView
        ) {
    /**
     * Različni možni pogledi osebeedit view.
     * Vsak pogled prikaže samo določene podatke/tabe
     * @type Array
     */
    var tabVse = [
        {name: i18next.t('vaja.splosno'), event: 'splosni'},
        {name: i18next.t('vaja.sodelujoci'), event: 'sodelujoci'}
    ];

    var tabNovi = [
        {name: i18next.t('ent.splosno'), event: 'splosni'}
    ];

    var chPermission = Radio.channel('global');

    var VajaView = DokumentView.extend({
        template: dokumentTpl,
        formTemplate: vajaTpl,
        schema: schemaVaja.toFormSchema().schema,
        regions: {
            tabsR: '.vaja-tabs',
            sodelujociR: '.region-sodelujoci',
            prilogeR: '.region-priloge'
        },
        triggers: {
            'click .prikazi-koledar': 'koledar:prostor'
        }
    });
    
    VajaView.prototype.initialize = function(options){
        this.schema = options.schema || this.schema;
    };

    VajaView.prototype.onKoledarProstor = function () {
        console.log('koledar');
    };
    
    VajaView.prototype.onRenderForm = function () {
    };

    /**
     * Kaj se zgodi ko se je view že vstavil v DOM
     * @returns {undefined}
     */
    VajaView.prototype.onRender = function () {
        var tabs = tabVse;
        this.renderTabs(tabs);
    };

    /**
     * Izris tabov
     * @returns {VajaView_L11.TabControl}
     */
    VajaView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        this.tabsR.show(this.tabControl);
        return this.tabControl;
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    VajaView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'Vaja'
        });
        this.prilogeR.show(view);
    };

    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    VajaView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        if (this.model.get('id')) {
            this.renderPriloge();
        }
    };

    VajaView.prototype.onSodelujoci = function () {
        this.deselectTab();
        this.$('.pnl-sodelujoci').addClass('active');
        this.renderSodelujoci();

    };

    /**
     * deselect taba 
     * @returns {undefined}
     */
    VajaView.prototype.deselectTab = function () {
        this.$('.oseba-panels .tab-pane').removeClass('active');
    };

    VajaView.prototype.renderSodelujoci = function () {
        var view = new SodelujociView({
            uprizoritev: this.model.get('uprizoritev')
        });
        
        this.sodelujociR.show(view);
    };

    return VajaView;
});
