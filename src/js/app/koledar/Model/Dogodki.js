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
        moment,
        PlanerCollection
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

    Dogodki.prototype.pretvoriVPlanerTeden = function (planerTeden) {
        var self= this;
        //preverjamo kateri iz kolekcije dogodki spada v planer model z datumom 
        planerTeden.each(function (planerM) {
            //datum planerModela
            var datum = moment(planerM.get('datum')).startOf('day');

            for (var id in self.models) {
                var model = self.models[id];
                var zacetek = moment(model.get('zacetek'));
                var dan = moment(zacetek).startOf('day');

                //preverjamo ali je dan začetka enak datumu planer modela
                //v primeru da je se razvrsti v eno od kolekcij dopoldne, popoldne, zvecer
                if (datum.isSame(dan)) {
                    //nastavimo čas dopoldanskega, popoldanskega in večernega termina
                    var dopoldan = moment(dan);
                    dopoldan.set('hour', 14);
                    var popoldan = moment(dan);
                    popoldan.set('hour', 19);
                    var zvecer = moment(dan);
                    zvecer.set('hour', 23);


                    //v primeru da je dopoldne pozneje od začetka se vstavi v dopoldne
                    if (zacetek.diff(dopoldan) < 0) {
                        planerM.get('dopoldneColl').add(model);
                    } else if (zacetek.diff(popoldan) < 0) {
                        planerM.get('popoldneColl').add(model);
                    } else if (zacetek.diff(zvecer) < 0) {
                        planerM.get('zvecerColl').add(model);
                    }
                }
            }
            ;
        });
    };



    return Dogodki;

});


