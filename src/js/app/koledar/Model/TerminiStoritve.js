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
                if (!object['ostali']) {
                    object['ostali'] = [];
                }
                object['ostali'].push(model);
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
     * Funkcija je zadolžena da v collectionu, prepiše termine storitve, ki že obstajajo
     * @returns {undefined}
     */
    Collection.prototype.getUrejenTS = function (stariTS) {
        var self = this;
        //iz trenutno izbranih terminov storitev, želimo prepisati tiste, ki že obstajajo
        this.each(function (terminS) {
            var alterID;
            if (terminS.get('alternacija')) {
                alterID = terminS.get('alternacija').id;
            }
            var osebaID = terminS.get('oseba').id;
            var alterTermin = null;
            var osebaTermin = null;
            // v kolekciji TS, ki je shranjena na serverju prepišemo TS, ki ima isto alternacijo in osebo ter samo osebo
            stariTS.each(function (ts) {
                //preverjamo oboje v primeru da ima alternacije pri več kot eni funkciji
                //v nasprotnem primeru preverimo samo osebo
                var alter = ts.get('alternacija');
                if (alter && alter.id === alterID) {
                    alterTermin = new self.model(ts);
                } else if (ts.get('oseba').id === osebaID) {
                    osebaTermin = new self.model(ts);
                }
            });

            //v kolikor smo našli enako alternacijo se prepiše generiran ts s TS, ki že obstaja
            if (alterTermin) {
                terminS = alterTermin;
            } else if (osebaTermin) {
                terminS = osebaTermin;
            }
        });

        return this;
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


