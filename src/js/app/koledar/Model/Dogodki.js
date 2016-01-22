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
    'options!dogodek.termini',
    'deep-model'
], function (
        baseUrl,
        Backbone,
        Pageable,
        _,
        moment,
        termini
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
            //resourceId pomemben pri fullcalendarju s pravim resource-om
            eObj.resourceId = this.get('prostor').id;
            eObj.start = moment(this.get('zacetek'));
            eObj.end = moment(this.get('konec'));
            return eObj;
        },
        initialize: function (attr) {
            this.view = attr.view || this.view;
        },
        /**
         * 
         * @param {String|Moment} zacetek
         * @param {String|Moment} konec
         * @returns {
         *          {Boolean} dopoldne,
         *          {Boolean} popoldne,
         *          {Boolean} zvecer,
         *          {Boolean} allDay
         *          }
         */
        terminiZacetekKonec: function (zacetek, konec) {            
            var zacetekM = moment(zacetek);
            var konecM = moment(konec);
            
            //v primeru da ni začetka se uporabi konec pomembno pri izračunu
            var ura = zacetek ? zacetekM : konecM;
            //mejnike terminov nastavimo na konce termnov
            
            var uraDopoldan = moment(ura).startOf('day').set({'hour': termini.dopoldanKonec.h, 'minute': termini.dopoldanKonec.m});
            var uraPopoldan = moment(ura).startOf('day').set({'hour': termini.popoldanKonec.h, 'minute': termini.popoldanKonec.m});
            var uraZvecer = moment(ura).startOf('day').set({'hour': termini.vecerKonec.h, 'minute': termini.vecerKonec.m});

            var dopoldne = false;
            var popoldne = false;
            var zvecer = false;
            var allDay = false;

            /* 
             * terminZacetek default 0 pomeni da ni začetke
             * terminKonec default 4 pomeni da ni začetke
             * 0 in 4 zato da lahko pozneje uporabimo v zanki
             */
            var terminZacetek = 0;
            var terminKonec = 4;

            // V primeru da obstaja zacetek, preverimo v katerem terminu se začne dogodek
            if (zacetek) {
                if (zacetekM.diff(uraDopoldan) < 0) {
                    terminZacetek = 1;
                } else if (zacetekM.diff(uraDopoldan) >= 0 && zacetekM.diff(uraPopoldan) < 0) {
                    terminZacetek = 2;
                } else if (zacetekM.diff(uraPopoldan) >= 0 && zacetekM.diff(uraZvecer) < 0) {
                    terminZacetek = 3;
                }
            }

            // primeru da obstaja zacetek, preverimo v katerem terminu se konča dogodek
            if (konec) {
                if (konecM.diff(uraDopoldan) <= 0) {
                    terminKonec = 1;
                } else if (konecM.diff(uraDopoldan) > 0 && konecM.diff(uraPopoldan) <= 0) {
                    terminKonec = 2;
                } else if (konecM.diff(uraPopoldan) > 0 && konecM.diff(uraZvecer) <= 0) {
                    terminKonec = 3;
                }
            }

            //določimo termine v katere se bo pozneje razvrstil
            for (var i = terminZacetek; i <= terminKonec; i++) {
                if (i === 1) {
                    dopoldne = true;
                }
                else if (i === 2) {
                    popoldne = true;
                }
                else if (i === 3) {
                    zvecer = true;
                }
            }

            //V primeru da je dogodek v vseh termini je celodnevni dogodek
            if (dopoldne && popoldne && zvecer) {
                allDay = true;
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
            //nespremenjen začetek in konec
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
            } else if (zacetekD.diff(dan, 'days') === 0 && konecD.diff(dan, 'days') === 0) {
                //preračunaj termine na dan začetka in konca
                return this.terminiZacetekKonec(zacetekO, konecO);
            } else if (zacetekD.diff(dan, 'days') === 0) {
                //preračunaj termine na dan začetka
                return this.terminiZacetekKonec(zacetekO, null);
            } else if (konecD.diff(dan, 'days') === 0) {
                //preračunaj termine na dan konca
                return this.terminiZacetekKonec(null, konecO);
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