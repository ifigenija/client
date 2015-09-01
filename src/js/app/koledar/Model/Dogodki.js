/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define(['baseUrl', 'backbone'], function (baseUrl, Backbone) {

    var Dogodek = Backbone.DeepModel.extend({
        view: 'default',
        urlRoot: function () {
            return baseUrl + '/rest/dogodek/' + this.view;
        },
        getEventObject: function () {
            var obj = this.pluck('title', 'allDay', 'planiranZacetek', 'razred', 'status');
            obj.start = this.get('start');
            obj.end = this.get('end');

            return obj;
        }
    });


    var Dogodki = Backbone.Collection.extend({
        start: null, // hrani datum, od kdaj smo nalagali dogodke
        end: null, // hrani čas do kdaj smo nalagali dogodke
        model: Dogodek,
        view: 'default',
        url: function () {
            return baseUrl + '/rest/dogodek/' + this.view;
        },
        getEvents: function (start, end, callback) {
            callback([
                {
                    id: 12,
                    title: 'Event1',
                    start: '2015-09-01',
                    end: '2015-09-01'
                },
                {
                    id: 13,
                    title: 'Event2',
                    start: '2015-09-02',
                    end: '2015-09-02'
                }
            ]);
        }
    });


});


