/* 
 * Licenca GPLv3
 */

define([
    'underscore',
    './KoledarView',
    './ZasedenostFilterView'
], function (
        _,
        KoledarView,
        ZasedenostFilterView
        ) {

    var PlanerZasedenostView = KoledarView.extend({
        FilterView: ZasedenostFilterView
    });

    PlanerZasedenostView.prototype.initialize = function () {
        var self = this;
        this.koledarOptions = {
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            minTime:'6:00:00',
            scrollTime:'10:00:00',
            timezone: true,
            selectable: true,
            defaultView: 'month',
            selectHelper: true,
            editable: true,
            eventSources: [
                {
                    events: function (zacetek, konec, timezone, callback) {
                        var list = [];
                        var vrednosti = self.vrednostiFiltrov;
                        self.collection.queryParams.zacetek = zacetek.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        self.collection.queryParams.konec = konec.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        self.collection.queryParams = _.extend(self.collection.queryParams, vrednosti);
                        self.collection.fetch({
                            success: function (coll) {
                                coll.remove(coll.where({zasedenost: false}));
                                coll.each(function (eventModel) {
                                    list.push(eventModel.getEventObject());
                                });
                                callback(list);
                            }
                        });
                    },
                    coll: self.collection
                }
            ]
        };
    };

    KoledarView.prototype.select = function (start, end, jsEvent, view) {
        this.options.view.trigger('dodaj:zasedenost', start, end);
    };

    KoledarView.prototype.eventDropOrResize = function (fcEvent, delta, revert, jsEvent, ui, view) {
        console.log('dropOrResize');
    };

    KoledarView.prototype.eventClick = function (fcEvent, jsEvent, view) {
        console.log('eventClick');
    };

    return PlanerZasedenostView;
});

