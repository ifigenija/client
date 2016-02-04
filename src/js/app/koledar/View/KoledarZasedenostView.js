/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'underscore',
    './KoledarView',
    './FilterZasedenostView'
], function (
        Radio,
        _,
        KoledarView,
        FilterZasedenostView
        ) {

    var KoledarZasedenost = KoledarView.extend({
        FilterView: FilterZasedenostView
    });

    /**
     * Definicija Fullcalendarja
     * @returns {undefined}
     */
    KoledarZasedenost.prototype.initialize = function () {
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
            selectHelper: true,
            editable: true,
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
     * Funkcija se kliče, ko v fullcalendarju izberemo dan/interval dnevov
     * Funkcija proži dodaj:zasedenost
     * 
     * Parametri definirani na http://fullcalendar.io/docs/selection/select_callback/
     * @param {type} start
     * @param {type} end
     * @param {type} jsEvent
     * @param {type} view
     * @returns {undefined}
     */
    KoledarZasedenost.prototype.select = function (start, end, jsEvent, view) {
        this.options.view.trigger('dodaj:zasedenost', start, end);
    };

    /**
     * Funkcija se kliče ko v full calendarju končamo s premaknjem ali razširjanjem intervala eventa
     * Funkcija je zadolžena da shrane spremembo eventov na server. Ob napaki se event povrne v prvotno stanje.
     * 
     * Parametri definirani na http://fullcalendar.io/docs/event_ui/eventDrop/ in http://fullcalendar.io/docs/event_ui/eventResize/
     * @param {type} fcEvent
     * @param {type} delta
     * @param {type} revert
     * @param {type} jsEvent
     * @param {type} ui
     * @param {type} view
     * @returns {undefined}
     */
    KoledarZasedenost.prototype.eventDropOrResize = function (fcEvent, delta, revert, jsEvent, ui, view) {
        //poišči kliknjen event c kolekciji
        var model = fcEvent.source.coll.get(fcEvent.id);
        model.save({planiranZacetek: fcEvent.start.toISOString(), planiranKonec: fcEvent.end.toISOString()}, {
            error: function (model, xhr) {
                revert();
                Radio.channel('error').command('xhr', model, xhr);
            }
        });
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
    KoledarZasedenost.prototype.eventClick = function (fcEvent, jsEvent, view) {
        var model = fcEvent.source.coll.get(fcEvent.id);
        this.trigger('uredi:zasedenost', model);
    };

    return KoledarZasedenost;
});

