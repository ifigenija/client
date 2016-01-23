/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'backbone',
    'moment',
    './Dogodki',
    'deep-model'
], function (
        Backbone,
        moment,
        Dogodki
        ) {

    var PlanerDan = Backbone.Model.extend({
        defaults: {
            datum: null,
            dopoldne: null,
            popoldne: null,
            zvecer: null
        }
    });

    var PlanerTeden = Backbone.Collection.extend({
        model: PlanerDan,
        initTeden: function (datum) {
            var d = moment(datum);

            var start = moment(d).startOf('week');
            var end = moment(d).endOf('week');

            while (end.isAfter(start)) {
                this.add(new PlanerDan({
                    datum: moment(start),
                    dopoldne: new Dogodki(),
                    popoldne: new Dogodki(),
                    zvecer: new Dogodki()
                }));
                start.add(1, 'days');
            }
        }
    });
    
    PlanerTeden.prototype.vnesiDogodke = function (dogodki) {
        var self = this;
        this.each(function (planerM) {
            planerM.get('dopoldne').reset();
            planerM.get('popoldne').reset();
            planerM.get('zvecer').reset();
            dogodki.each(function (dogodek) {
                self.dolociTerminDogodka(dogodek, planerM);
            });
        });
    };
    
    PlanerTeden.prototype.dolociTerminDogodka = function (dogodekModel, planerTedenModel) {
        var termini = dogodekModel.naDanNaTermin(planerTedenModel.get('datum'));
        if (termini) {
            if (termini.dopoldne) {
                planerTedenModel.get('dopoldne').add(dogodekModel);
            }
            if (termini.popoldne) {
                planerTedenModel.get('popoldne').add(dogodekModel);
            }
            if (termini.zvecer) {
                planerTedenModel.get('zvecer').add(dogodekModel);
            }
        }
    };

    return PlanerTeden;

});


