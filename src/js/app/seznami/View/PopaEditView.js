/* 
 * Licenca GPLv3
 */
define([
    'backbone',
    'baseUrl',
    'radio',
    'app/Dokument/View/DokumentView',
    'template!../tpl/popa-edit.tpl',
    'template!../tpl/popa-form.tpl',
    'formSchema!popa',
    'i18next',
    'app/Max/View/TabControl',
    'app/Zapisi/View/ZapisiLayout'
], function (
        Backbone,
        baseUrl,
        Radio,
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next,
        TabControl,
        ZapisiLayout
        ) {

    var tabsSplosno = [
        {
            name: i18next.t('ent.splosno'),
            event: 'splosni'
        },
        {
            name: i18next.t('ent.kontakti'),
            event: 'kontakti'
        },
        {
            name: i18next.t('popa.osebe'),
            event: 'osebe'
        },
        {
            name: i18next.t('popa.racuni'),
            event: 'trrji'
        }
    ];

    var gumbi = {
        producent: {
            id: 'doc-producent',
            label: i18next.t('popa.koproducent'),
            element: 'button-trigger',
            trigger: 'koproducent',
            hidden: true
        },
        kupec: {
            id: 'doc-kupec',
            label: i18next.t('popa.kupec'),
            element: 'button-trigger',
            trigger: 'kupec',
            hidden: true
        },
        shrani: {
            id: 'doc-shrani',
            label: i18next.t('std.shrani'),
            element: 'button-trigger',
            trigger: 'shrani',
            disabled: true
        },
        skrij: {
            id: 'doc-skrij',
            label: i18next.t('std.skrij'),
            element: 'button-trigger',
            trigger: 'skrij'
        },
        nasvet: {
            id: 'doc-nasvet',
            icon: 'fa fa-info',
            element: 'button-trigger',
            trigger: 'nasvet'
        }
    };

    var PopaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        regions: {
            regionOsebe: '.region-osebe',
            regionTrrji: '.region-trrji',
            regionNaslovi: '.region-naslovi',
            regionTelefonske: '.region-telefonske',
            regionTabs: '.popa-tabs',
            prilogeR: '.region-priloge'
        },
        buttons: gumbi
    });
    PopaEditView.prototype.getNaziv = function () {
        var naziv = this.model.get('naziv');
        return naziv ? naziv : i18next.t('popa.naziv');
    };

    PopaEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('popa.nova') : this.getNaziv();
    };

    PopaEditView.prototype.onBeforeRender = function () {
        var self = this;
        this.listenTo(this.model, 'sync', function () {
            self.render();
        });
    };
    
    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    PopaEditView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'Popa'
        });
        this.prilogeR.show(view);
    };

    /**
     * Ko označimo poslovnega partnerja za kupca 
     * @returns {undefined}
     */
    PopaEditView.prototype.onKupec = function () {
        var B = Backbone.Model.extend({
            url: baseUrl + '/rest/kupec'
        });

        var kup = new B();
        var self = this;

        kup.save({
            popa: this.model.get('id'),
            status: this.model.get('stakli')
        }, {
            success: function (model) {
                self.toolbarView.hideButtons(['doc-kupec']);
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    /**
     * registrira poslovnega partnerja kot produkcijsko hišo. 
     * @returns {undefined}
     */
    PopaEditView.prototype.onKoproducent = function () {
        var B = Backbone.Model.extend({
            url: baseUrl + '/rest/produkcijskahisa'
        });

        var kup = new B();
        var self = this;

        kup.save({
            popa: this.model.get('id'),
            status: this.model.get('stakli')
        }, {
            success: function (model) {
                self.toolbarView.hideButtons(['doc-producent']);
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });

    };

    PopaEditView.prototype.onRender = function () {

        var tabs = null;

        if (this.options.pogled === "splosno") {
            tabs = tabsSplosno;
        } else if (this.isNew()) {
            tabs = null;
        } else {
            tabs = tabsSplosno;
        }

        if (this.isNew()) {
            tabs = null;
        }

        if (!this.isNew()) {
            this.renderNaslovi();
            this.renderTelefonske();
            this.renderTrrji();
            this.renderKontaktne();
        }
        this.renderTabs(tabs);
    };

    PopaEditView.prototype.onRenderForm = function () {
        if (!this.model.get('producent')) {
            this.toolbarView.showButtons(['doc-producent']);
        }

        if (!this.model.get('kupec')) {
            this.toolbarView.showButtons(['doc-kupec']);
        }
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    PopaEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        if (this.model.get('id')) {
            this.renderPriloge();
        }
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    PopaEditView.prototype.onKontakti = function () {
        this.deselectTab();
        this.$('.pnl-kontakti').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    PopaEditView.prototype.onTrrji = function () {
        this.deselectTab();
        this.$('.pnl-trrji').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    PopaEditView.prototype.onOsebe = function () {
        this.deselectTab();
        this.$('.pnl-osebe').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    PopaEditView.prototype.deselectTab = function () {
        this.$('.popa-panels .tab-pane').removeClass('active');
    };

    PopaEditView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        this.regionTabs.show(this.tabControl);
        return this.tabControl;
    };

    PopaEditView.prototype.renderTrrji = function () {
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
    PopaEditView.prototype.renderTelefonske = function () {
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


    PopaEditView.prototype.renderKontaktne = function () {
        var self = this;
        var coll = self.model.kontaktneCollection;
        if (coll.length === 0) {
            coll.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
        require(['app/seznami/View/KontaktneView'], function (View) {
            var view = new View({
                collection: coll,
                dokument: self.model
            });
            self.regionOsebe.show(view);
            return view;
        });
    };


    PopaEditView.prototype.renderNaslovi = function () {
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

    return PopaEditView;
});
