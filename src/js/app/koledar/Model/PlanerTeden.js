/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'backbone',
    'underscore',
    'moment',
    './Dogodki',
    'deep-model'
], function (
        baseUrl,
        Backbone,
        _,
        moment,
        Dogodki
        ) {

    var Collection = Backbone.Collection.extend({
        model: Dogodki.prototype.model
    });

    var PlanerModel = Backbone.Model.extend({
        defaults: {
            datum: null,
            dopoldne: null,
            popoldne: null,
            zvecer: null
        }
    });

    var PlanerTeden = Backbone.Collection.extend({
        model: PlanerModel,
        initTeden: function (datum) {
            var d = moment(datum);

            var start = moment(d).startOf('week');
            var end = moment(d).endOf('week');

            while (end.isAfter(start)) {
                this.add(new PlanerModel({
                    datum: moment(start),
                    dopoldne: new Collection(),
                    popoldne: new Collection(),
                    zvecer: new Collection()
                }));
                start.add(1, 'days');
            }
        }
    });

    return PlanerTeden;

});


