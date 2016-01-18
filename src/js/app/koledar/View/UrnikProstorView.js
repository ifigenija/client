/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'marionette',
    'underscore',
    'template!../tpl/urnik-layout.tpl',
    '../Model/KoledarLookup',
    'fc-schedule'
], function (
        Radio,
        Marionette,
        _,
        tpl,
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

    KoledarView.prototype.initialize = function (options) {
        this.datum = options.datum;
    };

    KoledarView.prototype.onRender = function () {
        var self = this;
        var options = {
            view: self,
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            header: {
                left: 'prev,next,today',
                center: 'title',
                right:''
            },
            now: this.datum,
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
                        var resources = collection.getResources();
                        callback(resources);
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
                                    //list.push(model.getEventObject());
                                    var d = _.clone(model.attributes);
                                    d.start = d.zacetek;
                                    d.end = d.konec;
                                    d.resourceId = d['prostor'].id;
                                    
                                    list.push(d);
                                });
                                callback(list);
                            }
                        });
                    },
                    coll: self.collection
                }
            ]
        };
        setTimeout(function () {
            self.ui.koledar.fullCalendar(options);
        }, 200);
    };

    return KoledarView;
});
