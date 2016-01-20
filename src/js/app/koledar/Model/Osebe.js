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
     * Kolekcijo oseb pretvorimo v polje objektov TS
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
            var tsModel = {
                dogodek: options.dogodek.get('id'),
                planiranZacetek: options.zacetek,
                planiranKonec: options.konec,
                gost: options.gost ? options.gost : false,
                dezurni: options.dezurni ? options.dezurni : false,
                sodelujoc: options.sodelujoc ? options.sodelujoc : false,
                alternacija: null,
                oseba: model.attributes
            };
            modeli.push(tsModel);
        });

        return modeli;
    };

    return Collection;

});