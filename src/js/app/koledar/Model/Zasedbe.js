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
        model: Backbone.Model,
        initialize: function (models, options) {
            this.datum = null;

            if (options && options.datum) {
                this.datum = options.datum;
            }
        },
        /**
         * Ko se model/modeli dodajo v collecijo se izvede ta funkcija
         * @param {Object|Array} models
         * @param {Object} options
         * @param {Object} options.datum    v primeru da datum podamo želimo videti samo aktivne alternacije 
         *                                  v nasprotnem primeru se bodo vse alternacije tretirale kot aktivne
         * @returns {undefined}
         */
        add: function (models, options) {
            var self = this;

            if (!_.isArray(models)) {
                models = [models];
            }

            for (var k in models) {
                var planirane = new PlanFun();
                var uprID = models[k].id;

                planirane.queryParams.uprizoritev = uprID;
                if (this.datum) {
                    planirane.queryParams.datum = this.datum.toISOString();
                }
                models[k].set('planiraneFunkcije', planirane);
                planirane.fetch({
                    success: function (funkcije) {
                        self.getPlaniraneAlternacije(uprID, funkcije);
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            }
            Backbone.Collection.prototype.add.apply(self, arguments);

        },
        getPlaniraneAlternacije: function (uprizoritevID, funkcije) {
            var planiraneAlter = new PlanAlter();
            planiraneAlter.queryParams.uprizoritev = uprizoritevID;
            if (this.datum) {
                planiraneAlter.queryParams.datum = this.datum.toISOString();
            }
            planiraneAlter.fetch({
                success: function (alternacije) {
                    var alters = alternacije.groupBy(function (alternacija) {
                        return alternacija.get('funkcija').id;
                    });
                    funkcije.each(function (funkcija) {
                        var alterFun = alters[funkcija.get('id')];
                        if (alterFun) {
                            funkcija.set('alternacija', new Backbone.Collection(alterFun));
                        }
                    });
                    funkcije.trigger('posodobljeno');
                    this.trigger('added');
                }
            });
        },
        vrniIzbraneOsebe: function () {
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
        }
    });
    return Zasedbe;
});


