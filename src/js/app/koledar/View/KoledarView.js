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
    './ZasedenostView'
], function (
    Marionette,
    _,
    $,
    tpl,
    DogodekModal,
    DogodekFilter,
    ZasedenostView) {

    var KoledarView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            filterR: '.calendar-filter',
            msgR: '.calendar-msg',
            dogodekR: '.dogodek'
        },
        ui: {
            'calendar': '.calendar-container'
        }
    });

    KoledarView.prototype.initialize = function (options) {
        this.filterView = options.filterView || new DogodekFilter();
        this.filterView.on('filter', function () {
            this.ui.calendar.fullCalendar('refetchEvents');
        }, this);
    };

    KoledarView.prototype.onRender = function () {
        var self = this;
        var options = _.extend({
                    lang: 'sl',
                    header: {
                        left: 'prev,next,today',
                        center: 'title',
                        right: 'month,basicWeek,agendaWeek,basicDay'
                    },
                    lang: 'sl',
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
                        return self.eventClick.apply(self, arguments)
                    },
                    eventDrop: this.eventDropOrResize,
                    eventResize: this.eventDropOrResize,
                    eventSources: [
                        {
                            events: function (zacetek, konec, timezone, callback) {
                                var list = [];
                                self.collection.queryParams.zacetek = zacetek.toISOString();
                                self.collection.queryParams.konec = konec.toISOString();
                                self.collection.queryParams = _.extend(self.collection.queryParams, self.filterView.form.getValue());
                                self.collection.fetch({
                                   success: function (coll) {
                                       coll.each(function (eventModel) {
                                            list.push(eventModel.getEventObject);
                                       });
                                       callback(list);
                                   }
                                });
                            },
                            coll: self.collection
                        }
                    ],
                    eventResize: function () {
                        return self.eventDropOrResize.apply(self, arguments);
                    }
                });
        this.filterR.show(this.filterView);
        this.ui.calendar.fullCalendar(options);
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
        var fcEvent = this.el.fullCalendar('clientEvents', event.get('id'))[0];
        fcEvent.title = event.get('title');
        fcEvent.color = event.get('color');
        this.ui.calendar.fullCalendar('updateEvent', fcEvent);
    };

    KoledarView.prototype.eventDropOrResize = function (fcEvent) {
    };

    KoledarView.prototype.onDestroy = function () {
    };

    KoledarView.prototype.searchCollection = function (data) {
        console.log('search', data);
    };

    KoledarView.prototype.renderDogodek = function (fcEvent, jsEvent, view) {

        var model = new DogodekModel.Model();

        model.set('id', fcEvent.id);
        model.set('title', fcEvent.title);
        model.set('zacetek', fcEvent.start);
        model.set('konec', fcEvent.end);
        model.set('razred', fcEvent.razred);
        model.set('zasedenost', fcEvent.zasedenost);

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
        var vaja = model.vaja;
        var view = new VajaView({id: vaja});
        this.dogodekR.show(view);
    };
    KoledarView.prototype.renderPredstava = function (model) {
        var predstava = model.predstava;
        var view = new PredstavaView({id: predstava});
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
        var view = new ZasedenostView({id: zesedenost});
        this.dogodekR.show(view);
    };
    return KoledarView;
})
;