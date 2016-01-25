/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define([
    'baseUrl',
    'backbone',
    'app/Max/Model/MaxPageableCollection',
    'underscore',
    'moment',
    'deep-model'
], function (
        baseUrl,
        Backbone,
        Pageable,
        _,
        moment
        ) {

    var Dogodek = Backbone.DeepModel.extend({
        view: 'default',
        urlRoot: function () {
            return baseUrl + '/rest/dogodek/' + this.view;
        },
        getEventObject: function (eObj) {
            if (!eObj) {
                eObj = _.clone(this.attributes);
            } else {
                for (var k in  this.attributes) {
                    eObj[k] = this.get(k);
                }
            }
            //resourceId pomemben pri fullcalendarju s pravim resource-om
            eObj.resourceId = this.get('prostor').id;
            eObj.start = moment(this.get('zacetek'));
            eObj.end = moment(this.get('konec'));
            return eObj;
        },
        initialize: function (attr) {
            this.view = attr.view || this.view;
        }
    });

    var Dogodki = Pageable.extend({
        start: null, // hrani datum, od kdaj smo nalagali dogodke
        end: null, // hrani čas do kdaj smo nalagali dogodke
        model: Dogodek,
        mode: 'server',
        state: {
            pageSize: 1000,
            currentPage: 1
        },
        view: 'default',
        url: function () {
            return baseUrl + '/rest/dogodek/' + this.view;
        }
    });

    Dogodki.prototype.getEventObjects = function () {
        var objects = [];
        var modeli = this.models;

        for (var k in modeli) {
            var model = modeli[k];
            objects.push(model.getEventObject());
        }

        return objects;
    };

    return Dogodki;
});