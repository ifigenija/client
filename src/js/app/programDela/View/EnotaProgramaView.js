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
    'backbone-modal'
], function (
        PostavkeView,
        DrugiVirView,
        KoprodukcijaView,
        IzracunajView,
        i18next,
        enotaTpl,
        Modal
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
     * Ob kliku na izpolni se bo prikazal modal za prepis podatkov
     * @returns {undefined}
     */
//    EnotaProgramaView.prototype.onIzpolni = function () {
//        var View = Marionette.ItemView.extend({
//            template: this.izpolniTpl
//        });
//
//        var view = new View({
//            model: this.model
//        });
//
//        var modal = new Modal({
//            content: view,
//            animate: true,
//            okText: i18next.t("std.izberi"),
//            cancelText: i18next.t("std.preklici")
//        });
//
//        modal.open();
//    };

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
            self.form.fields.zaprosenProcent.editor.setValue(view.model.get('vsota'));
        };
    };

    return EnotaProgramaView;
});