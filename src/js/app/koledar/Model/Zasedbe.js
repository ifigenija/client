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
    
    var Zasedbe = Backbone.Collection.extend({
        model: Backbone.Model,
        add: function (models, options) {
            var self = this;

            if (!_.isArray(models)) {
                models = [models];
            }

            for (var k in models) {
                var planirane = new PlanFun();
                planirane.queryParams.uprizoritev = models[k].id;
                models[k].set('planiraneFunkcije', planirane);
                planirane.fetch({
                    success: function (funkcije) {
                        funkcije.each(function (funkcija) {
                            var alternacije = new Backbone.Collection(funkcija.get('alternacije'));
                            for (k in alternacije.models) {
                                var alternacija = alternacije.models[k];
                                var privzeti = alternacija.get('privzeti');
                                if (privzeti) {
                                    alternacija.set('izbran', true);
                                }
                            }
                            funkcija.set('alternacije', alternacije);
                        });
                        funkcije.trigger('posodobljeno');
                        self.trigger('added');
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            }
            Backbone.Collection.prototype.add.apply(self, arguments);

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


