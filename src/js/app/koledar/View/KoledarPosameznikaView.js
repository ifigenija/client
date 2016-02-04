/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'underscore',
    './KoledarView',
    './FilterPosameznikView'
], function (
        Radio,
        _,
        KoledarView,
        FilterPosameznikView
        ) {

    var KoledarPosameznikaView = KoledarView.extend({
        FilterView: FilterPosameznikView
    });

    /**
     * Definicija Fullcalendarja
     * @returns {undefined}
     */
    KoledarPosameznikaView.prototype.initialize = function () {
        var self = this;
        this.koledarOptions = {
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            minTime: '6:00:00',
            scrollTime: '10:00:00',
            timezone: true,
            selectable: true,
            defaultView: 'month',
            eventSources: [
                {
                    events: function (zacetek, konec, timezone, callback) {
                        var list = [];
                        var vrednosti = self.vrednostiFiltrov;
                        self.collection.queryParams.zacetek = zacetek.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        self.collection.queryParams.konec = konec.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        self.collection.queryParams.zasedenost = true;
                        self.collection.queryParams = _.extend(self.collection.queryParams, vrednosti);
                        self.collection.fetch({
                            success: function (coll) {
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

    /**
     * Funkcija se kliče ko kliknemo na event v full calendarju.
     * Funkcija je zadolžena da proži uredi:zasedenost.
     * 
     * Parametri so definirani na http://fullcalendar.io/docs/mouse/eventClick/
     * @param {type} fcEvent
     * @param {type} jsEvent
     * @param {type} view
     * @returns {undefined}
     */
    KoledarPosameznikaView.prototype.eventClick = function (fcEvent, jsEvent, view) {
        var model = fcEvent.source.coll.get(fcEvent.id);
        this.trigger('uredi:zasedenost', model);
    };

    return KoledarPosameznikaView;
});

