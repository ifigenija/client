/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'marionette',
    'template!../tpl/urnik-layout.tpl',
    '../Model/TerminiStoritve',
    'fullcalendar',
    'fc-schedule'
], function (
        Radio,
        Marionette,
        tpl,
        TerminiStoritve
        ) {

    var UrnikTSView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'koledar',
        regions: {
            toolbarR: '.koledar-toolbar',
            filterR: '.koledar-region-filter'
        },
        ui: {
            'koledar': '.koledar-container'
        }
    });

    UrnikTSView.prototype.initialize = function (options) {
        this.collection = options.collection;
        this.tsCollBrezDogodka = new TerminiStoritve();

        this.dogodek = options.dogodek;
        this.datum = this.dogodek.get('zacetek');
        this.dogodekId = this.dogodek.get('id');

        this.terminiStoritve = options.terminiStoritve;
        this.osebe = this.terminiStoritve.getSeznamOseb();
        this.osebeIds = this.osebe.pluck('id');

        this.osebe.on('change', function () {
            this.ui.koledar.fullCalendar('refetchEvents');
        }, this);
    };

    UrnikTSView.prototype.onRender = function () {
        var self = this;
        var options = {
            view: self,
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: ''
            },
            selectHelper: true,
            editable: true,
            aspectRatio: 2,
            lang: 'sl',
            timezone: true,
            now: this.datum,
            scrollTime: "10:00:00",
            timeFormat: 'H(:mm)',
            defaultView: 'timelineDay',
            resourceColumns: [
                {
                    labelText: 'Oseba',
                    field: 'label'
                }
            ],
            resources: function (callback) {
                var osebe = self.osebe.getResources();
                callback(osebe);
            },
            eventSources: [
                {
                    events: function (zacetek, konec, timezone, callback) {
                        var z = zacetek.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        var k = konec.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        self.collection.queryParams.zacetek = z;
                        self.collection.queryParams.konec = k;
                        self.collection.queryParams.oseba = self.osebeIds;
                        self.collection.fetch({
                            success: function (coll) {
                                coll.remove(coll.where({dogodek: self.dogodekId}));

                                self.tsCollBrezDogodka.reset(coll.models);
                                callback(self.tsCollBrezDogodka.getEventObjects());
                            },
                            error: Radio.channel('error').request('handler', 'xhr')
                        });
                    },
                    editable: false,
                    color: 'red',
                    className: 'background-event',
                    coll: self.tsCollBrezDogodka
                },
                {
                    events: function (zacetek, konec, timezone, callback) {
                        callback(self.terminiStoritve.getEventObjects());
                    },
                    coll: self.terminiStoritve
                },
                {
                    events: function (zacetek, konec, timezone, callback) {
                        var eventDogodek = [{
                                id: 'dg',
                                rendering: 'background',
                                start: self.dogodek.get('zacetek'),
                                end: self.dogodek.get('konec')
                            }];
                        callback(eventDogodek);
                    }
                }
            ],
            eventClick: this.eventClick,
            eventMouseover: this.eventMouseOver,
            eventDrop: this.eventDropOrResize,
            eventResize: this.eventDropOrResize,
            eventDragStart: this.eventDropOrResizeStart,
            eventResizeStart: this.eventDropOrResizeStart
        };
        setTimeout(function () {
            self.ui.koledar.fullCalendar(options);
        }, 200);
    };

    /**
     * Funkcija določi resourceStart od katerega je event.
     * Potrebujemo zato, ker event ne sme skočit na drug resource
     * @param {type} fcEvent
     * @param {type} jsEvent
     * @param {type} ui
     * @param {type} view
     * @returns {undefined}
     */
    UrnikTSView.prototype.eventDropOrResizeStart = function (fcEvent, jsEvent, ui, view) {
        fcEvent['resourceStart'] = fcEvent.resourceId;
    };

    /**
     * Funkcija se kliče ob končanem premiku ali ob končanem spreminjanju dolžine eventa.
     * Funkcija preverja ali se sme event shranit ali ne.
     * @param {type} fcEvent
     * @param {type} delta
     * @param {type} revert
     * @param {type} jsEvent
     * @param {type} ui
     * @param {type} view
     * @returns {undefined}
     */
    UrnikTSView.prototype.eventDropOrResize = function (fcEvent, delta, revert, jsEvent, ui, view) {
        var model = fcEvent.source.coll.get(fcEvent.id);
        //v primeru da je resourceId enak na začetku in koncu lahko shranemo event
        //v nasprotnem primeru revertamo spremembe
        if (fcEvent.resourceStart === fcEvent.resourceId) {
            model.save({planiranZacetek: fcEvent.start.toISOString(), planiranKonec: fcEvent.end.toISOString()}, {
                error: function (model, xhr) {
                    revert();
                    Radio.channel('error').command('xhr', model, xhr);
                }
            });
        } else {
            revert();
        }
    };

    return UrnikTSView;
});
