/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'backbone',
    'app/Max/Model/MaxPageableCollection',
    'underscore',
    'moment',
    'deep-model'
], function (
        baseUrl,
        Backbone,
        Pageable,
        _,
        moment
        ) {

    var Dogodek = Backbone.DeepModel.extend({
        view: 'default',
        urlRoot: function () {
            return baseUrl + '/rest/dogodek/' + this.view;
        },
        getEventObject: function (eObj) {
            if (!eObj) {
                eObj = _.clone(this.attributes);
            } else {
                for (var k in  this.attributes) {
                    eObj[k] = this.get(k);
                }
            }
            eObj.start = moment(this.get('zacetek'));
            eObj.end = moment(this.get('konec'));
            return eObj;
        },
        initialize: function (attr) {
            this.view = attr.view || this.view;
        },
        /**
         * Funkcija 
         * 
         * @param {String|Moment} datum
         * @returns {Boolean}
         */
        naDanNaTermin: function (datum) {
            var zacetek = moment(this.get('zacetek')).startOf('day');
            var konec = moment(this.get('konec')).startOf('day');

            var dan = moment(datum).startOf('day');
            if (zacetek.diff(dan) <= 0 && konec.diff(dan) >= 0) {

                var ura = moment(this.get('zacetek'));
                var uraDopoldan = moment(ura).set('hour', 14);
                var uraPopoldan = moment(ura).set('hour', 19);
                var uraZvecer = moment(ura).set('hour', 23);

                var dopoldne = false;
                var popoldne = false;
                var zvecer = false;

                if (ura.diff(uraDopoldan) < 0) {
                    dopoldne = true;
                }
                if (ura.diff(uraDopoldan) >= 0 && ura.diff(uraPopoldan) < 0) {
                    popoldne = true;
                }
                if (ura.diff(uraPopoldan) >= 0 && ura.diff(uraZvecer) < 0) {
                    zvecer = true;
                }

                return {
                    dopoldan: dopoldne,
                    popoldan: popoldne,
                    zvecer: zvecer
                };
            }

            return null;
        }
    });


    var Dogodki = Pageable.extend({
        start: null, // hrani datum, od kdaj smo nalagali dogodke
        end: null, // hrani čas do kdaj smo nalagali dogodke
        model: Dogodek,
        mode: 'server',
        state: {
            pageSize: 1000,
            currentPage: 1
        },
        view: 'default',
        url: function () {
            return baseUrl + '/rest/dogodek/' + this.view;
        }
    });


    Dogodki.prototype.pretvoriVPlanerTeden = function (planerTeden) {
        var self = this;

        planerTeden.each(function (planerM) {
            for (var id in self.models) {
                var model = self.models[id];

                var termini = model.naDanNaTermin(planerM.get('datum'));
                if (termini) {
                    if (termini.dopoldan) {
                        planerM.get('dopoldne').add(model);
                    }
                    if (termini.popoldan) {
                        planerM.get('popoldne').add(model);
                    }
                    if (termini.zvecer) {
                        planerM.get('zvecer').add(model);
                    }
                }
            }
        });
    };
    return Dogodki;
});