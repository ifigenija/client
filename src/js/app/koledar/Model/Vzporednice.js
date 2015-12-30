/* 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'i18next',
    'backbone',
    'underscore',
    'jquery',
    'jquery.jsonrpc'
], function (
        baseUrl,
        i18next,
        Backbone,
        _,
        $
        ) {

    var Oseba = Backbone.Model.extend({});
    var Osebe = Backbone.Collection.extend({
        model: Oseba
    });

    Osebe.prototype.initialize = function (models, options) {
        var zasedena = false;
        if (options && options.zasedene) {
            zasedena = true;
        }

        for (var key in models) {
            var model = models[key];
            model['zasedena'] = zasedena;
        }
    };

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

    Uprizoritve.prototype.initialize = function (models) {
        this.pretvoriVCollection(models);
    };

    Uprizoritve.prototype.pretvoriVCollection = function (uprizoritve) {
        for (var uprKey in uprizoritve) {
            var uprizoritev = uprizoritve[uprKey];
            var funkcije = uprizoritev['konfliktneFunkcije'];
            for (var funkKey in funkcije) {
                var funkcija = funkcije[funkKey];

                var zasedeneOsebe = funkcija['zasedeneOsebe'];
                var zo = new Osebe(zasedeneOsebe);

                var nezasedeneOsebe = funkcija['nezasedeneOsebe'];
                var nzo = new Osebe(nezasedeneOsebe, {zasedene: true});

                zo.add(nzo.toJSON());
                funkcija['osebe'] = zo;
            }
            uprizoritev['konfliktneFunkcije'] = new Funkcije(funkcije);
        }
    };

    /**
     * RPC klic za vzporednice
     * 
     * @param {Object} options
     *        {Array} options.uprizoritev: Polje idjev uprizoritev, od katerih želimo vzporednice
     *                                      [uprid, uprid, uprid]
     *        {Array} options.alternacije: [{funkcijaid:[osebaid, osebaid]},
     *                                      {funkcijaid:[osebaid, osebaid]}]
     *        {Function} options.success: funkcija, ki se kliče ob uspešnej RPC klicu
     *        {Function} options.error: funkcija, ki se kliče ob neuspešnem RPC klicu
     * @returns {undefined}
     */
    Uprizoritve.prototype.dajVzporednice = function (options) {
        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/vzporednice'});
        rpc.call('dajVzporednice', {
            'uprizoritveIds': options.uprizoritve,
            'alternacije': options.alternacije
        }, options.success, options.error);
    };

    Uprizoritve.prototype.dajPrekrivanja = function (options) {
        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/vzporednice'});
        rpc.call('dajPrekrivanja', {
            'uprizoritveIds': options.uprizoritve,
            'alternacije': options.alternacije
        }, options.success, options.error);
    };
    return Uprizoritve;
});



