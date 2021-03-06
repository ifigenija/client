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
    './PlaniraneAlternacije',
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
        view: 'default',
        urlRoot: function () {
            return baseUrl + '/rest/terminStoritve/' + this.view;
        }
    });
    /** 
     * Funkcija nam pretvori model terminStoritve v objekt EventObject, ki ga uporablja fullcalendar
     * @returns {Array|TerminiStoritve_L17.Model.prototype.getEventObject.object|Backbone.DeepModel@call;extend.prototype.getEventObject.object}
     */
    Model.prototype.getEventObject = function () {
        var object;
        object = _.clone(this.attributes);
        object.start = moment(this.get('planiranZacetek'));
        object.end = moment(this.get('planiranKonec'));
        object.color = this.get('dogodek.barva');
        object.resourceId = this.get('oseba.id');

        var title = "";
        if (this.get('alternacija')) {
            title += this.get('dogodek.title');
            title += ' / ' + this.get('uprizoritev.label');
            title += ' / ' + this.get('alternacija.funkcija.naziv');
        }
        else if (this.get('dezurni')) {
            title += this.get('dogodek.title');
            title += ' / ' + this.get('uprizoritev.label');
            title += ' / ' + i18next.t('terminStoritve.dezurni');
        }
        else if (this.get('gost')) {
            title += this.get('dogodek.title');
            title += ' / ' + this.get('uprizoritev.label');
            title += ' / ' + i18next.t('terminStoritve.gost');
        }
        else if (this.get('sodelujoc')) {
            title += this.get('dogodek.title');
            title += ' / ' + i18next.t('terminStoritve.sodelujoc');
        }
        else if (this.get('zasedenost')) {
            title += this.get('oseba.label');
        }
        object.title = title;
        return object;
    };

    var Collection = Collection.extend({
        view: 'default',
        url: function () {
            return baseUrl + '/rest/terminStoritve/' + this.view;
        },
        model: Model,
        mode: "server"
    });
    /*
     * Funkcija razdeli collection terminov storitev po področjih v katere spadajo funkcije na alternacijah
     * @returns {Object}
     */
    Collection.prototype.razdeliPoPodrocjih = function () {
        var models = this.models;

        var object = {};

        //v polja področij shranemo
        this.each(function (model) {
            var podrocje = model.get('alternacija.funkcija.tipFunkcije.podrocje');
            if (podrocje) {
                if (!object[podrocje]) {
                    object[podrocje] = [];
                }
                object[podrocje].push(model);
            } else if (model.get('sodelujoc')) {
                if (!object['sodelujoci']) {
                    object['sodelujoci'] = [];
                }
                object['sodelujoci'].push(model);
            } else if (model.get('dezurni')) {
                if (!object['dezurni']) {
                    object['dezurni'] = [];
                }
                object['dezurni'].push(model);
            } else if (model.get('gost')) {
                if (!object['gosti']) {
                    object['gosti'] = [];
                }
                object['gosti'].push(model);
            }
        });

        return object;
    };

    Collection.prototype.toOsebe = function () {
        var osebeColl = [];

        var models = this.models;
        for (var id in models) {
            var model = models[id];
            var alter = model.get('alternacija');
            if (!alter) {
                var oseba = model.get('oseba');
                oseba['polnoIme'] = oseba.label;
                oseba['tsId'] = model.get('id');
                if (_.isObject(oseba)) {
                    osebeColl.push(oseba);
                } else {
                    osebeColl.push({id: oseba});
                }
            }
        }

        return osebeColl;
    };
    Collection.prototype.toAlternacije = function () {
        var alterColl = [];

        var models = this.models;
        for (var id in models) {
            var model = models[id];
            var alter = model.get('alternacija');
            alter['oseba'] = model.get('oseba');
            alter['tsId'] = model.get('id');
            alter['funkcija'].label = model.get('alternacija.funkcija.naziv');
            if (alter) {
                if (_.isObject(alter)) {
                    alterColl.push(alter);
                } else {
                    alterColl.push({id: alter});
                }
            }
        }

        return alterColl;
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


