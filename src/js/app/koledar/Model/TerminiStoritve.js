/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'i18next',
    'baseUrl',
    'backbone',
    'moment',
    'underscore',
    'app/Max/Model/MaxPageableCollection',
    './Alternacije',
    './Osebe',
    'deep-model'
], function (
        i18next,
        baseUrl,
        Backbone,
        moment,
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
        object.start = moment(this.get('planiranZacetek'));
        object.end = moment(this.get('planiranKonec'));
        object.resourceId = this.get('oseba.id');

        var title;
        if (this.get('alternacija')) {
            title = this.get('alternacija.funkcija.naziv');
        }
        else if (this.get('dezurni')) {
            title = i18next.t('terminStoritve.dezurni');
        }
        else if (this.get('gost')) {
            title = i18next.t('terminStoritve.gost');
        }
        else if (this.get('sodelujoc')) {
            title = i18next.t('terminStoritve.sodelujoc');

        }
        object.title = title;
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
            alter['oseba'] = model.get('oseba');
            alter['funkcija'].label = model.get('alternacija.funkcija.naziv');
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
        var terminiStoritve = [];
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
                    alterTermin = new self.model(ts.attributes);
                } else if (ts.get('oseba').id === osebaID) {
                    osebaTermin = new self.model(ts.attributes);
                }
            });

            //v kolikor smo našli enako alternacijo se prepiše generiran ts s TS, ki že obstaja
            if (alterTermin) {
                terminiStoritve.push(alterTermin);
            } else if (osebaTermin) {
                terminiStoritve.push(osebaTermin);
            } else {
                terminiStoritve.push(terminS);
            }
        });

        this.reset(terminiStoritve);

        return this;
    };

    Collection.prototype.getSeznamOseb = function () {
        var osebeColl = this.osebe = new Osebe();

        var models = this.models;
        for (var id in models) {
            var model = models[id];
            var oseba = model.get('oseba');

            if (_.isObject(oseba)) {
                osebeColl.add(oseba);
            } else {
                osebeColl.add({id: oseba});
            }
        }

        return osebeColl;
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


