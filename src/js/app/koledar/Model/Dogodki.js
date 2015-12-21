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
         * 
         * @param {String|Moment} uraT
         * @param {Boolean} zacetek
         * @returns {
         *          {Boolean} dopoldne,
         *          {Boolean} popoldne,
         *          {Boolean} zvecer,
         *          {Boolean} allDay
         *          }
         */
        terminiZacetekKonec: function (uraT, zacetek) {
            var ura = moment(uraT);
            var uraDopoldan = moment(ura).set('hour', 14);
            var uraPopoldan = moment(ura).set('hour', 19);
            var uraZvecer = moment(ura).set('hour', 23);

            var dopoldne = false;
            var popoldne = false;
            var zvecer = false;
            var allDay = false;

            if (ura.diff(uraDopoldan) < 0) {
                if (zacetek) {
                    allDay = true;
                    dopoldne = true;
                    popoldne = true;
                    zvecer = true;
                } else {
                    dopoldne = true;
                }
            } else if (ura.diff(uraDopoldan) >= 0 && ura.diff(uraPopoldan) < 0) {
                if (zacetek) {
                    popoldne = true;
                    zvecer = true;
                } else {
                    dopoldne = true;
                    popoldne = true;
                }
            } else if (ura.diff(uraPopoldan) >= 0 && ura.diff(uraZvecer) < 0) {
                if (zacetek) {
                    zvecer = true;
                } else {
                    dopoldne = true;
                    popoldne = true;
                    zvecer = true;
                    allDay = true;
                }
            }

            return {
                dopoldne: dopoldne,
                popoldne: popoldne,
                zvecer: zvecer,
                allDay: allDay
            };
        },
        /**
         * 
         * @param {type} datum
         * @returns {
         *          {Boolean} dopoldne,
         *          {Boolean} popoldne,
         *          {Boolean} zvecer,
         *          {Boolean} allDay
         *          }
         */
        naDanNaTermin: function (datum) {
            //naspremenjen začetek in konec
            var zacetekO = this.get('zacetek');
            var konecO = this.get('konec');

            //začetek dneva na dan začetka in dan konca
            var zacetekD = moment(zacetekO).startOf('day');
            var konecD = moment(konecO).startOf('day');

            /* V primeru da dan med začetkom in koncem ni dan začetka ali konca,
             * se upošteva da je dogodek čez cel dan.
             */
            //ali je dogodek na podan datum
            var dan = moment(datum).startOf('day');
            if (zacetekD.diff(dan, 'days') < 0 && konecD.diff(dan, 'days') > 0) {
                return {
                    dopoldne: true,
                    popoldne: true,
                    zvecer: true,
                    allDay: true
                };
            } else if (zacetekD.diff(dan, 'days') === 0) {
                //preračunaj termine na dan začetka
                return this.terminiZacetekKonec(zacetekO, true);
            } else if (konecD.diff(dan, 'days') === 0) {
                //preračunaj termine na dan konca
                return this.terminiZacetekKonec(konecO, false);
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
            var dogodki = self.models;
            for (var id in dogodki) {
                var dogodek = dogodki[id];

                var termini = dogodek.naDanNaTermin(planerM.get('datum'));
                if (termini) {
                    if (termini.dopoldne) {
                        planerM.get('dopoldne').add(dogodek);
                    }
                    if (termini.popoldne) {
                        planerM.get('popoldne').add(dogodek);
                    }
                    if (termini.zvecer) {
                        planerM.get('zvecer').add(dogodek);
                    }
                }
            }
        });
    };
    return Dogodki;
});