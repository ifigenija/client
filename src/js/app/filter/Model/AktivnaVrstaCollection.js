define([
    'radio',
    'baseUrl',
    'backbone',
    'underscore',
    './VrstaCollection'
], function (
        Radio,
        baseUrl,
        Backbone,
        _,
        Vrsta
        ) {

    var AktivnaVrstaModel = Backbone.Model.extend({
        defaults: {
            izbrani: new Backbone.Collection(),
            vrstaModel: new Vrsta(),
            vrsta: 'nedoloceno'
        }
    });

    /**
     *
     * @param {Object} attr
     * @param {Array|Collection} [attr.izbrani]     Polje ali collection podatkov, ki so izbrani
     * @param {Collection} [attr.vrstaModel]        Collection Default: VrstaCollection
     * @param {String} [attr.vrsta]                 Aktivne vrsta filtra se upari z id/vrsto iz vresteCollection
     *
     * @type @exp;Backbone@pro;Model@call;extend
     */
    AktivnaVrstaModel.prototype.initialize = function (attr) {
        this.attributes = _.extend(this.attributes, attr);
    };

    var AktivnaVrstaCollection = Backbone.Collection.extend({
        model: AktivnaVrstaModel
    });

    /**
     * Pretvorba Aktivnih vrst v kolekcijo.
     * Pretvorba iz arraya v collection ali iz objecta v collection
     * @param {Object} models
     * @param {Object} options
     * @param {Object} [options.aktivneVrste]           Objekt vseh vrednosti aktivnih Vrst
     * @param {Collection} [options.vrsteFiltrov]       Collection vrstFiltrov, ki so navoljo
     *                      {title, id, icon, stIzpisov, mozni(lookup model collection), label}
     */
    AktivnaVrstaCollection.prototype.initialize = function (models, options) {
        if (options && options.aktivneVrste) {
            var vrste = options.aktivneVrste;
            if (!(vrste instanceof Backbone.Collection)) {
                if (_.isObject(vrste)) {
                    var coll = obj2Coll(vrste, options.vrsteFiltrov);
                    this.add(coll.models);
                } else if (_.isArray(vrste)) {
                    this.add(array2Coll(vrste, AktivnaVrstaCollection).models);
                }
            } else {
                this.add(vrste.models);
            }
        }
    };
    /**
     * Poiščemo model po podanem ključu(vrsta)
     * @param {type} vrsta                  Ključ vrsteModela
     * @param {type} vrsteFiltrov           kolekcija vrstfiltrov
     * @returns {vModel}                    Model vrsteFiltra
     */
    var getVrstaModel = function (vrsta, vrsteFiltrov) {
        //v primeru da ni nedoločena poiščemo definicijo vrste v coll vrsteFiltra
        var vrstaModel;

        if (vrsta !== 'nedoloceno') {
            vrsteFiltrov.each(function (vModel) {
                if (vModel.get('id') === vrsta) {
                    vrstaModel = vModel;
                }
            });
        }
        return vrstaModel;
    };

    /**
     * Pretvorba arrayja objektov aktivnih vrst v kolekcijo aktivnih vrst
     * @param {type} array
     * @param {type} Coll
     * @returns {AktivnaVrstaCollection_L7.array2Coll.Coll}
     */
    var array2Coll = function (array, Coll) {
        var collection = new Coll();
        _.each(array, function (vrednost) {
            collection.add(vrednost);
        }, this);

        return collection;
    };

    /**
     * Poiščemo izbrane kriterije filtra
     * @param {type} array
     * @param {type} vrstaModel
     * @param {type} Coll
     * @returns {AktivnaVrstaCollection_L7.getIzbrani.Coll}
     */
    var getIzbrani = function (array, vrstaModel, Coll) {
        var collection = new Coll();
        //iz arraya ID-jev izbranih filtrov sestavimo collection izbranih modelov
        _.each(array, function (id) {
            vrstaModel.get('mozni').each(function (model) {
                if (model.get('id') === id) {
                    collection.add(model);
                }
            });
        }, this);

        return collection;
    };

    /**
     * @param {type} obj
     * @param {type} vrsteFiltrov
     * @returns {AktivnaVrstaCollection_L7.array2Coll.Coll}
     */
    var obj2Coll = function (obj, vrsteFiltrov) {
        var array = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                //iz kolekcije vrstfiltrov poiščemo model, ki spada k izbranim vrstam filtra iščemo po ključu aktivnih vrstfiltra
                var vrstaModel = getVrstaModel(key, vrsteFiltrov);
                var izbrani = getIzbrani(obj[key], vrstaModel, Backbone.Collection);
                //pretvorba v polje vrst modela in izbrani modeli
                array.push({vrsta: key, vrstaModel: vrstaModel, izbrani: izbrani});
            }
        }
        //pretvorba polja v kolekcijo aktivnih vrst
        return array2Coll(array, AktivnaVrstaCollection);
    };

    AktivnaVrstaCollection.prototype.getVrednostiFiltrov = function () {
        var obj = {};

        this.each(function (vrsta) {
            var tipVrsta = vrsta.get('vrsta');
            obj[tipVrsta] = [];

            vrsta.get('izbrani').each(function (model) {
                obj[tipVrsta].push(model.get('id'));
            });
        });

        return obj;
    };

    return AktivnaVrstaCollection;

});