/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'backbone',
    'app/Max/Model/MaxPageableCollection',
    './TerminStoritev',
    'deep-model'
], function (
        baseUrl,
        Backbone,
        Collection,
        TerminiStoritev
        ) {

    var Model = Backbone.DeepModel.extend({
        urlRoot: baseUrl + '/rest/alternacija'
    });
    var Collection = Collection.extend({
        url: baseUrl + '/rest/alternacija',
        model: Model,
        mode: "server"
    });

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
     * 
     * @param {Array} options
     * @param {dogodekModel} options.dogodek
     * @param {moment} options.zacetek
     * @param {moment} options.konec
     * @param {boolean} options.gost
     * @param {boolean} options.dezurni
     * @returns {Collection@call;extend.prototype.alternacije2TS.object|Array}
     */
    Collection.prototype.alternacije2TS = function (options) {

        var modeli = [];
        this.each(function (model) {
            var alterModel = {
                dogodek: options.dogodek,
                zacetek: options.zacetek,
                konec: options.konec,
                gost: options.gost ? options.gost : false,
                dezurni: options.dezurni ? options.dezurni : false,
                alternacija: model.get('id')
            };
            modeli.push(alterModel);
        });

        return new TerminiStoritev(modeli);
    };

    return Collection;

});


