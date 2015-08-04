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
    'backbone-modal',
    'marionette',
    'jquery',
    'jquery.jsonrpc'
], function (
        PostavkeView,
        DrugiVirView,
        KoprodukcijaView,
        IzracunajView,
        i18next,
        enotaTpl,
        Modal,
        Marionette,
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
        },
        triggers: {
            'click .izracunaj': 'izracunaj'
        }
    });

    EnotaProgramaView.prototype.toISO8601 = function (podatek) {
        var pozicija = podatek.length - 2;
        return [podatek.slice(0, pozicija), ":", podatek.slice(pozicija)].join('');
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

        var self = this;
        this.listenTo(this, 'prenesi', function () {

            //zaradi tega ker pridobimo drugačen format kot pa ISO8601
            var temp = self.dokument.get('zacetek');
            var zacetek = this.toISO8601(temp);

            var temp = self.dokument.get('konec');
            var konec = this.toISO8601(temp);

            var foo = new $.JsonRpcClient({ajaxUrl: '/rpc/programDela/enotaPrograma'});
            foo.call('podatkiUprizoritve', {
                'uprizoritevId': self.model.get('uprizoritev')['id'],
                'zacetek': zacetek,
                'konec': konec
            }, function (podatki) {
                //success
                self.podatkiRPC = podatki;
                self.prenesiPodatke();
            }, function (error) {
                //error

            });
        });
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
                        this.buttons.nasvet
                    ]
                ] : [[this.buttons.dodaj]];

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
     * ob izrisu forme se izvede še izris postavk
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.onRenderForm = function () {
        var podatek = this.form.fields.uprizoritev.editor.getValue();
        if (podatek) {
            this.toggleGumb('doc-postavka-prenesi', false);
        }

        this.listenTo(this.form, 'uprizoritev:change', function () {
            var podatek = this.form.fields.uprizoritev.editor.getValue();
            if (!podatek) {
                this.toggleGumb('doc-postavka-prenesi', true);
            }
            else {
                this.toggleGumb('doc-postavka-prenesi', false);
            }
        });

        if (!this.model.isNew()) {
            this.renderPriloge();
            this.renderPES();
            this.renderDrugiViri();
            this.renderKoprodukcije();
        }
    };

    /**
     * Izris programskeenotesklopa - privzeto se ne izriše nič. 
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

    /**
     * izris postavke drugi viri
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.renderDrugiViri = function () {
        var view = new DrugiVirView({
            collection: this.model.drugiViriCollection,
            dokument: this.model
        });

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

        this.koprodukcijeR.show(view);
    };

    /**
     * Metodo je potrebno overridat v ostalih programih dela
     * @returns {PostavkeView@call;extend.prototype.getPrenesiView.View}
     */
    EnotaProgramaView.prototype.getPrenesiView = function () {
    };

    /**
     * Metodo je potrebno overridat v ostalih programih dela
     * @returns {PostavkeView@call;extend.prototype.getPrenesiView.View}
     */
    EnotaProgramaView.prototype.prenesi = function (modal) {
    };
    /**
     * Ob kliku na prenesi se bo prikazal modal za prepis podatkov
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.prenesiPodatke = function () {
        var self = this;
        var View = this.getPrenesiView();

        var error = this.form.commit();

        if (!error) {
            var view = new View({
                model: this.model
            });

            var modal = new Modal({
                content: view,
                animate: true,
                okText: i18next.t("std.izberi"),
                cancelText: i18next.t("std.preklici"),
                title: i18next.t('prenesi.title')
            });

            modal.open(function () {
                self.prenesi(this);
            });
        }
    };

    /**
     * Vsaka enota programa mora overridat to metodo z istim viewjem ampak drugimi faktorji
     * @returns {PostavkeView@call;extend.prototype.getIzracunajView.View}
     */
    EnotaProgramaView.prototype.getIzracunajView = function () {
        var View = IzracunajView.extend();
        return View;
    };
    /**
     * ob kliku izracunaj 
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.onIzracunaj = function () {
        var self = this;
        //po potrebi daj itemView v lastno mapo in extendaj samo faktorje
        var View = this.getIzracunajView();

        var view = new View({
            model: this.model
        });

        var modal = new Modal({
            content: view,
            animate: true,
            okText: i18next.t("std.prepisi"),
            cancelText: i18next.t("std.preklici")
        });

        modal.open(function () {
            prepisi();
        });

        var prepisi = function () {
            self.form.fields.zaproseno.editor.setValue(view.model.get('vsota'));
        };
    };

    return EnotaProgramaView;
});