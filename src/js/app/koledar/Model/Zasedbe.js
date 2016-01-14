/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'baseUrl',
    'i18next',
    'moment',
    'backbone',
    'underscore',
    './PlanFun',
    './PlanAlter',
    'jquery',
    'jquery.jsonrpc'
], function (
        Radio,
        baseUrl,
        i18next,
        moment,
        Backbone,
        _,
        PlanFun,
        PlanAlter,
        $
        ) {

    var Zasedbe = Backbone.Collection.extend({
        model: Backbone.Model
    });
    Zasedbe.prototype.initialize = function (models, options) {
        this.datum = null;

        if (options && options.datum) {
            this.datum = options.datum;
        }
    };
    /**
     * Ko se model/modeli dodajo v collecijo se izvede ta funkcija
     * @param {Object|Array} models
     * @param {Object} options
     * @param {Object} options.datum    v primeru da datum podamo želimo videti samo aktivne alternacije 
     *                                  v nasprotnem primeru se bodo vse alternacije tretirale kot aktivne
     * @returns {undefined}
     */
    Zasedbe.prototype.add = function (uprizoritve, options) {
        var self = this;

        if (!_.isArray(uprizoritve)) {
            uprizoritve = [uprizoritve];
        }

        for (var k in uprizoritve) {
            var planirane = new PlanFun();
            var uprID = uprizoritve[k].id;

            planirane.queryParams.uprizoritev = uprID;
            if (this.datum) {
                planirane.queryParams.datum = this.datum.toISOString();
            }
            //kolekcijo planiranif funkcij se nastavi kot atribute uprizoritve.
            //zato da se lahko kolekcija tokoj na gui izriše
            uprizoritve[k].set('planiraneFunkcije', planirane);
            planirane.fetch({
                success: function (funkcije) {
                    //vsem planiranim funkcijam nastavimo prazno kolekcijo alternacij
                    // zato da lahko gui takoj izriše alternacije
                    funkcije.each(function (funkcija) {
                        funkcija.set('alternacije', new Backbone.Collection());
                    });
                    self.getPlaniraneAlternacije(uprID, funkcije);
                    funkcije.trigger('posodobljene:funkcije');
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
        Backbone.Collection.prototype.add.apply(self, arguments);

    };
    /**
     * Funkcija nastavi vsem planiranim funkcijam, alternacije.
     * @param {type} uprizoritevID
     * @param {type} funkcije
     * @returns {undefined}
     */
    Zasedbe.prototype.getPlaniraneAlternacije = function (uprizoritevID, funkcije) {
        var self = this;
        //inicializiramo kolekcijo alternacij
        var planiraneAlter = new PlanAlter();
        planiraneAlter.queryParams.uprizoritev = uprizoritevID;
        if (this.datum) {
            planiraneAlter.queryParams.datum = this.datum.toISOString();
        }
        planiraneAlter.fetch({
            //ob uspešno pridobljenem seznamu alternacij katerih funkcije so planirane nastavimo alternacije
            success: function (alternacije) {
                //vsem privzetim alternacijam dodamo atribut izbrana kar se pozneje uporabi pri prikazu alternacij
                alternacije.each(function (alternacija) {
                    var privzeti = alternacija.get('privzeti');
                    if (privzeti) {
                        alternacija.set('izbran', true);
                    }
                });
                //alternacije grupiramo po id-ju funkcije
                var alters = alternacije.groupBy(function (alternacija) {
                    return alternacija.get('funkcija').id;
                });

                //vse funkcije, ki so pod istim kjučem kot je id funkcije se doda v kolekcijo alternacij te planirane funkcije
                funkcije.each(function (funkcija) {
                    //alterFun je polje alternacij za funkcijo ki ima enak id kot je ključ polja
                    var alterFun = alters[funkcija.get('id')];
                    var funAlter = funkcija.get('alternacije'); 
                    if (alterFun) {
                        funAlter.add(alterFun);
                    }
                    //alternacija proži da so bili podatki alternacij posodobljeni
                    funAlter.trigger('posodobljene:alternacije');
                });
                //kolekcija funkcij proži da so bili podatki vseh alternacij posodobljeni
                funkcije.trigger('posodobljene:alternacije');
                self.trigger('added');
            }
        });
    };
    Zasedbe.prototype.vrniIzbraneOsebe = function () {
        var funkOsebe = [];
        this.each(function (uprizoritev) {
            var funkcije = uprizoritev.get('planiraneFunkcije');
            funkcije.each(function (funkcija) {
                var alternacije = funkcija.get('alternacije');
                var alterPolje = [];
                if (alternacije instanceof Backbone.Collection) {
                    alternacije.each(function (alternacija) {
                        if (alternacija.get('izbran')) {
                            alterPolje.push(alternacija.get('oseba').id);
                        }
                    });
                }
                var funk = {};
                funk[funkcija.get('id')] = alterPolje;
                funkOsebe.push(funk);
            });
        });

        return funkOsebe;
    };
    return Zasedbe;
});


