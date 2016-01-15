/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'marionette',
    'underscore',
    'jquery',
    'template!../tpl/urnik-layout.tpl',
    //'./KoledarFilterView',
    '../Model/RazredDogodek',
    '../Model/KoledarLookup',
    'fc-schedule'
], function (
        Radio,
        i18next,
        Marionette,
        _,
        $,
        tpl,
        //KoledarFilterView,
        Dogodek,
        KoledarLookup
        ) {

    var KoledarView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'koledar',
        regions: {
            filterR: '.koledar-region-filter'
        },
        ui: {
            'koledar': '.koledar-container'
        }
    });

    KoledarView.prototype.onRender = function () {
        var self = this;
        var options = _.extend({
            view: self,
            lang: 'sl',
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'timelineDay,timelineWeek,timelineMonth'
            },
            timezone: true,
            aspectRatio: 1.6,
            selectable: true,
            defaultView: 'timelineDay',
            selectHelper: true,
            editable: true,
            select: this.select,
            weekNumberCalculation: 'ISO',
            weekNumbers: true,
            firstDay: 1,
            timeFormat: 'H(:mm)',
            eventClick: function () {
                return self.eventClick.apply(self, arguments);
            },
            eventDrop: this.eventDropOrResize,
            eventResize: this.eventDropOrResize,
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
                        var resources = collection.getEventObjects();
                        callback(resources);
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            },
            eventResourceField: 'prostorID',
            eventSources: [
                {
                    events: function (zacetek, konec, timezone, callback) {
                        var list = [];
                        self.collection.queryParams.zacetek = zacetek.toISOString();
                        self.collection.queryParams.konec = konec.toISOString();
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
        });
        setTimeout(function () {
            self.ui.koledar.fullCalendar(options);
        }, 200);
    };

    return KoledarView;
});
