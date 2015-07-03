/* 
 * Enota programa razširi funkcionalnost postavke view,
 * s funkcijami za izris postavk enote programa,
 * da jih ne bomo pisali pri pri vsaki enoti.
 * Licenca GPLv3
 */
define([
    'app/programDela/View/IfiPostavkaView',
    'app/programDela/View/DrugiVirView',
    'app/programDela/View/KoprodukcijaView',
    'underscore'
], function (
        IfiPostavkaView,
        DrugiVirView,
        KoprodukcijaView,
        _
        ) {

    var EnotaProgramaView = IfiPostavkaView.extend({
        buttons: {
            dodaj: {
                id: 'doc-postavka-dodaj',
                label: 'Dodaj',
                element: 'button-trigger',
                trigger: 'dodaj'
            },
            shrani: {
                id: 'doc-postavka-shrani',
                label: 'Shrani',
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'docedit-skrij-postavko',
                label: 'Skrij',
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
                //model ni pravi rabimo model uprizoritve s vsemi podatki fuknkcije->alternacije->pogodbe
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