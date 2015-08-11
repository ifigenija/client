/* 
 * Enota programa razširi funkcionalnost postavke view,
 * s funkcijami za izris postavk enote programa,
 * da jih ne bomo pisali pri pri vsaki enoti.
 * Licenca GPLv3
 */
define([
    'radio',
    'app/Dokument/View/FormView',
    'app/Dokument/View/PostavkeView',
    'app/programDela/View/DrugiVirView',
    'app/programDela/View/KoprodukcijaView',
    'app/programDela/View/IzracunajView',
    'i18next',
    'template!../tpl/enota-programa.tpl',
    'app/programDela/Model/TipProgramskeEnote',
    'backbone-modal',
    'template!../tpl/prenesi-form.tpl',
    'marionette',
    'underscore',
    'jquery',
    'jquery.jsonrpc'
], function (
        Radio,
        FormView,
        PostavkeView,
        DrugiVirView,
        KoprodukcijaView,
        IzracunajView,
        i18next,
        enotaTpl,
        TipProEnoModel,
        Modal,
        prenesiTpl,
        Marionette,
        _,
        $
        ) {

    var EnotaProgramaView = PostavkeView.extend({
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

    EnotaProgramaView.prototype.pridobiPodatke = function () {
        var self = this;

        var success = function (podatki) {
            self.podatkiUprizoritve = podatki;
            self.prenesiPodatke();
        };

        var error = function (error) {
            //error
        };

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
                }, success, error);
            }
        }
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

        this.on('prenesi', this.pridobiPodatke, this);
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
                        this.buttons.izracunaj,
                        this.buttons.prenesi,
                        this.buttons.nasvet
                    ]
                ] : [[this.buttons.dodaj]];

    };

    /**
     * ob izrisu forme se izvede še izris postavk
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.onRenderForm = function () {
        if (!this.model.isNew()) {
            this.renderPriloge();
            this.renderPES();
            this.renderDrugiViri();
        }
    };

    /**
     * Izris programskeEnoteSklopa - privzeto se ne izriše nič. 
     * Overrirde funkcionalnosti v izvedenih objektih
     * 
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.renderPES = function () {

    };
    /**
     * Izris prilog - privzeto se ne izriše nič. 
     * Overrirde funkcionalnosti v izvedenih objektih
     * 
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.renderPriloge = function () {

    };

    EnotaProgramaView.prototype.ponovenIzris = function (view) {
        var izris = function () {
            var self = this;
            if (!this.form.commit()) {
                this.model.fetch({
                    success: function () {
                        self.renderForm();
                    }
                });
            }
        };

        view.on('save:success', izris, this);
        view.on('destroy:success', izris, this);
    };

    /**
     * izris postavke drugi viri
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.renderDrugiViri = function () {
        var view = new DrugiVirView({
            collection: this.model.drugiViriCollection,
            dokument: this.model
        });

        this.ponovenIzris(view);

        this.drugiViriR.show(view);
    };
    /**
     * Izris postavke koproducent
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.renderKoprodukcije = function () {
        var view = new KoprodukcijaView({
            collection: this.model.koprodukcijeCollection,
            dokument: this.model
        });

        this.ponovenIzris(view);

        this.koprodukcijeR.show(view);
    };

    EnotaProgramaView.prototype.oznaciCheckboxe = function () {
        //pri vrednostih, ki se razlikujejo, označi checkbox
    };

    /**
     * pridobimo view ki se uporabi pri prenosu podatkov iz uprizoritve v enotoprograma
     * @returns {EnotaProgramaView@call;extend.prototype.getIzracunajView.View}
     */
    EnotaProgramaView.prototype.getPrenesiView = function () {
        var self = this;
        var View = Marionette.ItemView.extend({
            tagName: 'div',
            className: 'prenesi-table',
            template: prenesiTpl,
            serializeData: function () {

                self.podatkiUprizoritve.NaDo = self.podatkiUprizoritve.Do;

                return _.extend(this.model.toJSON(), {
                    uprizoritevData: self.podatkiUprizoritve
                });
            },
            triggers: {
                'click .izberi-check': 'izberi:vse'
            },
            onIzberiVse: function () {
                this.$('input').click();
            },
            initialize: self.oznaciCheckboxe
        });

        return View;
    };

    /**
     * Metoda se izvede ko kliknemo ok v modalu
     * Trenutno pričakujemo logiko kere vrednosti se prenesejo v formo
     * @returns {PostavkeView@call;extend.prototype.getPrenesiView.View}
     */
    EnotaProgramaView.prototype.obPrenosu = function (modal) {
        var uprizoritev = this.podatkiUprizoritve;
        var view = modal.options.content;
        var model = this.model;

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
        if (view.$('.stHonorarnih').is(':checked')) {
            model.set('stHonorarnih', uprizoritev.stHonorarnih);
        }
        if (view.$('.stHonorarnihIgr').is(':checked')) {
            model.set('stHonorarnihIgr', uprizoritev.stHonorarnihIgr);
        }
        if (view.$('.stHonorarnihIgrTujJZ').is(':checked')) {
            model.set('stHonorarnihIgrTujJZ', uprizoritev.stHonorarnihIgrTujJZ);
        }
        if (view.$('.stHonorarnihIgrSamoz').is(':checked')) {
            model.set('stHonorarnihIgrSamoz', uprizoritev.stHonorarnihIgrSamoz);
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

        this.renderForm();
        this.triggerMethod('form:change', this.form);
    };
    /**
     * Ob kliku na prenesi se bo prikazal modal za prepis podatkov
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.prenesiPodatke = function () {
        var self = this;
        if (!this.form.commit()) {
            var View = this.getPrenesiView();
            
            var view = new View({
                model: this.model
            });

            var modal = new Modal({
                content: view,
                animate: true,
                okText: i18next.t("std.prenesi"),
                cancelText: i18next.t("std.preklici"),
                title: i18next.t('prenesi.title')
            });

            modal.open(function () {
                self.obPrenosu(this);
            });
        }
    };

    EnotaProgramaView.prototype.prepisi = function (modal) {
        this.model.set('zaproseno', modal.options.content.model.get('vsota'));
        this.renderForm();
        this.triggerMethod('form:change', this.form);
        this.triggerMethod('zaproseno:change', this.form);
    };
    /**
     * ob kliku izracunaj 
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.onIzracunaj = function () {
        var self = this;

        if (!this.form.commit()) {

            var view = new IzracunajView({
                tagName: 'table',
                className: 'table table-striped table-condensed',
                model: this.model
            });

            var modal = new Modal({
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
     * Obesimo se na uprizoritev change event, ki ga proži forma
     * omogočimo ali onemogočimo gumb prenesi
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.uprizoritevChange = function () {
        var uprizoritev = this.form.fields.uprizoritev;
        if (uprizoritev) {
            var podatek = uprizoritev.editor.getValue('uprizoritev');
            if (podatek) {
                this.toggleGumb('doc-postavka-prenesi', false);
            }

            var toggleEnabled = function (form, editor) {
                var podatek = editor.getValue('uprizoritev');
                if (!podatek) {
                    this.toggleGumb('doc-postavka-prenesi', true);
                }
                else {
                    this.toggleGumb('doc-postavka-prenesi', false);
                }
            };

            this.form.on('uprizoritev:change', toggleEnabled, this);
        }
    };

    /**
     * poskrbimo da se ob spremembi vrednosti pojavi napaka, če je ta potrebna
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.zaprosenoChange = function () {

        var funkcija = function () {
            if (!this.form.commit()) {
                this.model.preracunajZaproseno();
                var polja = this.form.fields;

                if (this.model.get('vsota') < polja.zaproseno.getValue()) {
                    polja.zaproseno.setError('Zaprošeno ne sme biti več kot ' + this.model.get('vsota'));
                } else {
                    polja.zaproseno.clearError();
                }
            }
        };

        this.form.on('zaproseno:change', funkcija, this);
    };

    /**
     * funkcija poskrbi da se koprodukcije izrišejo samo če so koprodukcije označene
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.tipProEnoChange = function () {
        var self = this;
        var toggleKoprodukcija = function (form, editor) {
            var model = new TipProEnoModel({id: editor.getValue('tipProgramskeEnote')});

            var izrisKoprodukcije = function () {
                if (model.get('koprodukcija')) {
                    self.renderKoprodukcije();
                    self.disableGumbe();
                } else {
                    self.koprodukcijeR.empty();
                }
            };

            model.fetch({success: izrisKoprodukcije});
        };

        if (this.model.get('tipProgramskeEnote')) {
            toggleKoprodukcija(null, this.form.fields.tipProgramskeEnote.editor);
        }

        this.form.on('tipProgramskeEnote:change', toggleKoprodukcija, this);
    };

    /**
     * metoda je overridana
     * klic metode se izvede v metodi renderform v formview 
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.dodatniFormEventi = function () {
        if (this.model) {

            var self = this;
            var vnosnaPolja = [
                'avtorskiHonorarji',
                'tantieme',
                'avtorskePravice',
                'nasDelez',
                'materialni',
                'drugiJavni',
                'zaproseno'
            ];

            vnosnaPolja.forEach(function (i) {
                self.form.on(i + ':change', self.prikaziPodatke, self);
            });

            this.uprizoritevChange();
            this.zaprosenoChange();
            this.tipProEnoChange();
        }
    };

    /**
     * disable/enable gumbe v drugihvirih, koprodukcijah in zapisih
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.disableGumbe = function () {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-postavka-shrani');
        if (but) {
            if (but.get('disabled')) {
                this.$('.region-postavke').find('*').attr('disabled', false);
            } else {
                this.$('.region-postavke').find('*').attr('disabled', true);
            }
        }
    };

    /**
     * Overridamo formChange
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.formChange = function () {
        FormView.prototype.formChange.apply(this, arguments);

        this.disableGumbe();
    };

    /**
     * Overridamo formChange
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.onSaveSuccess = function (model) {
        var self = this;
        if (!this.form.commit()) {
            model.fetch({
                success: function () {
                    self.renderForm();
                }
            });
        }
    };


    return EnotaProgramaView;
});