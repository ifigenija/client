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
        urlRoot: baseUrl + '/rest/oseba'
    });
    var Collection = Collection.extend({
        url: baseUrl + '/rest/oseba',
        model: Model,
        mode: "server"
    });

    /**
     * Kolekcijo oseb pretvorimo v kolekcijo TS
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
            var osebaModel = {
                dogodek: options.dogodek,
                zacetek: options.zacetek,
                konec: options.konec,
                gost: options.gost ? options.gost : false,
                dezurni: options.dezurni ? options.dezurni : false,
                oseba: model
            };
            modeli.push(osebaModel);
        });

        return modeli;
    };

    return Collection;

});


