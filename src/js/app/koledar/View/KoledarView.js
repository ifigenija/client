/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'underscore',
    'jquery',
    'template!../tpl/calendar-layout.tpl',
    './DogodekModal',
    './DogodekFilter',
    './DogodekView',
    './KoledarFilterView',
    'radio',
    'app/seznami/Model/Prostor'
], function (
        Marionette,
        _,
        $,
        tpl,
        DogodekModal,
        DogodekFilter,
        DogodekView,
        KoledarFilterView,
        Radio,
        Prostor
        ) {

    var KoledarView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            filterR: '.calendar-filter',
            msgR: '.calendar-msg',
            dogodekR: '.dogodek',
            koledarFilterR: '.koledar-filter-bar'
        },
        ui: {
            'calendar': '.calendar-container'
        }
    });

    KoledarView.prototype.initialize = function (options) {
        //this.filterView = options.filterView || new DogodekFilter();
//        this.filterView.on('filter', function () {
//            this.ui.calendar.fullCalendar('refetchEvents');
//        }, this);
        this.listenTo(this.collection, 'change', this.change);
    };

    KoledarView.prototype.onRender = function () {
        this.renderFilterView();
        var self = this;
        var options = _.extend({
            lang: 'sl',
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,basicWeek,agendaWeek,basicDay'
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
        });
        //this.filterR.show(this.filterView);
        setTimeout(function () {
            self.ui.calendar.fullCalendar(options);
        }, 200);
    };


    KoledarView.prototype.renderFilterView = function () {
        var filterView = new KoledarFilterView();
        var self = this;

        filterView.on('changed', function () {
            self.vrednostiFiltrov = filterView.getVrednostiAktivnihFiltrov();
            self.ui.calendar.fullCalendar('refetchEvents');
        });

        this.koledarFilterR.show(filterView);
    };

    KoledarView.prototype.select = function (start, end, jsEvent, view) {
        var self = this;
        DogodekModal({
            zacetek: start.format(),
            konec: end.format(),
            cb: function () {
                self.dodajDogodek.apply(self, arguments);
            }
        });
    };

    KoledarView.prototype.eventClick = function (fcEvent, jsEvent, view) {
        this.renderDogodek(fcEvent, jsEvent, view);
    };

    KoledarView.prototype.change = function (event) {
        // Look up the underlying event in the calendar and update its details from the model
        var e = this.ui.calendar.fullCalendar('clientEvents', event.get('id'))[0];
        e = event.getEventObject(e);
        this.ui.calendar.fullCalendar('updateEvent', e);
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

    KoledarView.prototype.onDestroy = function () {
    };

    KoledarView.prototype.searchCollection = function (data) {
        console.log('search', data);
    };

    KoledarView.prototype.renderDogodek = function (fcEvent, jsEvent, view) {

        var model = fcEvent.source.coll.get(fcEvent.id);

        var razred = fcEvent.razred;
        switch (razred) {
            case '100s':
                this.renderPredstava(model);
                break;
            case '200s':
                this.renderVaja(model);
                break;
            case '300s':
                this.renderGostovanje(model);
                break;
            case '400s':
                this.renderSplosni(model);
                break;
            case '500s':
                this.renderZasedenost(model);
                break;
        }

    };

    KoledarView.prototype.renderVaja = function (model) {
        var view = new DogodekView({model: model});
        view.on('preklici', this.onPreklici, this);
        this.dogodekR.show(view);
    };
    KoledarView.prototype.renderPredstava = function (model) {
        var view = new DogodekView({model: model});
        view.on('preklici', this.onPreklici, this);
        this.dogodekR.show(view);
    };
    KoledarView.prototype.renderGostovanje = function (model) {
        var gostovanje = model.gostovanje;
        var view = new GostovanjeView({id: gostovanje});
        this.dogodekR.show(view);
    };
    KoledarView.prototype.renderSplosni = function (model) {
        var splosni = model.splosni;
        var view = new SplosniDogodekView({id: splosni});
        this.dogodekR.show(view);
    };
    KoledarView.prototype.renderZasedenost = function (model) {
        var zesedenost = model.zesedenost;
        var view = new DogodekView({id: zesedenost});
        this.dogodekR.show(view);
    };
    KoledarView.prototype.onPreklici = function () {
        this.dogodekR.empty();
    };

    return KoledarView;
})
        ;