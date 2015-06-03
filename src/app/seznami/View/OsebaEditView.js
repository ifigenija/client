/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../tpl/oseba-edit.tpl',
    'template!../tpl/oseba-form.tpl',
    'formSchema!oseba',
    'i18next',
    'app/Max/View/TabControl',
    'app/Dokument/View/FormView'
], function (
        DokumentView,
        tpl,
        formTpl,
        schema,
        i18next,
        TabControl,
        FormView
        ) {

    var tabVse = [
        {name: i18next.t('entiteta.splosno'), event: 'splosni'},
        {name: i18next.t('oseba.osebniPodatki'), event: 'osebniPodatki'},
        {name: i18next.t('entiteta.kontakti'), event: 'kontakti'}
    ];

    var tabSplosno = [
        {name: i18next.t('entiteta.splosno'), event: 'splosni'},
        {name: i18next.t('oseba.osebniPodatki'), event: 'osebniPodatki'}
    ];

    var tabNovi = [
        {name: i18next.t('entiteta.splosno'), event: 'splosni'},
        {name: i18next.t('oseba.osebniPodatki'), event: 'osebniPodatki'}
    ];



    var OsebaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        regions: {
            regionOsebniPodatki: '.region-osebniPodatki',
            regionNaslovi: '.region-naslovi',
            regionTelefonske: '.region-telefonske',
            regionTabs: '.oseba-tabs'
        }
    });

    OsebaEditView.prototype.getImePriimek = function () {
        var imeT = this.model.get('ime');
        var priimekT = this.model.get('priimek');

        var ime = imeT ? imeT : i18next.t('oseba.ime');
        var priimek = priimekT ? priimekT : i18next.t('oseba.priimek');

        var imePriimek = ime + ' ' + priimek;

        return imePriimek;
    };

    OsebaEditView.prototype.getNaslov = function () {
        return this.isNew() ? i18next.t('oseba.nova') : this.getImePriimek();
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
            tabs = tabSplosno;
        } else if (this.options.pogled === "vse") {
            tabs = tabVse;
        } else {
            tabs = tabVse;
        }



        if (this.isNew()) {
            tabs = tabNovi;
        }
        this.renderTabs(tabs);

        if (!this.isNew()) {
            this.renderNaslovi();
            this.renderTelefonske();
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
     * Klik na osebni podatki tab
     * @returns {undefined}
     */
    OsebaEditView.prototype.onOsebniPodatki = function () {
        this.deselectTab();
        this.$('.pnl-osebniPodatki').addClass('active');
        this.renderOsebniPodatki();

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

        var self = this;
        require(['app/seznami/View/OsebniPodatkiView', 'app/seznami/Model/OsebniPodatki'], function (OsebniView, Model) {

            if (!self.osebniModel) {
                self.osebniModel = new Model({id: self.model.get('id')});
                self.osebniModel.fetch();
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
