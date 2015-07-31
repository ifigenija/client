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
        matF: 0.0,
        odkupAPF: 0.0,
        odkupPF: 0.0,
        transStrF: 0.0,//mednarodno gostovanje
        dnevPZF: 0.0,//mednarodno gostovanje
        dnevF: 0.0,//mednarodno gostovanje
        serializeData: function () {
            var self = this;
            return _.extend(this.model.attributes, {
                tantiemeI: self.getTantiemeI(),
                avtorskiHonorarjiI: self.getAvtorskiHonorarjiI(),
                vsota: self.getVsota(),
                tanF: self.tanF,
                avtHonF: self.avtHonF
            });
        }
    });
    
    IzracunajView.prototype.getTantiemeI = function(){
        var tantieme = this.model.get('tantieme');
        
        return tantieme ? tantieme * this.tanF : 0;
    };
    
    IzracunajView.prototype.getAvtorskiHonorarjiI = function(){
        var avtorskiHonorarji = this.model.get('avtorskiHonorarji');
        
        return avtorskiHonorarji ? avtorskiHonorarji * this.avtHonF : 0;
    };
    
    IzracunajView.prototype.getVsota = function(){        
        return this.getTantiemeI() + this.getAvtorskiHonorarjiI();
    };

    return IzracunajView;
});