/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'marionette',
    'underscore',
    'template!../tpl/urnik-layout.tpl',
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
            'koledar': '.koledar-container'
        }
    });

    UrnikProstorView.prototype.initialize = function (options) {
        this.datum = options.datum;
    };

    UrnikProstorView.prototype.onRender = function () {
        var self = this;
        var options = {
            view: self,
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            header: {
                left: 'prev,next,today',
                center: 'title',
                right:''
            },
            selectHelper: true,
            editable: true,
            lang: 'sl',
            now: this.datum,
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
                        var list = [];
                        self.collection.queryParams.zacetek = zacetek.toISOString();
                        self.collection.queryParams.konec = konec.toISOString();
                        self.collection.fetch({
                            success: function (coll) {
                                coll.each(function (model) {
                                    list.push(model.getEventObject());
                                });
                                callback(list);
                            },
                            error: Radio.channel('error').request('handler', 'xhr')
                        });
                    },
                    coll: self.collection
                }
            ],
            eventClick: this.eventClick,
            //eventDrop: this.eventDropOrResize,
            eventResize: this.eventDropOrResize,
            eventMouseover: this.eventMouseOver
        };
        setTimeout(function () {
            self.ui.koledar.fullCalendar(options);
        }, 200);
    };
    
    UrnikProstorView.prototype.eventDropOrResize = function (fcEvent, delta, revert, jsEvent, ui, view) {
        //dogodki preko rest put z novim začetkom in koncem
        var model = fcEvent.source.coll.get(fcEvent.id);
        model.save({zacetek: fcEvent.start.toISOString(), konec: fcEvent.end.toISOString()}, {
            error: function (model, xhr) {
                revert();
                Radio.channel('error').command('xhr', model, xhr);
            }
        });
    };
    

    return UrnikProstorView;
});
