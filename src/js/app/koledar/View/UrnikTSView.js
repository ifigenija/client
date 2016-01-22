/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'marionette',
    'moment',
    'template!../tpl/urnik-layout.tpl',
    'fullcalendar',
    'fc-schedule'
], function (
        Radio,
        Marionette,
        moment,
        tpl
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
        this.dogodek = options.dogodek;
        this.osebe = options.osebe;
        this.collection = options.collection;

        this.datum = this.dogodek.get('zacetek');
        this.dogodekId = this.dogodek.get('id');
        this.osebeIds = this.osebe.pluck('id');
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
            aspectRatio: 1.6,
            lang: 'sl',
            timezone: true,
            now: this.datum,
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
                                callback(coll.getEventObjects());
                            },
                            error: Radio.channel('error').request('handler', 'xhr')
                        });
                    },
                    editable: false,
                    color: 'red',
                    className: 'background-event',
                    coll: self.collection
                },
                {
                    events: function (zacetek, konec, timezone, callback) {
                        var z = zacetek.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        var k = konec.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        self.collection.queryParams.zacetek = z;
                        self.collection.queryParams.konec = k;
                        self.collection.queryParams.oseba = self.osebeIds;
                        self.collection.fetch({
                            success: function (coll) {
                                var modeli = coll.where({dogodek: self.dogodekId});
                                for (var key in modeli) {
                                    modeli[key] = modeli[key].getEventObject();
                                }
                                callback(modeli);
                            },
                            error: Radio.channel('error').request('handler', 'xhr')
                        });
                    },
                    coll: self.collection
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
            ]
        };
        setTimeout(function () {
            self.ui.koledar.fullCalendar(options);
        }, 200);
    };


    return UrnikTSView;
});
