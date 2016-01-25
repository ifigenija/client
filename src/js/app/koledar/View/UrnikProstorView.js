/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'marionette',
    'underscore',
    'template!../tpl/urnik-layout-prostor.tpl',
    '../Model/KoledarLookup',
    'fullcalendar',
    'fc-schedule'
], function (
        Radio,
        Marionette,
        _,
        tpl,
        KoledarLookup
        ) {

    var UrnikProstorView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'koledar',
        regions: {
            toolbarR: '.koledar-toolbar',
            filterR: '.koledar-region-filter'
        },
        ui: {
            'koledar': '.urnik-container-ts'
        }
    });

    UrnikProstorView.prototype.initialize = function (options) {
        this.datum = options.datum;
        this.dogodek = options.dogodek;
    };

    UrnikProstorView.prototype.onRender = function () {
        var self = this;
        var options = {
            view: self,
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            header: {
                left: 'title',
                center: '',
                right: ''
            },
            selectHelper: true,
            editable: true,
            lang: 'sl',
            now: this.datum,
            scrollTime: "10:00:00",
            timeFormat: 'H(:mm)',
            defaultView: 'timelineDay',
            resourceColumns: [
                {
                    labelText: 'Prostor',
                    field: 'label'
                }
            ],
            resources: function (callback) {
                var prostori = new KoledarLookup(null, {
                    entity: 'prostor'
                });

                prostori.fetch({
                    success: function (collection) {
                        callback(collection.getResources());
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            },
            eventSources: [
                {
                    events: function (zacetek, konec, timezone, callback) {
                        self.collection.queryParams.zacetek = zacetek.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        self.collection.queryParams.konec = konec.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        self.collection.fetch({
                            success: function (coll) {
                                coll.remove(coll.where({id: self.dogodek.get('id')}));
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
                        var podatki = [];
                        podatki.push(self.dogodek.getEventObject());
                        callback(podatki);
                    },
                    dogodek: self.dogodek
                }
            ],
            eventClick: this.eventClick,
            eventDrop: this.eventDropOrResize,
            eventResize: this.eventDropOrResize,
            eventMouseover: this.eventMouseOver
        };
        setTimeout(function () {
            self.ui.koledar.fullCalendar(options);
        }, 200);
    };

    UrnikProstorView.prototype.eventDropOrResize = function (fcEvent, delta, revert, jsEvent, ui, view) {
        //dogodki preko rest put z novim začetkom in koncem
        var model = fcEvent.source.dogodek;
        model.save({zacetek: fcEvent.start.toISOString(), konec: fcEvent.end.toISOString(), prostor: fcEvent.resourceId}, {
            error: function (model, xhr) {
                revert();
                Radio.channel('error').command('xhr', model, xhr);
            }
        });
    };


    return UrnikProstorView;
});
