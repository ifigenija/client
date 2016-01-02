/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'baseUrl',
    'i18next',
    'backbone',
    'underscore',
    'app/produkcija/Model/PlanFun',
    'jquery',
    'jquery.jsonrpc'
], function (
        Radio,
        baseUrl,
        i18next,
        Backbone,
        _,
        PlanFun,
        $
        ) {

    var Alternacija = Backbone.Model.extend({});
    var Alternacije = Backbone.Collection.extend({
        model: Alternacija
    });
    var Funkcija = Backbone.Model.extend({});
    var Funkcije = Backbone.Collection.extend({
        model: Funkcija
    });

    var Zasedbe = Backbone.Collection.extend({
        model: Funkcija,
        add: function (models, options) {
            var self = this;

            if (!_.isArray(models)) {
                models = [models];
            }

            for (var k in models) {
                var planirane = new PlanFun();
                planirane.queryParams.uprizoritev = models[k].id;
                models[k].set('funkcije', planirane);
                planirane.fetch({
                    success: function (funkcije) {
                        funkcije.each(function (funkcija) {
                            funkcija.set('alternacije', new Backbone.Collection(funkcija.get('alternacije')));
                        });
                        self.trigger('dodano');
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            }
            Backbone.Collection.prototype.add.apply(self, arguments);

        },
        vrniIzbraneOsebe: function () {
            var funkOsebe = [];
            this.each(function (uprizoritev) {
                var funkcije = uprizoritev.get('funkcije');
                funkcije.each(function (funkcija) {
                    var alternacije = funkcija.get('alternacije');
                    var alterPolje = [];
                    if (alternacije instanceof Backbone.Collection) {
                        alternacije.each(function (alternacija) {
                            if (alternacija.get('izbran')) {
                                alterPolje.push(alternacija.get('id'));
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


