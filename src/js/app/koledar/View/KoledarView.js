/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'marionette',
    'underscore',
    'jquery',
    'template!../tpl/koledar-layout.tpl',
    './KoledarFilterView',
    '../Model/RazredDogodek',
    'fc-schedule'
], function (
        Radio,
        i18next,
        Marionette,
        _,
        $,
        tpl,
        KoledarFilterView,
        Dogodek
        ) {

    var KoledarView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'koledar',
        regions: {
            sidebarR: '.koledar-region-sidebar',
            filterR: '.koledar-region-filter'
        },
        ui: {
            'koledar': '.koledar-container'
        }
    });
    KoledarView.prototype.initialize = function (options) {
        this.FilterView = options.FilterView || KoledarFilterView;
        this.koledarOptions = options.koledarOptions || this.koledarOptions;
    };
    KoledarView.prototype.onRender = function () {
        this.renderFilter();
        this.renderKoledar();
    };
    KoledarView.prototype.renderKoledar = function () {
        var self = this;
        var options = _.extend({
            view: self,
            lang: 'sl',
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,basicWeek,dnevniRedTeden,basicDay'
            },
            views: {
                dnevniRedTeden: {
                    type: 'agenda',
                    duration: {weeks: 1},
                    buttonText: i18next.t('koledar.dnevniRedTeden')
                }
            },
            timezone: false,
            selectable: true,
            defaultView: 'month',
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
            eventSources: [
                {
                    events: function (zacetek, konec, timezone, callback) {
                        var list = [];
                        var vrednosti = self.vrednostiFiltrov;
                        self.collection.queryParams.zacetek = zacetek.toISOString();
                        self.collection.queryParams.konec = konec.toISOString();
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
        }, this.koledarOptions);
        setTimeout(function () {
            self.ui.koledar.fullCalendar(options);
        }, 200);
    };
    KoledarView.prototype.renderFilter = function () {
        var filterView = new this.FilterView();
        var self = this;
        filterView.on('changed', function () {
            self.vrednostiFiltrov = filterView.getVrednostiAktivnihFiltrov();
            self.ui.koledar.fullCalendar('refetchEvents');
        });
        this.filterR.show(filterView);
    };
    KoledarView.prototype.select = function (start, end, jsEvent, view) {
        var view = this.options.view;
        view.trigger('dodaj:dogodek', start, end);
    };
    KoledarView.prototype.eventClick = function (fcEvent, jsEvent, view) {
        var dogodekModel = fcEvent.source.coll.get(fcEvent.id);
        var razred = dogodekModel.get('razred');
        var model;
        if (razred === '100s') {
            model = new Dogodek({
                id: dogodekModel.get('predstava'),
                view: 'predstava'
            });
        } else if (razred === '200s') {
            model = new Dogodek({
                id: dogodekModel.get('vaja'),
                view: 'vaja'
            });
        } else if (razred === '300s') {
            model = new Dogodek({
                id: dogodekModel.get('gostovanje'),
                view: 'gostovanje'
            });
        } else if (razred === '400s') {
            model = new Dogodek({
                id: dogodekModel.get('splosni'),
                view: 'dogodekSplosni'
            });
        } else if (razred === '500s') {

        } else if (razred === '600s') {
            model = new Dogodek({
                id: dogodekModel.get('tehnicni'),
                view: 'dogodekTehnicni'
            });
        }
        var self = this;
        model.fetch({
            success: function () {
                self.trigger('prikazi:dogodek', model);
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };
    KoledarView.prototype.change = function (event) {
        // Look up the underlying event in the koledar and update its details from the model
        var e = this.ui.koledar.fullCalendar('clientEvents', event.get('id'))[0];
        e = event.getEventObject(e);
        this.ui.koledar.fullCalendar('updateEvent', e);
    };
    KoledarView.prototype.eventDropOrResize = function (fcEvent, delta, revert, jsEvent, ui, view) {
        // Lookup the model that has the ID of the event and update its attributes
        var model = fcEvent.source.coll.get(fcEvent.id);
        model.save({zacetek: fcEvent.start.toISOString(), konec: fcEvent.end.toISOString()}, {
            error: function (model, xhr) {
                revert();
                Radio.channel('error').command('xhr', model, xhr);
            }
        });
    };
    return KoledarView;
});
