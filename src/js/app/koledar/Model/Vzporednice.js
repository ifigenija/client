/* 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'i18next',
    'backbone',
    'underscore'
], function (
        baseUrl,
        i18next,
        Backbone,
        _
        ) {

    var Oseba = Backbone.Model.extend({});
    var Osebe = Backbone.Collection.extend({
        model: Oseba
    });

    var Funkcija = Backbone.Model.extend({
        defaults: {
            'label': i18next.t('Funkcija'),
            'nezasedeneOsebe': new Osebe(),
            'zasedeneOsebe': new Osebe()
        }
    });
    var Funkcije = Backbone.Collection.extend({
        model: Funkcija
    });

    var Uprizoritev = Backbone.Model.extend({
        defaults: {
            'label': i18next.t('uprizoritev'),
            'konfliktneFunkcije': new Funkcije()
        }
    });
    var Uprizoritve = Backbone.Collection.extend({
        model: Uprizoritev
    });

    Uprizoritve.prototype.initialize = function (attrs, options) {
        var uprizoritve = options.data;

        for (var uprKey in uprizoritve) {
            var uprizoritev = uprizoritve[uprKey];
            var funkcije = uprizoritev['konfliktneFunkcije'];
            for (var funkKey in funkcije) {
                var funkcija = funkcije[funkKey];

                var osebe = funkcija['zasedeneOsebe'];
                funkcija['zasedeneOsebe'] = new Osebe(osebe);

                osebe = funkcija['nezasedeneOsebe'];
                funkcija['zasedeneOsebe'] = new Osebe(osebe);
            }
            uprizoritev['konfliktneFunkcije'] = new Funkcije(funkcije);
        }
        this.collection = new Uprizoritve(uprizoritve);
    };
    return Uprizoritve;
});



