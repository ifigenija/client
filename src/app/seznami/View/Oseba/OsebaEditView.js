/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../../tpl/oseba/oseba-edit.tpl',
    'template!../../tpl/oseba/oseba-form.tpl',
    'formSchema!oseba',
    'i18next',
    'app/Max/View/TabControl'
], function (
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next,
        TabControl
        ) {

    var OsebaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        regions: {
            regionTrrji: '.region-trrji',
            regionNaslovi: '.region-naslovi',
            regionTelefonske: '.region-telefonske',
            regionZaposlitve: '.region-zaposlitve',
            regionTabs: '.oseba-tabs'
        },
        tabs: [{
                name: i18next.t('seznami.view.splosno'),
                event: 'splosni'
            },
            {
                name: i18next.t('seznami.view.oseba.kontakti'),
                event: 'kontakti'
            },
            {
                id: i18next.t('produkcija.view.zaposlitev.zaposlitve'),
                name: i18next.t('produkcija.view.zaposlitev.zaposlitve'),
                event: 'zaposlitve'
            },
            {
                id: i18next.t('seznami.view.oseba.racuni'),
                name: i18next.t('seznami.view.oseba.racuni'),
                event: 'trrji'
            }]
    });

    OsebaEditView.prototype.getImePriimek = function () {
        var imeT = this.model.get('ime');
        var priimekT = this.model.get('priimek');
        
        var ime = imeT ? imeT : i18next.t('seznami.view.oseba.ime');
        var priimek = priimekT ? priimekT : i18next.t('seznami.view.oseba.priimek');
        
        var imePriimek = ime + ' ' + priimek;

        return imePriimek;
    };

    OsebaEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('seznami.view.oseba.nova') : this.getImePriimek();
    };
    
    OsebaEditView.prototype.onBeforeRender = function(){
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };


    OsebaEditView.prototype.onRender = function () {
        this.renderTabs();
        
        if (this.isNew()) {
            this.$('.tab-kontakti a').prop('disabled', 'disabled');
            this.$('.tab-trriji a').prop('disabled', 'disabled');
            this.$('.tab-zaposlitve a').prop('disabled', 'disabled');
        } else {
            this.renderNaslovi();
            this.renderTrrji();
            this.renderTelefonske();
            this.renderZaposlitve();
        }
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    OsebaEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    OsebaEditView.prototype.onKontakti = function () {
        this.deselectTab();
        this.$('.pnl-kontakti').addClass('active');
    };
    /**
     * Klik na tab za trr podatke 
     * @returns {undefined}
     */
    OsebaEditView.prototype.onTrrji = function () {
        this.deselectTab();
        this.$('.pnl-trrji').addClass('active');
    };
    /**
     * Klik na tab za zaposlitvene podatke 
     * @returns {undefined}
     */
    OsebaEditView.prototype.onZaposlitve = function () {
        this.deselectTab();
        this.$('.pnl-zaposlitve').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    OsebaEditView.prototype.deselectTab = function () {
        this.$('.oseba-panels .tab-pane').removeClass('active');
    };

    OsebaEditView.prototype.renderTabs = function () {
        this.tabControl = new TabControl({tabs: this.tabs, listener: this});
        this.regionTabs.show(this.tabControl);
        return this.tabControl;
    };

    OsebaEditView.prototype.renderTrrji = function () {
        var self = this;
        require(['app/seznami/View/TrrView'], function (View) {
            var view = new View({
                collection: self.model.trrjiCollection,
                dokument: self.model
            });
            self.regionTrrji.show(view);
            return view;
        });
    };
    OsebaEditView.prototype.renderTelefonske = function () {
        var self = this;
        require(['app/seznami/View/TelefonskaView'], function (View) {
            var view = new View({
                collection: self.model.telefonskeCollection,
                dokument: self.model
            });
            self.regionTelefonske.show(view);
            return view;
        });
    };

    OsebaEditView.prototype.renderNaslovi = function () {
        var self = this;
        require(['app/seznami/View/PostniNaslovView'], function (View) {
            var view = new View({
                collection: self.model.nasloviCollection,
                dokument: self.model
            });
            self.regionNaslovi.show(view);
            return view;
        });
    };
    
    OsebaEditView.prototype.renderZaposlitve = function () {
        var self = this;
        require(['app/seznami/View/Oseba/ZaposlitevView'], function (View) {
            var view = new View({
                collection: self.model.zaposlitveCollection,
                dokument: self.model
            });
            self.regionZaposlitve.show(view);
            return view;
        });
    };

    return OsebaEditView;
});
