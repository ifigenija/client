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
        this.datum = options.datum;
        this.dogodekId = options.dogodekId;
        this.osebe = options.osebe;
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
            lang: 'sl',
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
                callback(self.osebe.getResources());
            },
            eventSources: [
                {
                    events: function (zacetek, konec, timezone, callback) {
                        self.collection.queryParams.zacetek = zacetek.toISOString();
                        self.collection.queryParams.konec = konec.toISOString();
                        self.collection.fetch({
                            success: function (coll) {
                                coll.remove(coll.where({dogodek: self.dogodekId}));
                                callback(coll.getEventObjects());
                            },
                            error: Radio.channel('error').request('handler', 'xhr')
                        });
                    },
                    editable: false,
                    rendering: 'background',
                    coll: self.collection
                },
                {
                    events: function (zacetek, konec, timezone, callback) {
                        self.collection.queryParams.zacetek = zacetek.toISOString();
                        self.collection.queryParams.konec = konec.toISOString();
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
                }
            ]
        };
        setTimeout(function () {
            self.ui.koledar.fullCalendar(options);
            self.ui.koledar.fullCalendar('refetchEvents');
        }, 200);
    };


    return UrnikTSView;
});
