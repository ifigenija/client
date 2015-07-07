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
    'i18next',
    'template!../tpl/enota-programa.tpl'
], function (
        PostavkeView,
        DrugiVirView,
        KoprodukcijaView,
        i18next,
        enotaTpl
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
            izpolni: {
                id: 'doc-postavka-izpolni',
                label: 'Izpolni',
                element: 'button-trigger',
                trigger: 'izpolni'
            },
            nasvet: {
                id: 'doc-postavka-nasvet',
                label: '<i class="fa fa-info"></i>',
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        },
        regions: {
            drugiViriR: '.region-drugiViri',
            koprodukcijeR: '.region-koprodukcije'
        }
    });

    /**
     * 
     * Obesim se na event prekliči, da spraznim enoto programa in 
     * druge vire, ko se forma zapre. 
     * 
     * @returns {undefined}
     */
    EnotaProgramaView.prototype.initialize = function () {
        this.on('preklici', function () {
            this.drugiViriR.empty();
            this.koprodukcijeR.empty();
        }, this);

    };
    /**
     * prikaz gumbov v toolbaru
     * @returns {Array}
     */
    EnotaProgramaView.prototype.prepareToolbar = function () {
        return  this.model ?
                [
                    [
                        this.buttons.shrani,
                        this.buttons.preklici,
                        this.buttons.izpolni,
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
            this.renderDrugiViri();
            this.renderKoprodukcije();
        }
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
    EnotaProgramaView.prototype.onIzpolni = function () {
        var self = this;
        require(['backbone-modal', 'marionette', 'template!app/programDela/tpl/premiera-izpolni.tpl', 'i18next'], function (Modal, Marionette, izpolniTpl, i18next) {
            var View = Marionette.ItemView.extend({
                template: izpolniTpl,
                serializeData: function () {
                    return {
                        novaCelVred: "some value"
                    };
                }
            });

            var view = new View({
                model: self.model
            });

            var modal = new Modal({
                content: view,
                animate: true,
                okText: i18next.t("std.izberi"),
                cancelText: i18next.t("std.preklici")
            });

            modal.open();
        });
    };

    return EnotaProgramaView;
});