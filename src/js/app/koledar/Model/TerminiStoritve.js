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
    './Alternacije',
    './Osebe',
    'deep-model'
], function (
        baseUrl,
        Backbone,
        _,
        Collection,
        Alternacije,
        Osebe
        ) {

    var Model = Backbone.DeepModel.extend({
        urlRoot: baseUrl + '/rest/terminStoritve'
    });

    Model.prototype.getEventObject = function () {
        var object;
        object = _.clone(this.attributes);
        object.start = moment(this.get('zacetek'));
        object.end = moment(this.get('konec'));
        return object;
    };

    var Collection = Collection.extend({
        url: baseUrl + '/rest/terminStoritve',
        model: Model,
        mode: "server"
    });

    Collection.prototype.razdeliPoPodrocjih = function () {
        var models = this.models;

        var object = {};

        this.each(function (model) {
            var podrocje = model.get('alternacija.funkcija.tipFunkcije.podrocje');
            if (podrocje) {
                if (!object[podrocje]) {
                    object[podrocje] = [];
                }

                object[podrocje].push(model);
            } else {
                object['gosti'] = [];
                object['gosti'].push(model);
            }
        });

        return object;
    };

    Collection.prototype.toOsebe = function () {
        var osebeColl = this.osebe = new Osebe();

        var models = this.models;
        for (var id in models) {
            var model = models[id];
            var alter = model.get('alternacija');
            if (!alter) {
                var oseba = model.get('oseba');

                if (_.isObject(oseba)) {
                    osebeColl.add(oseba);
                } else {
                    osebeColl.add({id: oseba});
                }
            }
        }

        return osebeColl;
    };
    Collection.prototype.toAlternacije = function () {
        var alterColl = this.alternacije = new Alternacije();

        var models = this.models;
        for (var id in models) {
            var model = models[id];
            var alter = model.get('alternacija');
            if (alter) {
                if (_.isObject(alter)) {
                    alterColl.add(alter);
                } else {
                    alterColl.add({id: alter});
                }
            }
        }

        return alterColl;
    };

    /**
     * Funkcija vrne collection oseb za odstranit iz terminov storitev in collection oseb za dodat v terminstoritev
     * @param {Collection} osebe    Vhodni podatek je collection izbranih oseb
     * @returns {undefined}
     */
    Collection.prototype.dodajOdstrani = function (osebe) {
        //ali je oseba v terminih storitve
        for (var id in this.models) {
            var model = this.models[id];
            var vsebovana = false;
            for (var ids in osebe) {
                var oseba = osebe[ids];
                if (model.get('oseba') === oseba.get('id')) {
                    vsebovana = true;
                }
            }
            if (!vsebovana) {
                model.destroy({
                    error: ''
                });
            }
        }

        //ali je oseba v terminih storitve
        for (var ids in osebe) {
            var oseba = osebe[ids];
            vsebovana = false;
            for (var id in this.models) {
                var model = this.models[id];
                if (oseba.get('id') === model.get('oseba')) {
                    vsebovana = true;
                }
            }
            if (!vsebovana) {
                model.save({
                    error: ''
                });
            }
        }
    };

    Collection.prototype.getEventObjects = function () {
        var objects = [];
        this.each(function (model) {
            objects.push(model.getEventObject());
        });
        return objects;
    };

    return Collection;
});


