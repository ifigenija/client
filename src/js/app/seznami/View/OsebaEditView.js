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
    'app/Zapisi/View/ZapisiLayout',
    'backbone',
    'app/seznami/View/OsebaRelacijeView',
    'app/seznami/View/PodobneOsebeView',
    'template!../tpl/alternacija-oseba-relacija.tpl',
    'template!../tpl/zaposlitev-oseba-relacija.tpl',
    'template!../tpl/avtor-oseba-relacija.tpl',
    'template!../tpl/pogodba-oseba-relacija.tpl',
    'template!../tpl/kontaktna-oseba-relacija.tpl',
    'underscore',
    'jquery',
    'jquery.jsonrpc'
], function (
        DokumentView,
        tpl,
        formTpl,
        schema,
        i18next,
        TabControl,
        Radio,
        ZapisiLayout,
        Backbone,
        RelacijeView,
        PodobneOsebeView,
        alternacijaRelTpl,
        zaposlitevRelTpl,
        avtorRelTpl,
        pogodbaRelTpl,
        kontaktnaRelTpl,
        _,
        $
        ) {
    /**
     * Različni možni pogledi osebeedit view.
     * Vsak pogled prikaže samo določene podatke/tabe
     * @type Array
     */
    var tabVse = [
        {name: i18next.t('ent.splosno'), event: 'splosni'},
        {name: i18next.t('oseba.osebniPodatki'), event: 'osebniPodatki'},
        {name: i18next.t('oseba.relacije'), event: 'relacije'}
    ];

    var tabNovi = [
        {name: i18next.t('ent.splosno'), event: 'splosni'}
    ];

    var chPermission = Radio.channel('global');

    var OsebaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        checkBeforeSave: true,
        regions: {
            regionOsebniPodatki: '.region-osebniPodatki',
            regionNaslovi: '.region-naslovi',
            regionTelefonske: '.region-telefonske',
            regionTabs: '.oseba-tabs',
            prilogeR: '.region-priloge',
            kontaktneOsebeR: '.region-kontaktneOsebe',
            avtorjiBesedilR: '.region-avtorjiBesedil',
            alternacijeR: '.region-alternacije',
            pogodbeR: '.region-pogodbe',
            zaposlitveR: '.region-zaposlitev',
            podobneOsebeR: '.region-podobne-osebe'
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
                label: i18next.t('std.zapri'),
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
        },
        triggers: {
            "click .oseba-polnoime": "polnoIme",
            "click .oseba-psevdonim": "psevdonim"
        }
    });

    OsebaEditView.prototype.onShraniDodaj = function () {
        var self = this;
        this.onShrani({
            success: self.posodobiUrlNaslovBrezRender
        });
    };

    OsebaEditView.prototype.renderPodobneOsebe = function (osebe, options) {
        var podOsebeView = new PodobneOsebeView({
            osebe: osebe,
            formTitle: "Opozorilo: Najdene osebe s podobnim priimkom"
        });

        podOsebeView.once('shraniOsebo', function () {
            this.trigger('shraniModel', options);
        }, this);

        podOsebeView.once('preklici', function () {
            this.podobneOsebeR.empty();
            //omogočimo gumb shrani
            var tb = this.getToolbarModel();
            var butS = tb.getButton('doc-shrani');

            if (butS) {
                butS.set({
                    disabled: false
                });
            }
        }, this);

        this.podobneOsebeR.show(podOsebeView);
    };

    /**
     * funkcija namenjena preverjanju pred shranjevanjem modela
     * @param {type} options
     * @returns {undefined}
     */
    OsebaEditView.prototype.onBeforeShrani = function (options) {
        var self = this;

        if (!this.model.id) {
            this.model.set('id', null);
        }

        /**
         * Pri uspešno pridobljenem seznamu oseb
         * @param Array osebe
         * @param opcije options
         * @returns {undefined}
         */
        var success = function (osebe, options) {
            if (osebe.length === 0) {
                self.trigger('shraniModel', options);
            } else {
                //onemogočimo gumb shrani dokler ne shranemo ali prekličemo 
                var tb = self.getToolbarModel();
                var butS = tb.getButton('doc-shrani');

                if (butS) {
                    butS.set({
                        disabled: true
                    });
                }
                //izris seznama podobnih oseb
                self.renderPodobneOsebe(osebe, options);
            }
        };
        var error = function (error) {
            Radio.channel('error').command('flash', {
                message: error.message,
                code: error.code,
                severity: error.severity
            });
        };
        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/app/oseba'});
        rpc.call('podobneOsebe', {
            'oseba': this.model
        }, success, error);
    };

    OsebaEditView.prototype.onShrani = function (options) {
        DokumentView.prototype.onShrani.apply(this, arguments);
    };

    /**
     * posodobimo url strani in dodamo nov model
     */
    OsebaEditView.prototype.posodobiUrlNaslovBrezRender = function () {
        // zamenjamo zadnji del url z id (#model/dodaj -> #model/id)
        var url = Backbone.history.location.hash;
        var newUrl = url.replace(/([\w-]+)$/g, this.model.id);
        Radio.channel('layout').command('replaceUrl', newUrl);
        Radio.channel('layout').command('setTitle', this.getNaslov());
        this.trigger('dodaj');
    };

    /**
     * namenjeno vodenju gumbov shrani in (shrani in dodaj)
     * @param FormView form
     */
    OsebaEditView.prototype.formChange = function (form) {
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

    OsebaEditView.prototype.onPolnoIme = function () {
        var polja = this.form.fields;

        var ime = polja.ime.editor.getValue();
        ime = ime.replace(/\s+$/, '');
        ime = ime ? ime : '';

        var srednjeIme = polja.srednjeIme.editor.getValue();
        srednjeIme = srednjeIme.replace(/\s+$/, '');
        srednjeIme = srednjeIme ? srednjeIme.toUpperCase().charAt(0) + '.' : '';

        var priimek = polja.priimek.editor.getValue();
        priimek = priimek.replace(/\s+$/, '');
        priimek = priimek ? priimek : '';

        var polnoIme;

        if (srednjeIme) {
            polnoIme = ime + ' ' + srednjeIme + ' ' + priimek;
        } else {
            polnoIme = ime + ' ' + priimek;
        }

        var psevdonim = polja.psevdonim.editor.getValue();

        if (!psevdonim) {
            this.form.fields.polnoIme.setValue(polnoIme);
        }

        return polnoIme;
    };

    OsebaEditView.prototype.onPsevdonim = function () {
        var polja = this.form.fields;
        var psevdonim = polja.psevdonim.editor.getValue();
        psevdonim = psevdonim.replace(/\s+$/, '');
        psevdonim = psevdonim ? psevdonim : '';

        if (psevdonim) {
            this.form.fields.polnoIme.setValue(psevdonim);
        } else {
            this.form.fields.polnoIme.setValue(this.onPolnoIme());
        }

        return psevdonim;
    };

    OsebaEditView.prototype.onRenderForm = function () {
        this.form.on('ime:change', this.onPolnoIme, this);
        this.form.on('srednjeIme:change', this.onPolnoIme, this);
        this.form.on('priimek:change', this.onPolnoIme, this);
        this.form.on('psevdonim:change', this.onPsevdonim, this);

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
     * Klik na relacije tab
     * @returns {undefined}
     */
    OsebaEditView.prototype.onRelacije = function () {
        this.deselectTab();
        this.$('.pnl-relacije').addClass('active');
        this.renderRelacije();

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

    /**
     * 
     * @param string relation
     * @param string lookup
     * @param {type} columns
     * @returns {DokumentView@call;extend.prototype.getRelationView.view|OsebaEditView_L15.RelacijeView}
     */
    OsebaEditView.prototype.getRelationView = function (relation, lookup, serializeData, tpl) {
        var view = new RelacijeView({
            owner: 'oseba',
            ownerId: this.model.get('id'),
            relation: relation,
            lookup: lookup,
            type: 'lookup',
            title: i18next.t(lookup + ".relacija"),
            itemTpl: tpl,
            serializeData: serializeData
        });
        return view;
    };

    /**
     * Izris Osebnih podakov
     * @returns {undefined}
     */
    OsebaEditView.prototype.renderRelacije = function () {
        this.renderAlternacije();
        this.renderPogodbe();
        this.renderZaposlitve();
        this.renderKontaktneOsebe();
        this.renderAvtorjeBesedil();
    };

    OsebaEditView.prototype.renderAlternacije = function () {
        var serializeData = function () {
            var uprId = this.model.get('funkcija').uprizoritev.id;
            var url = '#pro/uprizoritev/' + uprId;
            return _.extend(this.model.toJSON(), {
                href: url
            });
        };

        var rv = this.getRelationView('alternacije', 'alternacija', serializeData, alternacijaRelTpl);
        this.alternacijeR.show(rv);
    };

    OsebaEditView.prototype.renderPogodbe = function () {
        var serializeData = function () {
            var uprId = this.model.get('alternacije')[0].funkcija.uprizoritev.id;
            var url = '#pro/stroskovnik/' + uprId;
            return _.extend(this.model.toJSON(), {
                href: url
            });
        };

        var rv = this.getRelationView('pogodbe', 'pogodba', serializeData, pogodbaRelTpl);
        this.pogodbeR.show(rv);
    };

    OsebaEditView.prototype.renderZaposlitve = function () {
        var serializeData = function () {
            var url = '#zaposlitev/' + this.model.id;
            return _.extend(this.model.toJSON(), {
                href: url
            });
        };

        var rv = this.getRelationView('zaposlitve', 'zaposlitev', serializeData, zaposlitevRelTpl);
        this.zaposlitveR.show(rv);
    };

    OsebaEditView.prototype.renderKontaktneOsebe = function () {
        var serializeData = function () {
            var url = '#popa/' + this.model.get('popa').id;
            return _.extend(this.model.toJSON(), {
                href: url
            });
        };

        var rv = this.getRelationView('kontaktneOsebe', 'kontaktnaOseba', serializeData, kontaktnaRelTpl);
        this.kontaktneOsebeR.show(rv);
    };

    OsebaEditView.prototype.renderAvtorjeBesedil = function () {
        var serializeData = function () {
            var url = '#arhiv/besedila/' + this.model.get('besedilo').id;
            return _.extend(this.model.toJSON(), {
                href: url
            });
        };

        var rv = this.getRelationView('avtorjiBesedil', 'avtorBesedila', serializeData, avtorRelTpl);
        this.avtorjiBesedilR.show(rv);
    };

    return OsebaEditView;
});
