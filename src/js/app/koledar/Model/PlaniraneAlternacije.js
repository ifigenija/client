/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'backbone',
    'app/Max/Model/MaxPageableCollection',
    'deep-model'
], function (
        baseUrl,
        Backbone,
        Collection
        ) {

    var Model = Backbone.DeepModel.extend({
        urlRoot: baseUrl + '/rest/alternacija/planirane'
    });
    var Collection = Collection.extend({
        url: baseUrl + '/rest/alternacija/planirane',
        model: Model,
        mode: "server"
    });

    /**
     * Metoda razdeli alternacije v posamezna področja v katera spadajo alternacije.
     * @returns {Array|Collection@call;extend.prototype.razdeliVPodrocja.object}
     */
    Collection.prototype.razdeli = function () {
        var models = this.models;

        var object = {};

        for (var id in models) {
            var model = models[id];
            var podrocje = model.get('funkcija.tipFunkcije.podrocje');
            if (!object[podrocje]) {
                object[podrocje] = [];
            }

            object[podrocje].push(model);
        }

        return object;
    };

    /**
     * Funkcija pretvori kolekcijo alternacij v seznam objektov TS
     * @param {Array} options
     * @param {dogodekModel} options.dogodek
     * @param {moment} options.zacetek
     * @param {moment} options.konec
     * @param {boolean} options.gost
     * @param {boolean} options.dezurni
     * @returns {Collection@call;extend.prototype.alternacije2TS.object|Array}
     */
    Collection.prototype.toTS = function (options) {

        var modeli = [];
        this.each(function (model) {
            if (!model.get('tsId')) {
                var tsModel = {
                    dogodek: options.dogodek.get('id'),
                    planiranZacetek: options.zacetek,
                    planiranKonec: options.konec,
                    gost: false,
                    dezurni: false,
                    sodelujoc: false,
                    alternacija: model,
                    oseba: model.get('oseba')
                };
            } else {
                var coll = options.coll;
                var tsModel = coll.findWhere({'id': model.get('tsId')});
            }
            modeli.push(tsModel);
        });

        return modeli;
    };

    return Collection;

});