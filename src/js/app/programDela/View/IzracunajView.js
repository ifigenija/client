/* 
 * Izračunaj view je namenjen preračunavanju maxsimalne zaprošene vrednosti.
 * Zaprošena vrednost je največji znesek, ki ga lahko zaprosimo od MK
 * Licenca GPLv3
 */
define([
    'template!../tpl/izracunaj-form.tpl',
    'marionette'
], function (
        izracunajTpl,
        Marionette
        ) {

    var IzracunajView = Marionette.ItemView.extend({
        template: izracunajTpl,
        initialize: function () {
            this.model.preracunajZaproseno();
        }
    });
  
    return IzracunajView;
});