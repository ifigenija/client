/* 
 * Izračunaj view je namenjen preračunavanju maxsimalne zaprošene vrednosti.
 * Zaprošena vrednost je največji znesek, ki ga lahko zaprosimo od MK
 * Licenca GPLv3
 */
define([
    'marionette',
    'underscore',
    'backbone-modal',
    'i18next'
], function (
        Marionette,
        _,
        Mod,
        i18next
        ) {

    var PrenesiView = Marionette.ItemView.extend({
        serializeData: function () {
            return _.extend(this.model.attributes, {rpc: this.podatki});
        }
    });


    var Modal = Mod.extend({
        animate: true,
        okText: i18next.t("std.izberi"),
        cancelText: i18next.t("std.preklici")
    });

    /**
     * Po defaultu ne naredimo nič.
     * Potrebno je metodo overridat.
     * @returns {undefined}
     */
    Modal.prototype.prenesi = function () {
    };

    return{
        Modal: Modal,
        View: PrenesiView
    };
});