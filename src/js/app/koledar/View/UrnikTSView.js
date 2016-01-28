/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'underscore',
    'marionette',
    'app/Max/View/Toolbar',    
    'template!../tpl/urnik-layout-ts.tpl',
    '../Model/TerminiStoritve',
    'fullcalendar',
    'fc-schedule'
], function (
        Radio,
        i18next,
        _,
        Marionette,
        Toolbar,        
        tpl,
        TerminiStoritve
        ) {

    var UrnikTSView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'urnik-oseba',
        regions: {
            toolbarR: '.urnik-toolbar'
        },
        ui: {
            'koledar': '.urnik-container-ts'
        },
        naslov: i18next.t('urnik.tsOsebe')
    });
    
    UrnikTSView.prototype.serializeData = function (options) {
        return{
            naslov: this.naslov
        };
    };

    UrnikTSView.prototype.initialize = function (options) {
        this.collection = options.collection;

        this.dogodek = options.dogodek;
        this.datum = this.dogodek.get('zacetek');

        this.terminiStoritve = options.terminiStoritve;
        this.osebe = this.terminiStoritve.getSeznamOseb();
        
        this.naslov = options.naslov || this.naslov;

        this.koledarOptions = options.koledarOptions || this.koledarOptions;
    };
    
    UrnikTSView.prototype.renderToolbar = function () {
        var groups = [[
                {
                    id: 'urnik-zapri',
                    label: i18next.t('std.zapri'),
                    element: 'button-trigger',
                    trigger: 'zapri:urnik'
                }
            ]];

        var toolbarView = new Toolbar({
            buttonGroups: groups,
            listener: this
        });

        this.toolbarR.show(toolbarView);
    };
    

    UrnikTSView.prototype.onRender = function () {
        this.renderToolbar();
        
        var self = this;
        var options = _.extend({
            view: self,
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'timelineDay,timelineTwoDays,timelineThreeDays'
            },
            selectHelper: true,
            editable: true,
            aspectRatio: 2,
            lang: 'sl',
            height:'auto',
            timezone: true,
            now: this.datum,
            minTime: "06:00:00",
            scrollTime: "10:00:00",
            timeFormat: 'H(:mm)',
            defaultView: 'timelineDay',
            views: {
                timelineTwoDays: {
                    type: 'timeline',
                    duration: {days: 2},
                    buttonText: i18next.t('koledar.dvaDni')
                },
                timelineThreeDays: {
                    type: 'timeline',
                    duration: {days: 3},
                    buttonText: i18next.t('koledar.triDni')
                }
            },
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
                        self.collection.queryParams.oseba = self.osebe.pluck('id');
                        self.collection.fetch({
                            success: function (coll) {
                                coll.remove(coll.where({dogodek: self.dogodek.get('id')}));
                                callback(coll.getEventObjects());
                            },
                            error: Radio.channel('error').request('handler', 'xhr')
                        });
                    },
                    editable: false,
                    color: 'red',
                    className: 'background-event'
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
        }, this.koledarOptions);
        setTimeout(function () {
            self.ui.koledar.fullCalendar(options);

            self.terminiStoritve.on('add remove', self.resetKoledar, self);
        }, 200);
    };

    UrnikTSView.prototype.resetKoledar = function (fcEvent, jsEvent, ui, view) {
        this.tsCollBrezDogodka = new TerminiStoritve();
        this.osebe = this.terminiStoritve.getSeznamOseb();
        this.ui.koledar.fullCalendar('refetchEvents');
        this.ui.koledar.fullCalendar('refetchResources');
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

    UrnikTSView.prototype.eventMouseOver = function (fcEvent, jsEvent, view) {
//        console.log('mouseover');
    };

    /**
     * Funkcija unbinda callback funckije resetKoledar
     * Narejeno zato da se ne kliče ko ni koledar odprt
     * @returns {undefined}
     */
    UrnikTSView.prototype.onBeforeDestroy = function () {
        this.terminiStoritve.off('add remove', this.resetKoledar, this);
    };

    return UrnikTSView;
});
