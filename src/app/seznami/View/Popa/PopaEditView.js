/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../../tpl/popa/popa-edit.tpl',
    'template!../../tpl/popa/popa-form.tpl',
    'formSchema!popa',
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


    var PopaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        regions: {
            regionOsebe: '.region-osebe',
            regionTrrji: '.region-trrji',
            regionNaslovi: '.region-naslovi',
            regionTelefonske: '.region-telefonske',
            regionTabs: '.popa-tabs'
        },
        tabs: [{
                name: i18next.t('seznami.view.splosno'),
                event: 'splosni'
            },
            {
                name: i18next.t('seznami.view.popa.kontakti'),
                event: 'kontakti'
            },
            {
                name: i18next.t('seznami.view.popa.osebe'),
                event: 'osebe'
            },
            {
                name: i18next.t('seznami.view.popa.racuni'),
                event: 'trrji'
            }]
    });
    PopaEditView.prototype.getNaziv = function () {
        var naziv = this.model.get('naziv');
        return naziv ? naziv : i18next.t('seznami.view.popa.naziv');
    };

    PopaEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('seznami.view.popa.nova') : this.getNaziv();
    };

    PopaEditView.prototype.onBeforeRender = function () {
        var self = this;
        this.listenTo(this.model, 'sync', function () {
            self.render();
        });
    };

    PopaEditView.prototype.onSkrij = function () {
        console.log('xxxx');
    };
    PopaEditView.prototype.onRender = function () {
        if (this.isNew()) {
            this.tabs = null;
        } else {
            this.renderNaslovi();
            this.renderTelefonske();
            this.renderTrrji();
            this.renderOsebe();
        }
        
        this.renderTabs();
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    PopaEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
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

    PopaEditView.prototype.renderTabs = function () {
        this.tabControl = new TabControl({tabs: this.tabs, listener: this});
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

    PopaEditView.prototype.renderOsebe = function () {

        var self = this;
        require(['app/seznami/View/Oseba/OsebaView'], function (View) {
            var view = new View({
                url: "/rest/oseba",
                pogled: 'kontaktna'
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
