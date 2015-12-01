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
        simpleTpl
        ) {
    /**
     * Različni možni pogledi osebeedit view.
     * Vsak pogled prikaže samo določene podatke/tabe
     * @type Array
     */
    var tabVse = [
        {name: i18next.t('vaja.splosno'), event: 'splosni'},
        {name: i18next.t('vaja.zakljucek'), event: 'zakljucek'},
        {name: i18next.t('vaja.sodelujoci'), event: 'sodelujoci'}
    ];

    var tabNovi = [
        {name: i18next.t('ent.splosno'), event: 'splosni'}
    ];

    var tabZakljucevanje = [
        {name: i18next.t('vaja.zakljucek'), event: 'zakljucek'}
    ];

    var chPermission = Radio.channel('global');

    var OsebaEditView = DokumentView.extend({
        template: simpleTpl,
        formTemplate: vajaTpl,
        schema: schemaVaja.toFormSchema().schema,
        regions: {
            tabsR: '.vaja-tabs'
        },
        triggers: {
        }
    });

    OsebaEditView.prototype.onRenderForm = function () {
    };

    /**
     * Kaj se zgodi ko se je view že vstavil v DOM
     * @returns {undefined}
     */
    OsebaEditView.prototype.onRender = function () {
        var tabs = tabVse;        
        this.renderTabs(tabs);
    };

    /**
     * Izris tabov
     * @returns {OsebaEditView_L11.TabControl}
     */
    OsebaEditView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        this.tabsR.show(this.tabControl);
        return this.tabControl;
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    OsebaEditView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'Oseba'
        });
        this.prilogeR.show(view);
    };

    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    OsebaEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        if (this.model.get('id')) {
            this.renderPriloge();
        }
    };
    /**
     * Klik na osebni podatki tab
     * @returns {undefined}
     */
    OsebaEditView.prototype.onOsebniPodatki = function () {
        this.deselectTab();
        this.$('.pnl-osebniPodatki').addClass('active');
        this.renderOsebniPodatki();

    };

    /**
     * deselect taba 
     * @returns {undefined}
     */
    OsebaEditView.prototype.deselectTab = function () {
        this.$('.oseba-panels .tab-pane').removeClass('active');
    };

    /**
     * Izris Osebnih podakov
     * @returns {undefined}
     */
    OsebaEditView.prototype.renderOsebniPodatki = function () {

        var self = this;
        require(['app/seznami/View/OsebniPodatkiView', 'app/seznami/Model/OsebniPodatki'], function (OsebniView, Model) {

            if (!self.osebniModel) {
                self.osebniModel = new Model({id: self.model.get('id')});
                self.osebniModel.fetch({
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            }

            var o = new OsebniView({
                model: self.osebniModel
            });
            self.regionOsebniPodatki.show(o);
        });
    };

    /**
     * Izris telefonskih
     * @returns {undefined}
     */
    OsebaEditView.prototype.renderTelefonske = function () {
        var self = this;
        var disabled = false;

        if (!this.model.get('id')) {
            disabled = true;
        }
        require(['app/seznami/View/TelefonskaView'], function (View) {
            var view = new View({
                collection: self.model.telefonskeCollection,
                dokument: self.model,
                disabled: disabled,
                zapirajFormo: true
            });
            self.regionTelefonske.show(view);
            return view;
        });
    };

    return OsebaEditView;
});
