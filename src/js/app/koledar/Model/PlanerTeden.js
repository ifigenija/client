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

    return PlanerTeden;

});


