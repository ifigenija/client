/* 
 * Enota programa razširi funkcionalnost postavke view,
 * s funkcijami za izris postavk enote programa,
 * da jih ne bomo pisali pri pri vsaki enoti.
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'app/programDela/View/DrugiVirView',
    'app/programDela/View/KoprodukcijaView',
    'app/programDela/View/IzracunajView',
    'i18next',
    'template!../tpl/enota-programa.tpl',
    'app/programDela/Model/TipProgramskeEnote',
    'backbone-modal',
    'jquery',
    'jquery.jsonrpc'
], function (
        PostavkeView,
        DrugiVirView,
        KoprodukcijaView,
        IzracunajView,
        i18next,
        enotaTpl,
        TipProEnoModel,
        Modal,
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

    /**
     * Metodo je potrebno overridat v ostalih programih dela
     * V metodi implementiramo view, ki se bo uporabil v modalu za prenos vrednosti
     * @returns {PostavkeView@call;extend.prototype.getPrenesiView.View}
     */
    EnotaProgramaView.prototype.getPrenesiView = function () {
    };

    /**
     * Metodo je potrebno overridat v ostalih programih dela
     * Metoda se izvede ko kliknemo ok v modalu
     * Trenutno pričakujemo logiko kere vrednosti se prenesejo v formo
     * @returns {PostavkeView@call;extend.prototype.getPrenesiView.View}
     */
    EnotaProgramaView.prototype.obPrenesu = function (modal) {
    };
    /**
     * Ob kliku na prenesi se bo prikazal modal za prepis podatkov
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.prenesiPodatke = function () {
        var self = this;
        var View = this.getPrenesiView();

        if (!this.form.commit()) {
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
                self.obPrenesu(this);
            });
        }
    };

    EnotaProgramaView.prototype.prepisi = function (modal) {
        this.model.set('zaproseno', modal.options.content.model.get('vsota'));
        this.renderForm();
        this.triggerMethod('form:change', this.form);
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
        var podatek = this.form.fields.uprizoritev.editor.getValue('uprizoritev');
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

        this.form.off('uprizoritev:change', toggleEnabled, this);
        this.form.on('uprizoritev:change', toggleEnabled, this);
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

        this.form.off('zaproseno:change', funkcija, this);
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
                } else {
                    self.koprodukcijeR.empty();
                }
            };

            model.fetch({success: izrisKoprodukcije});
        };

        if (this.model.get('tipProgramskeEnote')) {
            toggleKoprodukcija(null, this.form.fields.tipProgramskeEnote.editor);
        }

        this.form.off('tipProgramskeEnote:change', toggleKoprodukcija, this);
        this.form.on('tipProgramskeEnote:change', toggleKoprodukcija, this);
    };

    /**
     * ob kliku izracunaj 
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
                self.form.off(i + ':change', self.prikaziPodatke, self);
            });

            vnosnaPolja.forEach(function (i) {
                self.form.on(i + ':change', self.prikaziPodatke, self);
            });

            this.uprizoritevChange();
            this.zaprosenoChange();
            this.tipProEnoChange();
        }
    };

    return EnotaProgramaView;
});