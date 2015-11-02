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
        shraniDodaj: {
            id: 'doc-shrani-dodaj',
            label: i18next.t('std.shraniDodaj'),
            element: 'button-trigger',
            trigger: 'shraniDodaj',
            disabled: true
        },
        shrani: {
            id: 'doc-shrani',
            label: i18next.t('std.shrani'),
            element: 'button-trigger',
            trigger: 'shrani',
            disabled: true
        },
        producent: {
            id: 'doc-producent',
            label: i18next.t('popa.producent'),
            element: 'button-trigger',
            trigger: 'producent',
            hidden: true
        },
        kupec: {
            id: 'doc-kupec',
            label: i18next.t('popa.kupec'),
            element: 'button-trigger',
            trigger: 'kupec',
            hidden: true
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

    /**
     * namenjeno je boljšemu workflowu.
     * Shranemo obstoječ model in dodamo nov model 
     * @returns {undefined}
     */
    PopaEditView.prototype.onShraniDodaj = function () {
        var self = this;
        this.onShrani({
            success: self.posodobiUrlNaslovBrezRender
        });
    };

    PopaEditView.prototype.onShrani = function (options) {
        DokumentView.prototype.onShrani.apply(this, arguments);
    };

    /*
     * posodobimo url strani in dodamo nov model
     * @returns 
     */
    PopaEditView.prototype.posodobiUrlNaslovBrezRender = function () {
        // zamenjamo zadnji del url z id (#model/id -> #model)
        var url = Backbone.history.location.hash;
        var newUrl = url.replace(/\/([\w-]+)$/g, '');
        Radio.channel('layout').command('replaceUrl', newUrl);
        Radio.channel('layout').command('setTitle', this.getNaslov());
        this.trigger('dodaj');
    };
    /**
     * zamenjamo id z drugim id ali pa ga odstranimo
     * @returns {undefined}
     */
    PopaEditView.prototype.posodobiUrlNaslov = function () {
        var fragment = Backbone.history.getFragment();

        fragment = fragment.replace(/\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/, '');

        var newUrl = fragment;
        if (this.model) {
            newUrl = fragment + '/' + this.model.get('id');
        }

        Radio.channel('layout').command('replaceUrl', newUrl);
        Radio.channel('layout').command('setTitle', this.getNaslov());
        this.render();
    };
    /**
     * namenjeno vodenju gumbov shrani in (shrani in dodaj)
     * @param FormView form
     */
    PopaEditView.prototype.formChange = function (form) {
        var tb = this.getToolbarModel();
        var butS = tb.getButton('doc-shrani');
        var butSD = tb.getButton('doc-shrani-dodaj');
        var butP = tb.getButton('doc-preklici');

        if (butS && butS.get('disabled')) {
            butS.set({
                disabled: false
            });
        }

        if (butSD && butSD.get('disabled')) {
            butSD.set({
                disabled: false
            });
        }

        if (butS && !butS.get('disabled')) {
            butP.set({
                label: i18next.t('std.preklici')
            });
        }

        this.triggerMethod('form:change', form);
    };

    PopaEditView.prototype.onBeforeRender = function () {
        var self = this;
        this.listenToOnce(this.model, 'sync', function () {
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
            popa: self.model.get('id'),
            status: self.model.get('stakli')
        }, {
            success: function (model) {
                self.toolbarView.hideButtons(['doc-kupec']);
                self.model.set('kupec', kup.get('id'));
                self.model.save({});
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    /**
     * registrira poslovnega partnerja kot produkcijsko hišo. 
     * @returns {undefined}
     */
    PopaEditView.prototype.onProducent = function () {
        var B = Backbone.Model.extend({
            url: baseUrl + '/rest/produkcijskahisa'
        });

        var kup = new B();
        var self = this;

        kup.save({
            popa: self.model.get('id'),
            status: self.model.get('stakli')
        }, {
            success: function (model) {
                self.toolbarView.hideButtons(['doc-producent']);
                self.model.set('producent', kup.get('id'));
                self.model.save({});
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
        if (!this.model.get('producent') && this.model.get('id')) {
            this.toolbarView.showButtons(['doc-producent']);
        }

        if (!this.model.get('kupec') && this.model.get('id')) {
            this.toolbarView.showButtons(['doc-kupec']);
        }

        if (this.isNew() || this.options.pogled === "modal") {
            this.$('.nav.nav-tabs').addClass('hidden');
        } else {
            this.$('.nav.nav-tabs').removeClass('hidden');
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
                dokument: self.model,
                zapirajFormo: true
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
                dokument: self.model,
                zapirajFormo: true
            });
            self.regionTelefonske.show(view);
            return view;
        });
    };


    PopaEditView.prototype.renderKontaktne = function () {
        var self = this;
        require(['app/seznami/View/KontaktneView'], function (View) {
            var view = new View({
                collection: self.model.kontaktneOsebeCollection,
                dokument: self.model,
                zapirajFormo: true
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
                dokument: self.model,
                zapirajFormo: true
            });
            self.regionNaslovi.show(view);
            return view;
        });
    };

    return PopaEditView;
});
