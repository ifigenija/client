/* 
 * Model dogodkov 
 * 
 * Licenca GPLv3
 */

define(['baseUrl', 'backbone', 'app/Max/Model/MaxPageableCollection', 'deep-model'], function (baseUrl, Backbone, Pageable) {

    var Dogodek = Backbone.DeepModel.extend({
        view: 'default',
        urlRoot: function () {
            return baseUrl + '/rest/dogodek/' + this.view;
        },
        getEventObject: function () {
            var obj = this.pluck('title', 'allDay', 'planiranZacetek', 'razred', 'status');
            obj.start = this.get('zacetek');
            obj.end = this.get('konec');

            return obj;
        }
    });


    var Dogodki = Pageable.extend({
        start: null, // hrani datum, od kdaj smo nalagali dogodke
        end: null, // hrani čas do kdaj smo nalagali dogodke
        model: Dogodek,
        mode: "server",
        state: {
            pageSize: 1000,
            currentPage: 1
        },
        view: 'default',
        url: function () {
            return baseUrl + '/rest/dogodek/' + this.view;
        }


    });

    return Dogodki;

});


