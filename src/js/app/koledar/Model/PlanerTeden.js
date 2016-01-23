/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'backbone',
    'moment',
    './Dogodki',
    'options!dogodek.termini',
    'deep-model'
], function (
        Backbone,
        moment,
        Dogodki,
        termini
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
    /**
     * Funkcija preračuna termine v katere spaca glede na začetek in konec
     * @param {String|Moment} zacetek
     * @param {String|Moment} konec
     * @returns {
     *          {Boolean} dopoldne,
     *          {Boolean} popoldne,
     *          {Boolean} zvecer,
     *          {Boolean} allDay
     *          }
     */
    PlanerTeden.prototype.dolociTermine = function (zacetek, konec) {
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

        // primeru da obstaja konec, preverimo v katerem terminu se konča dogodek
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
        //gleda se med začetkom ki smo ga našli in koncem
        for (var i = terminZacetek; i <= terminKonec; i++) {
            switch(i){
                case 1:
                    dopoldne = true;
                    break;
                case 2:
                    popoldne = true;
                    break;
                case 3:
                    zvecer = true;
                    break;
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
    };
    /**
     * Funkcija vzame dogodek in datum in preračuna v katere termine spada dogodek.
     * Vrne polje terminov v katere spada dogodek na ta datum.
     * @param {type} datum
     * @returns {
     *          {Boolean} dopoldne,
     *          {Boolean} popoldne,
     *          {Boolean} zvecer,
     *          {Boolean} allDay
     *          }
     */
    PlanerTeden.prototype.dolociTermineNaDatum = function (dogodek, datum) {
        //nespremenjen začetek in konec
        var zacetekO = dogodek.get('zacetek');
        var konecO = dogodek.get('konec');

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
            return this.dolociTermine(zacetekO, konecO);
        } else if (zacetekD.diff(dan, 'days') === 0) {
            //preračunaj termine na dan začetka
            return this.dolociTermine(zacetekO, null);
        } else if (konecD.diff(dan, 'days') === 0) {
            //preračunaj termine na dan konca
            return this.dolociTermine(null, konecO);
        }

        return null;
    };

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
        var termini = this.dolociTermineNaDatum(dogodekModel, planerTedenModel.get('datum'));
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


