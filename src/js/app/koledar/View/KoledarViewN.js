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
    'fc-schedule'
], function (
        Radio,
        i18next,
        Marionette,
        _,
        $,
        tpl,
        KoledarFilterView
        ) {

    var KoledarView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'koledar',
        regions: {
            toolbarR: '.koledar-toolbar',
            filterR: '.koledar-filter',
            dogodekR: '.koledar-dogodek'
        },
        ui: {
            'koledar': '.koledar-container'
        }
    });

    KoledarView.prototype.initialize = function (options) {
    };

    KoledarView.prototype.onRender = function () {
        this.renderFilterView();
        var self = this;
        var options = _.extend({
            lang: 'sl',
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,basicWeek,agendaWeek,basicDay'
            },
            timezone: false,
            aspectRatio: 1.8,
            selectable: true,
            defaultView: 'month',
            selectHelper: true,
            editable: true,
            select: this.select,
            weekNumberCalculation: 'ISO',
            weekNumbers: true,
            firstDay: 1,
            timeFormat: 'H(:mm)',
            eventClick: this.eventClick,
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
            ],
            view: self
        });
        setTimeout(function () {
            self.ui.koledar.fullCalendar(options);
        }, 200);
    };


    KoledarView.prototype.renderFilterView = function () {
        var filterView = new KoledarFilterView();
        var self = this;

        filterView.on('changed', function () {
            self.vrednostiFiltrov = filterView.getVrednostiAktivnihFiltrov();
            self.ui.koledar.fullCalendar('refetchEvents');
        });

        this.filterR.show(filterView);
    };

    KoledarView.prototype.select = function (start, end, jsEvent, view) {
        var view = this.options.view;
        view.trigger('select', arguments);
    };

    KoledarView.prototype.eventClick = function (fcEvent, jsEvent, view) {
        var view = this.options.view;
        view.trigger('event:click', arguments);
    };

    KoledarView.prototype.eventDropOrResize = function (fcEvent, delta, revert, jsEvent, ui, view) {
        // Lookup the model that has the ID of the event and update its attributes
        var model = fcEvent.source.coll.get(fcEvent.id);
        model.save({zacetek: fcEvent.start.toISOString(), konec: fcEvent.end.toISOString()}, {
            success: function () {
                var view = this.options.view;
                view.trigger('event:drop:or:resize', arguments);
            },
            error: function (model, xhr) {
                revert();
                Radio.channel('error').command('xhr', model, xhr);
            }
        });
    };

    return KoledarView;
});
