/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../tpl/oseba-edit.tpl',
    'template!../tpl/oseba-form.tpl',
    'template!../tpl/osebaOsebniPodatki-form.tpl',
    'formSchema!oseba',
    'i18next',
    'app/Max/View/TabControl',
    'app/Dokument/View/FormView'
], function (
        DokumentView,
        tpl,
        formTpl,
        osebaOsebniTpl,
        schema,
        i18next,
        TabControl,
        FormView
        ) {

    var tabSplosno =
            [
                {
                    name: i18next.t('seznami.view.splosno'),
                    event: 'splosni'
                },
                {
                    name: i18next.t('seznami.view.oseba.osebniPodatki'),
                    event: 'osebniPodatki'
                },
                {
                    name: i18next.t('seznami.view.oseba.kontakti'),
                    event: 'kontakti'
                },
                {
                    name: i18next.t('seznami.view.oseba.racuni'),
                    event: 'trrji'
                }
            ];

    var tabKontaktna =
            [
                {
                    name: i18next.t('seznami.view.splosno'),
                    event: 'splosni'
                },
                {
                    name: i18next.t('seznami.view.oseba.kontakti'),
                    event: 'osebniPodatki'
                }
            ];
    var tabNovi =
            [
                {
                    name: i18next.t('seznami.view.splosno'),
                    event: 'splosni'
                },
                {
                    name: i18next.t('seznami.view.oseba.osebniPodatki'),
                    event: 'osebniPodatki'
                }
            ];

    var OsebaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        regions: {
            regionOsebniPodatki: '.region-osebniPodatki',
            regionTrrji: '.region-trrji',
            regionNaslovi: '.region-naslovi',
            regionTelefonske: '.region-telefonske',
            regionZaposlitve: '.region-zaposlitve',
            regionTabs: '.oseba-tabs'
        }
    });

    /*OsebaEditView.prototype.initialize = function () {
     var perm = JSON.parse(sessionStorage.getItem('ifi.user.data'));
     console.log(perm['permissions']);
     };*/
    OsebaEditView.prototype.getImePriimek = function () {
        var imeT = this.model.get('ime');
        var priimekT = this.model.get('priimek');

        var ime = imeT ? imeT : i18next.t('seznami.view.oseba.ime');
        var priimek = priimekT ? priimekT : i18next.t('seznami.view.oseba.priimek');

        var imePriimek = ime + ' ' + priimek;

        return imePriimek;
    };

    OsebaEditView.prototype.getNaslov = function () {
        return this.isNew() ? i18next.t('seznami.view.oseba.nova') : this.getImePriimek();
    };

    OsebaEditView.prototype.onBeforeRender = function () {
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };


    OsebaEditView.prototype.onRender = function () {

        var tabs = null;

        if (this.options.pogled === "kontaktna") {
            tabs = tabKontaktna;
        } else if (this.options.pogled === "splosno") {
            tabs = tabSplosno;
        } else {
            tabs = tabSplosno;
        }

        if (this.isNew()) {
            tabs = tabNovi;
        }

        if (!this.isNew()) {
            this.renderNaslovi();
            this.renderTrrji();
            this.renderTelefonske();
        }
        
        this.renderOsebniPodatki();

        this.renderTabs(tabs);
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
     * Klik na osebni podatki tab
     * @returns {undefined}
     */
    OsebaEditView.prototype.onOsebniPodatki = function () {
        this.deselectTab();
        this.$('.pnl-osebniPodatki').addClass('active');

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

    /**
     * Izris tabov
     * @returns {OsebaEditView_L11.TabControl}
     */
    OsebaEditView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        this.regionTabs.show(this.tabControl);
        return this.tabControl;
    };

    /**
     * Izris Osebnih podakov
     * @returns {undefined}
     */
    OsebaEditView.prototype.renderOsebniPodatki = function () {
      
        var Fv = FormView.extend({
            formTitle: this.model.get('ime'),
            buttons: {
                shrani: {
                    id: 'doc-shrani',
                    label: 'Shrani',
                    element: 'button-trigger',
                    trigger: 'shrani',
                    disabled: true
                },
                preklici: {
                    id: 'doc-preklici',
                    label: 'Prekliči',
                    element: 'button-trigger',
                    trigger: 'preklici'
                }
            },
            schema: schema.toFormSchema().schema,
            formTemplate: osebaOsebniTpl,
            onFormChange: function (form) {
                var tb = this.getToolbarModel();
                var but = tb.getButton('doc-shrani');
                if (but.get('disabled')) {
                    but.set({
                        disabled: false
                    });
                }
            }
        });

        var view = new Fv({
            model: this.model
        });

        this.regionOsebniPodatki.show(view);
        return view;
    };
    /**
     * Izris TRR
     * @returns {undefined}
     */
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
    /**
     * Izris telefonskih
     * @returns {undefined}
     */
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

    /**
     * Izris naslovov
     * @returns {undefined}
     */
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

    return OsebaEditView;
});
