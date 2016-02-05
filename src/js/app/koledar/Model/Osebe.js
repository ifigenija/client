/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'backbone',
    'underscore',
    'app/Max/Model/MaxPageableCollection',
    'deep-model'
], function (
        baseUrl,
        Backbone,
        _,
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
            if (!model.get('tsId')) {
                var tsModel = {
                    dogodek: options.dogodek.attributes,
                    planiranZacetek: options.zacetek,
                    planiranKonec: options.konec,
                    gost: options.gost ? options.gost : false,
                    dezurni: options.dezurni ? options.dezurni : false,
                    sodelujoc: options.sodelujoc ? options.sodelujoc : false,
                    alternacija: null,
                    oseba: model.attributes
                };
            } else {
                var coll = options.coll;
                var tsModel = coll.findWhere({'id': model.get('tsId')}).attributes;
            }
            modeli.push(tsModel);
        });

        return modeli;
    };

    Collection.prototype.getResources = function () {
        var polje = [];
        if (this.models.length) {
            for (var key in this.models) {
                polje.push(_.clone(this.models[key].attributes));
            }
        }
        return polje;
    };

    return Collection;

});