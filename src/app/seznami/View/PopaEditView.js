/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../tpl/popa-edit.tpl',
    'template!../tpl/popa-form.tpl',
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

    var tabsSplosno =
            [
                {
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
                }
            ];

    var gumbi = {
        'doc-koproducent': {
            id: 'doc-koproducent',
            label: 'Koproducent',
            element: 'button-trigger',
            trigger: 'koproducent'
        },
        'doc-kupec': {
            id: 'doc-kupec',
            label: 'Kupec',
            element: 'button-trigger',
            trigger: 'kupec'
        },
        'doc-shrani': {
            id: 'doc-shrani',
            label: 'Shrani',
            element: 'button-trigger',
            trigger: 'shrani',
            disabled: true
        },
        'doc-skrij': {
            id: 'doc-skrij',
            label: 'Skrij',
            element: 'button-trigger',
            trigger: 'skrij'
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
            regionTabs: '.popa-tabs'
        },
        buttons: gumbi,
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
    PopaEditView.prototype.onKupec = function () {
        console.log('Kupec');
    };
    PopaEditView.prototype.onKoproducent = function () {
        console.log('Koproducent');
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
        var coll =  self.model.kontaktneCollection;
        if (coll.length === 0 ) {
            coll.fetch();
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
