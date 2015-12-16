/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define(['baseUrl', 'backbone', 'app/Max/Model/MaxPageableCollection', 'underscore', 'moment', 'deep-model'], function (baseUrl, Backbone, Pageable, _, moment) {

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

    Dogodki.prototype.pretvori = function () {

        this.comparator = 'zacetek';
        this.sort();
        var collection = new PlanerCollection();

        for (var id in this.models) {
            var model = this.models[id];
            var planerModel = new PlanerCollection.prototype.model();

            var zacetek = moment(model.get('zacetek'));
            var konec = moment(model.get('konec'));
            
            planerModel.datum = moment(zacetek, "DD.MM.YYYY");

            var dopoldan = moment('14:00', 'HH:mm');
            var popoldan = moment('19:00', 'HH:mm');
            var zvecer = moment('23:00', 'HH:mm');

            if (dopoldan.diff(zacetek, 'minutes') > 0) {
                planerModel.dopoldanColl.add(model);
            } else if (popoldan.diff(zacetek, 'minutes') > 0) {
                planerModel.popoldanColl.add(model);
            } else if (zvecer.diff(zacetek, 'minutes') > 0) {
                planerModel.zvecerColl.add(model);
            }
            
            if (dopoldan.diff(konec, 'minutes') > 0) {
                planerModel.dopoldanColl.add(model);
            } else if (popoldan.diff(konec, 'minutes') > 0) {
                planerModel.popoldanColl.add(model);
            } else if (zvecer.diff(konec, 'minutes') > 0) {
                planerModel.zvecerColl.add(model);
            }
        }
    };

    return Dogodki;

});


