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
    'radio',
    'app/Zapisi/View/ZapisiLayout'
], function (
        DokumentView,
        tpl,
        formTpl,
        schema,
        i18next,
        TabControl,
        Radio,
        ZapisiLayout
        ) {
    /**
     * Različni možni pogledi osebeedit view.
     * Vsak pogled prikaže samo določene podatke/tabe
     * @type Array
     */
    var tabVse = [
        {name: i18next.t('ent.splosno'), event: 'splosni'},
        {name: i18next.t('oseba.osebniPodatki'), event: 'osebniPodatki'}
    ];

    var tabNovi = [
        {name: i18next.t('ent.splosno'), event: 'splosni'}
    ];

    var chPermission = Radio.channel('global');

    var OsebaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        regions: {
            regionOsebniPodatki: '.region-osebniPodatki',
            regionNaslovi: '.region-naslovi',
            regionTelefonske: '.region-telefonske',
            regionTabs: '.oseba-tabs',
            prilogeR: '.region-priloge'
        },
        buttons: {
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
            preklici: {
                id: 'doc-preklici',
                label: i18next.t('std.preklici'),
                element: 'button-trigger',
                trigger: 'preklici'
            },
            nasvet: {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                title: i18next.t('std.pomoc'),
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        }
    });

    OsebaEditView.prototype.prepareToolbar = function () {
        return  this.model ?
                [
                    [
                        this.buttons.shraniDodaj,
                        this.buttons.shrani,
                        this.buttons.preklici,
                        this.buttons.nasvet
                    ]
                ] : [[]];

    };

    OsebaEditView.prototype.onShraniDodaj = function () {
        var self = this;
        this.on('save:success', function () {
            self.trigger('dodaj');
        }, this);
        DokumentView.prototype.onShrani.apply(this, arguments);
    };
    
    OsebaEditView.prototype.formChange = function (form) {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-shrani');
        if (but && but.get('disabled')) {
            but.set({
                disabled: false
            });
        }
        
        var but = tb.getButton('doc-shrani-dodaj');
        if (but && but.get('disabled')) {
            but.set({
                disabled: false
            });
        }

        this.triggerMethod('form:change', form);
    };

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

    /**
     * kaj se zgodi predno se view vstavi v DOM
     * @returns {undefined}
     */
    OsebaEditView.prototype.onBeforeRender = function () {
        var self = this;
        this.listenToOnce(this.model, 'sync', function (coll) {
            self.render();
        });
    };

    OsebaEditView.prototype.polnoIme = function () {
        var polja = this.form.fields;
        var ime = polja.ime.editor.getValue();
        ime = ime ? ime : '';

        var srednjeIme = polja.srednjeIme.editor.getValue();
        srednjeIme = srednjeIme ? srednjeIme.toUpperCase().charAt(0) + '.' : '';

        var priimek = polja.priimek.editor.getValue();
        priimek = priimek ? priimek : '';

        var polnoIme = ime + ' ' + srednjeIme + ' ' + priimek;

        this.form.fields.polnoIme.setValue(polnoIme);

        return polnoIme;
    };

    OsebaEditView.prototype.onRenderForm = function () {
        this.form.on('ime:change', this.polnoIme, this);
        this.form.on('srednjeIme:change', this.polnoIme, this);
        this.form.on('priimek:change', this.polnoIme, this);

        if (this.isNew() || this.options.pogled === "modal") {
            this.$('.nav.nav-tabs').addClass('hidden');
        } else {
            this.$('.nav.nav-tabs').removeClass('hidden');
        }

        var permission = chPermission.request('isGranted', "Oseba-write");

        if (!permission) {
            this.$('input').prop("disabled", true);
            this.$('select').prop("disabled", true);
        }
    };

    /**
     * Kaj se zgodi ko se je view že vstavil v DOM
     * @returns {undefined}
     */
    OsebaEditView.prototype.onRender = function () {

        var tabs = null;
        var pogled = this.options.pogled;

        if (pogled === "kontaktna" || pogled === "modal") {
            tabs = tabNovi;
        } else if (pogled === "vse") {
            tabs = tabVse;
        } else {
            tabs = tabVse;
        }

        var permission = chPermission.request('isGranted', "Oseba-write");
        if (!permission) {
            tabs = tabNovi;
        }

        if (this.isNew() || this.options.pogled === "modal") {
            tabs = null;
        }

        if (pogled !== "modal") {
            this.renderTabs(tabs);

            this.renderNaslovi();
            this.renderTelefonske();
        }
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

    /**
     * Izris naslovov
     * @returns {undefined}
     */
    OsebaEditView.prototype.renderNaslovi = function () {
        var self = this;
        var disabled = false;

        if (!this.model.get('id')) {
            disabled = true;
        }
        require(['app/seznami/View/PostniNaslovView'], function (View) {
            var view = new View({
                collection: self.model.nasloviCollection,
                dokument: self.model,
                disabled: disabled,
                zapirajFormo: true
            });
            self.regionNaslovi.show(view);
            return view;
        });
    };

    return OsebaEditView;
});
