/* 
 * Enota programa razširi funkcionalnost postavke view,
 * s funkcijami za izris postavk enote programa,
 * da jih ne bomo pisali pri pri vsaki enoti.
 * Licenca GPLv3
 */
define([
    'i18next',
    'backbone-modal',
    'marionette',
    'app/bars',
    'radio',
    'app/Dokument/View/FormView',
    'app/Dokument/View/PostavkeView',
    'app/programDela/View/DrugiVirView',
    'app/programDela/View/KoprodukcijaView',
    'app/programDela/View/PrenesiView',
    'app/programDela/Model/TipProgramskeEnote',
    'template!../tpl/enota-programa.tpl',
    'template!../tpl/prenesi.tpl',
    'template!../tpl/izracunaj-form.tpl',
    'underscore',
    'jquery',
    'jquery.jsonrpc'
], function (
        i18next,
        Modal,
        Marionette,
        Handlebars,
        Radio,
        FormView,
        PostavkeView,
        DrugiVirView,
        KoprodukcijaView,
        PrenesiView,
        TipProEnoModel,
        enotaTpl,
        prenesiTpl,
        izracunajTpl,
        _,
        $
        ) {

    var EnotaProgramaView = PostavkeView.extend({
        className: 'enota-programa',
        template: enotaTpl,
        buttons: {
            dodaj: {
                id: 'doc-postavka-dodaj',
                label: i18next.t('std.dodaj'),
                element: 'button-trigger',
                trigger: 'dodaj'
            },
            shrani: {
                id: 'doc-postavka-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'docedit-preklici-postavko',
                label: i18next.t('std.preklici'),
                element: 'button-trigger',
                trigger: 'preklici'
            },
            prenesi: {
                id: 'doc-postavka-prenesi',
                label: 'Prenesi',
                element: 'button-trigger',
                trigger: 'prenesi',
                disabled: true
            },
            izracunaj: {
                id: 'doc-postavka-izracunaj',
                label: i18next.t('std.izracunaj'),
                element: 'button-trigger',
                trigger: 'izracunaj'
            },
            nasvet: {
                id: 'doc-postavka-nasvet',
                icon: 'fa fa-info',
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        },
        regions: {
            drugiViriR: '.region-drugiViri',
            koprodukcijeR: '.region-koprodukcije',
            prilogeR: '.region-priloge'
        }
    });

    /**
     * Iz serverja dobimo preko rpc klica podatke od uprizoritve
     * @param {type} options
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.pridobiPodatkeUprizoritve = function (options) {
        var self = this;
        if (!this.form.commit()) {
            var uprizoritev = self.model.get('uprizoritev');
            if (uprizoritev) {
                var zacetek = self.dokument.get('zacetek');
                var konec = self.dokument.get('konec');

                var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/programDela/enotaPrograma'});
                rpc.call('podatkiUprizoritve', {
                    'uprizoritevId': uprizoritev.id,
                    'zacetek': zacetek,
                    'konec': konec
                }, options.success, options.error);
            }
        }
    };
    /**
     * Ko pritisnemo gumb prenesi se pokliče funkcija za pridobivanje podatkov uprizoritve
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.onPrenesi = function () {
        var self = this;

        var success = function (podatki) {
            self.podatkiUprizoritve = podatki;
            self.prenesiModal();
        };

        var error = function (error) {
            Radio.channel('error').request('handler', 'xhr');
        };

        this.pridobiPodatkeUprizoritve({
            success: success,
            error: error
        });
    };

    /**
     * 
     * Obesim se na event prekliči, da spraznim enoto programa in 
     * druge vire, ko se forma zapre. 
     * 
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.initialize = function (options) {
        this.on('preklici', function () {
            this.drugiViriR.empty();
            this.koprodukcijeR.empty();
            this.prilogeR.empty();
        }, this);
    };
    /**
     * Vsi gumbi, ki so navoljo toolbaru za izrisS
     * @returns {Array}
     */
    EnotaProgramaView.prototype.prepareToolbar = function () {
        return  this.model ?
                [
                    [
                        this.buttons.shrani,
                        this.buttons.preklici,
                        this.buttons.prenesi,
                        this.buttons.izracunaj,
                        this.buttons.nasvet
                    ]
                ] : [[this.buttons.dodaj]];
    };

    /**
     * Vežemo na kere evente se posluša
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.bindEvents = function () {
        var self = this;
        var vnosnaPolja = [
            'avtorskiHonorarji',
            'tantieme',
            'avtorskePravice',
            'nasDelez',
            'materialni',
            'drugiJavni',
            'zaproseno',
            'strosekOdkPred',
            'vlozekGostitelja',
            'stroskiOstali',
            'celotnaVrednostGostovSZ'
        ];

        vnosnaPolja.forEach(function (i) {
            self.form.on(i + ':change', self.prikaziPodatke, self);
        });

        this.form.on('ponoviDoma:change', this.togglePrenesi, this);
        this.form.on('ponoviZamejo:change', this.togglePrenesi, this);
        this.form.on('ponoviKopr:change', this.togglePrenesi, this);
        this.form.on('ponoviKoprInt:change', this.togglePrenesi, this);
        this.form.on('ponoviGost:change', this.togglePrenesi, this);
        this.form.on('ponoviInt:change', this.togglePrenesi, this);
        this.form.on('celotnaVrednostGostovSZ:change', this.preveriVrednost, this);

        var uprizoritev = this.form.fields.uprizoritev;
        if (uprizoritev) {
            this.togglePrenesi(this.form, uprizoritev.editor);
            this.form.on('uprizoritev:change', this.togglePrenesi, this);
        }
        var imaKoprodukcije = this.form.fields.imaKoprodukcije;

        if (this.model.get('tipProgramskeEnote')) {
            this.izrisKoprodukcije(this.model.get('imaKoprodukcije'));
            this.form.on('tipProgramskeEnote:change', this.imaKoprodukcijeChange, this);
        } else if (imaKoprodukcije) { //v primeru da imamo imaProdukcije v formi
            this.imaKoprodukcijeChange(null, imaKoprodukcije.editor);
            this.form.on('imaKoprodukcije:change', this.imaKoprodukcijeChange, this);
        }

        this.form.on('avtorskiHonorarjiSamoz:change', this.preveriAvtHonSamoZ, this);
    };

    /**
     * preverimo da ni avthonsamZ večji od avthon
     * @param {type} form
     * @param {type} editor
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.preveriAvtHonSamoZ = function (form, editor) {
        var avtHonSamoZ = editor.getValue();
        var avtHon = form.fields.avtorskiHonorarji.editor.getValue();
        var polja = form.fields;

        if (avtHonSamoZ > avtHon) {
            polja.avtorskiHonorarjiSamoz.setError(i18next.t("std.napaka.avtHonSamoz"));
        } else {
            polja.avtorskiHonorarjiSamoz.clearError();
        }
    };

    /**
     * preveri da ni vrednost v got po slo in zam večje od našega deleža
     * @param {type} form
     * @param {type} editor
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.preveriVrednost = function (form, editor) {
        var vredGostZame = editor.getValue();
        var nasDelez = this.model.get('nasDelez');
        var polja = form.fields;

        if (vredGostZame > nasDelez) {
            polja.celotnaVrednostGostovSZ.setError(i18next.t("std.napaka.gostSZVrednost"));
        } else {
            polja.celotnaVrednostGostovSZ.clearError();
        }
    };

    /**
     * Razvežemo na kere evente se ne posluša več
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.unBindEvents = function () {
        var self = this;
        var vnosnaPolja = [
            'avtorskiHonorarji',
            'tantieme',
            'avtorskePravice',
            'nasDelez',
            'materialni',
            'drugiJavni',
            'zaproseno',
            'strosekOdkPred',
            'vlozekGostitelja',
            'stroskiOstali',
            'celotnaVrednostGostovSZ'
        ];

        vnosnaPolja.forEach(function (i) {
            self.form.off(i + ':change', self.prikaziPodatke, self);
        });

        this.form.off('celotnaVrednostGostovSZ:change', this.preveriVrednost, this);
        this.form.off('ponoviDoma:change', this.togglePrenesi, this);
        this.form.off('ponoviZamejo:change', this.togglePrenesi, this);
        this.form.off('ponoviGost:change', this.togglePrenesi, this);
        this.form.off('ponoviKopr:change', this.togglePrenesi, this);
        this.form.off('ponoviKoprInt:change', this.togglePrenesi, this);
        this.form.off('ponoviInt:change', this.togglePrenesi, this);

        this.form.off('uprizoritev:change', this.togglePrenesi, this);
        this.form.off('tipProgramskeEnote:change', this.imaKoprodukcijeChange, this);
    };

    /**
     * unbindamo evente od forme predno na novo renderamo formo 
     * in se na novo bindajo eventi
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.renderFormEvents = function () {
        this.unBindEvents();
        this.renderForm();
    };


    /**
     * ob izrisu forme se izvede še izris postavk in prikaznih polj
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.onRenderForm = function () {
        if (!this.model.isNew()) {
            this.renderPriloge();
            this.prikaziPodatke();
        } else {
            var f = Handlebars.formatNumber;
            this.$('.nasDelez').html(f(0, 2));
            this.$('.lastnaSredstva').html(f(0, 2));
            this.$('.celotnaVrednost').html(f(0, 2));
            this.$('.celotnaVrednostMat').html(f(0, 2));
            this.$('.drugiViriVsota').html(f(0, 2));
            this.$('.vredPes').html(f(0, 2));
            this.$('.obiskDoma').html(f(0, 0));
        }

        //onemogočimo druge vire če je nov model
        this.renderDrugiViri();
        if (this.model.isNew()) {
            this.drugiViri.disabled = true;
        }

        this.bindEvents();
    };
    /**
     * Izris prilog - privzeto se ne izriše nič. 
     * Overrirde funkcionalnosti v izvedenih objektih
     * 
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.renderPriloge = function () {

    };

    /**
     * Metoda se uporablja, pri uspešnem brisanju in shranjevanju postavk.
     * Po uspešnem brisanju in shranitvi se naj pokliče za nov izris forme
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.ponovenIzris = function () {
        var self = this;
        if (!this.form.commit()) {
            this.model.fetch({
                success: function () {
                    self.renderFormEvents();
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    };

    /**
     * izris postavke drugi viri
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.renderDrugiViri = function () {
        var view = this.drugiViri = new DrugiVirView({
            collection: this.model.drugiViriCollection,
            dokument: this.model
        });

        view.on('save:success', this.ponovenIzris, this);
        view.on('destroy:success', this.ponovenIzris, this);

        this.drugiViriR.show(view);
    };
    /**
     * Izris postavke koproducent
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.renderKoprodukcije = function () {
        var view = this.koprodukcije = new KoprodukcijaView({
            collection: this.model.koprodukcijeCollection,
            dokument: this.model
        });

        view.on('save:success', this.ponovenIzris, this);
        view.on('destroy:success', this.ponovenIzris, this);

        this.koprodukcijeR.show(view);
    };

    /**
     * Ob kliku na prenesi se bo prikazal modal za prepis podatkov
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.prenesiModal = function () {
        var self = this;
        if (!this.form.commit()) {
            var View = this.getPrenesiView();

            var view = new View({
                model: this.model
            });

            var PM = Modal.extend({
                className: 'prenesi-modal modal'
            });

            var modal = new PM({
                content: view,
                animate: true,
                okText: i18next.t("std.prenesi"),
                cancelText: i18next.t("std.preklici"),
                title: i18next.t('prenesi.title')
            });

            modal.open(function () {
                self.prenesiPodatke(this);
            });
        }
    };

    /**
     * Overridamo v enotah programa
     * pridobimo view ki se uporabi pri prenosu podatkov iz uprizoritve v enotoprograma
     * @returns {EnotaProgramaView@call;extend.prototype.getIzracunajView.View}
     */
    EnotaProgramaView.prototype.getPrenesiView = function () {
        var View = PrenesiView.extend({
            template: prenesiTpl,
            podatkiUprizoritve: this.podatkiUprizoritve,
            jeNa: false
        });

        return View;
    };

    /**
     * Metoda se izvede ko kliknemo ok v modalu
     * Trenutno pričakujemo logiko kere vrednosti se prenesejo v formo
     * @returns {PostavkeView@call;extend.prototype.getPrenesiView.View}
     */
    EnotaProgramaView.prototype.prenesiPodatke = function (modal) {
        var uprizoritev = this.podatkiUprizoritve;
        var view = modal.options.content;
        var model = this.model;

        this.prenesiVrednosti(view, model, uprizoritev);

        this.renderFormEvents();
        this.prikaziPodatke();
        Marionette.triggerMethodOn(this.form, 'change');
    };
    /**
     * razlika pri preračunavanju je ali se delež preračuna ali ne
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.izracunajPrikaznaPolja = function () {
        this.model.preracunajInfo(true);
    };

    /**
     * prikažemo in preračunamo vse prikazne vrednosti
     * v nekaterih programskih enotah bo potrebno overridat(festival, gostujoča, razno)
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.prikaziPodatke = function () {
        if (!this.form.commit()) {
            var model = this.model;
            this.onZaprosenoChange();
            this.izracunajPrikaznaPolja();
            var f = Handlebars.formatNumber;
            this.$('.nasDelez').html(f(model.get('nasDelez'), 2));
            this.$('.lastnaSredstva').html(f(model.get('lastnaSredstva'), 2));
            this.$('.celotnaVrednost').html(f(model.get('celotnaVrednost'), 2));
            this.$('.celotnaVrednostMat').html(f(model.get('celotnaVrednostMat'), 2));
            this.$('.drugiViriVsota').html(f(model.get('drugiViriVsota'), 2));
            this.$('.vredPes').html(f(model.get('pesVsota'), 2));
            this.$('.obiskDoma').html(f(model.get('obiskDoma'), 0));
        }
    };

    /**
     * Overridamo jih v posameznih enotah programa, če je to potrebno
     * Metoda je namenjena logiki prepisovanja vrednosti v modelu z vrednostmi, ki smo jih označili v modalu
     * @param {type} view
     * @param {type} model
     * @param {type} uprizoritev
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.prenesiVrednosti = function (view, model, uprizoritev) {
        if (view.$('.nasDelez').is(':checked')) {
            model.set('nasDelez', uprizoritev.NaDo.nasDelez);
        }
        if (view.$('.avtorskiHonorarji').is(':checked')) {
            model.set('avtorskiHonorarji', uprizoritev.NaDo.avtorskiHonorarji);
        }
        if (view.$('.tantieme').is(':checked')) {
            model.set('tantieme', uprizoritev.NaDo.tantieme);
        }
        if (view.$('.materialni').is(':checked')) {
            model.set('materialni', uprizoritev.NaDo.materialni);
        }
        if (view.$('.avtorskePravice').is(':checked')) {
            model.set('avtorskePravice', uprizoritev.NaDo.avtorskePravice);
        }
        if (view.$('.stHonorarnihZun').is(':checked')) {
            model.set('stHonorarnihZun', uprizoritev.NaDo.stHonorarnihZun);
        }
        if (view.$('.stHonorarnihZunIgr').is(':checked')) {
            model.set('stHonorarnihZunIgr', uprizoritev.NaDo.stHonorarnihZunIgr);
        }
        if (view.$('.stHonorarnihZunIgrTujJZ').is(':checked')) {
            model.set('stHonorarnihZunIgrTujJZ', uprizoritev.NaDo.stHonorarnihZunIgrTujJZ);
        }
        if (view.$('.stHonorarnihZunSamoz').is(':checked')) {
            model.set('stHonorarnihZunSamoz', uprizoritev.NaDo.stHonorarnihZunSamoz);
        }
        if (view.$('.stZaposDrug').is(':checked')) {
            model.set('stZaposDrug', uprizoritev.stZaposDrug);
        }
        if (view.$('.stZaposUmet').is(':checked')) {
            model.set('stZaposUmet', uprizoritev.stZaposUmet);
        }
        if (view.$('.datumZacStudija').is(':checked')) {
            model.set('datumZacStudija', uprizoritev.datumZacStudija);
        }
        if (view.$('.datumPremiere').is(':checked')) {
            model.set('datumPremiere', uprizoritev.datumPremiere);
        }
    };

    /**
     * overridamo v enotah programa
     * metoda vrne view, ki se uporabi v izračunaj/zaprošeno modal
     * @returns {PostavkeView@call;extend.prototype.getIzracunajView.IzracunajView}
     */
    EnotaProgramaView.prototype.getIzracunajView = function () {

        var IzracunajView = Marionette.ItemView.extend({
            template: izracunajTpl,
            initialize: function () {
                this.model.preracunajZaproseno();
            },
            serializeData: function () {
                return _.extend(this.model.toJSON(), {
                    help: this.help
                });
            }
        });

        return IzracunajView;
    };

    /**
     * ob kliku izracunaj/zaprošeno
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.onIzracunaj = function () {
        var self = this;

        if (!this.form.commit()) {

            var IzracunajView = this.getIzracunajView();

            var view = new IzracunajView({
                tagName: 'table',
                className: 'table table-striped table-condensed',
                model: this.model
            });

            var IM = Modal.extend({
                className: 'zaproseno-modal modal'
            });

            var modal = new IM({
                content: view,
                animate: true,
                okText: i18next.t("std.prepisi"),
                cancelText: i18next.t("std.preklici"),
                title: i18next.t('izracunaj.title')
            });

            modal.open(function () {
                self.prepisi(this);
            });
        }
    };
    /**
     * Prepisemo zaproseno vrednost
     * @param {type} modal
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.prepisi = function (modal) {
        var vsota = modal.options.content.model.get('vsota');
        var form = this.form;

        this.model.set('zaproseno', vsota);
        form.fields.zaproseno.setValue(vsota);
        form.trigger('change');
    };

    /**
     * Metoda omogoče ali onemogoči gumb
     * Kot parametre prejme ime gumba in ali naj gumb omogoči ali onemogoči
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.toggleGumb = function (gumb, jeOnemogocen) {
        var tb = this.getToolbarModel();
        var but = tb.getButton(gumb);
        if (but) {
            but.set({
                disabled: jeOnemogocen
            });
        }
    };
    /**
     * Število ponovitev, pomembno pri entitetak kjer računamo na predstavo
     * potrebno je overridat
     * @param {type} form
     * @returns {Number}
     */
    EnotaProgramaView.prototype.steviloPonovitev = function (form) {
        return 1;
    };

    /**
     * Obesimo se na uprizoritev change event, ki ga proži forma
     * omogočimo ali onemogočimo gumb prenesi
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.togglePrenesi = function (form, editor) {

        var uprizoritev = form.fields.uprizoritev;
        uprizoritev = uprizoritev ? uprizoritev.getValue() : null;

        var stPonovi = this.steviloPonovitev(form);

        if (stPonovi > 0) {
            if (!uprizoritev) {
                this.toggleGumb('doc-postavka-prenesi', true);
            }
            else {
                this.toggleGumb('doc-postavka-prenesi', false);
            }
        }
        else {
            this.toggleGumb('doc-postavka-prenesi', true);
        }
    };

    /**
     * poskrbimo da se ob spremembi vrednosti pojavi napaka, če je ta potrebna
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.onZaprosenoChange = function () {
        var model = this.model;
        var form = this.form;

        if (!form.commit()) {
            model.preracunajZaproseno();
            var polja = form.fields;

            var f = Handlebars.formatNumber;

            var vsota = model.get('vsota');
            var zaproseno = polja.zaproseno.getValue();
            var razlika = vsota - zaproseno;

            if (razlika < -0.01) {
                polja.zaproseno.setError(i18next.t("std.napaka.zaproseno1") + " " + f(vsota, 2));

            } else {
                polja.zaproseno.clearError();
            }
        }
    };
    /**
     * Če smo izbrali koprodukcijo potem se izriše drugače ne
     * @param {type} imaKop
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.izrisKoprodukcije = function (imaKop) {
        if (imaKop) {
            this.renderKoprodukcije();
            this.disablePostavke();
        } else {
            this.koprodukcijeR.empty();
        }
    };

    /**
     * funkcija poskrbi da se koprodukcije izrišejo samo če so koprodukcije označene
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.imaKoprodukcijeChange = function (form, editor) {
        var model = new TipProEnoModel({id: editor.getValue('tipProgramskeEnote')});
        var self = this;

        //v kolikor je izbrana koprodukcija se bo izrisala postavka
        var izrisKoprodukcije = function () {
            if (model.get('koprodukcija') && self.model.get('id')) {
                self.izrisKoprodukcije(true);
            } else {
                self.izrisKoprodukcije(false);
            }
        };

        model.fetch({
            success: izrisKoprodukcije,
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    /**
     * disable/enable gumbe v drugihvirih, koprodukcijah in zapisih
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.disablePostavke = function () {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-postavka-shrani');
        if (but) {
            if (!but.get('disabled') && this.model.get('id')) {
                this.drugiViri.disabled = true;
                if (this.koprodukcije) {
                    this.koprodukcije.disabled = true;
                }
            }
        }
    };

    /**
     * dodatno onemogočimo gumbe na drugih virih in koprodukcijah
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.formChange = function () {
        FormView.prototype.formChange.apply(this, arguments);

        this.disablePostavke();
    };

    /**
     * na on save success fetchamo in prikažemo nove podatke
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.onSaveSuccess = function (model) {
        var self = this;
        if (!this.form.commit()) {
            model.fetch({
                success: function () {
                    self.renderFormEvents();
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    };

    return EnotaProgramaView;
});