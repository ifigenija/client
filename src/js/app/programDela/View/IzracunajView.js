/* 
 * Izračunaj view je namenjen preračunavanju maxsimalne zaprošene vrednosti.
 * Zaprošena vrednost je največji znesek, ki ga lahko zaprosimo od MK
 * Licenca GPLv3
 */
define([
    'template!../tpl/izracunaj-form.tpl',
    'marionette',
    'underscore'
], function (
        izracunajTpl,
        Marionette,
        _
        ) {

    var IzracunajView = Marionette.ItemView.extend({
        template: izracunajTpl,
        tanF: 0.0,
        avtHonF: 0.0,
        serializeData: function () {
            var tantiemeI = this.model.get('tantieme') * this.tanF;
            var avtorskiHonorarjiI = this.model.get('avtorskiHonorarji') * this.avtHonF;
            var vsota = tantiemeI + avtorskiHonorarjiI;

            return _.extend(this.model.attributes, {
                tantiemeI: tantiemeI,
                avtorskiHonorarjiI: avtorskiHonorarjiI,
                vsota: vsota
            });
        }
    });

    return IzracunajView;
});