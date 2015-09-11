/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'underscore',
    'jquery',
    'template!../tpl/calendar-layout.tpl',
    './DogodekModal',
    '../Model/Dogodek',
    './DogodekLayoutView',
    'fullcalendar'
], function (
        Marionette,
        _,
        $,
        tpl,
        DogodekModal,
        DogodekModel,
        DogodekLayoutView
        ) {

    var CalendarView = Marionette.LayoutView.extend({
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

    CalendarView.prototype.initialize = function (options) {
        this.koledarji = options.koledarji;
        this.filterView = options.filterView || new DefaultFilter();
        this.filterView.on('filter', this.searchCollection);
    };

    CalendarView.prototype.onRender = function () {
        var self = this;
        var options = _.extend({
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,basicWeek,agendaWeek,basicDay'
            },
            events: [
                {
                    id: 1,
                    title: 'Event1',
                    start: '2015-09-12',
                    end: '2015-09-14'
                },
                {
                    id: 2,
                    title: 'Event2',
                    start: '2015-09-16',
                    allDay: true
                }
            ],
            selectable: true,
            selectHelper: true,
            editable: true,
            ignoreTimezone: false,
            select: function () {
                return self.select.apply(self, arguments);
            },
            weekNumberCalculation: 'ISO',
            firstDay: 1,
            eventClick: function () {
                return self.eventClick.apply(self, arguments);
            },
            eventDrop: function () {
                return self.eventDropOrResize.apply(self, arguments);
            },
            eventResize: function () {
                return self.eventDropOrResize.apply(self, arguments);
            }
        }, _.omit(this.options, 'koledarji'));
//        console.log('options koledar', options);
        this.filterR.show(this.filterView);
        this.ui.calendar.fullCalendar(options);
    };

    CalendarView.prototype.select = function (start, end, jsEvent, view) {
        var self = this;
        DogodekModal({
            zacetek: start.format(),
            konec: end.format(),
            cb: function () {
                self.dodajDogodek.apply(self, arguments);
            }
        });
    };

    CalendarView.prototype.eventClick = function (fcEvent, jsEvent, view) {
        this.renderDogodekLayout(fcEvent, jsEvent, view);
    };

    CalendarView.prototype.change = function (event) {
        // Look up the underlying event in the calendar and update its details from the model
        var fcEvent = this.el.fullCalendar('clientEvents', event.get('id'))[0];
        fcEvent.title = event.get('title');
        fcEvent.color = event.get('color');
        this.ui.calendar.fullCalendar('updateEvent', fcEvent);
    };

    CalendarView.prototype.eventDropOrResize = function (event) {
        // Lookup the model that has the ID of the event and update its attributes
        //this.collection.get(fcEvent.id).save({start: fcEvent.start, end: fcEvent.end});
        console.log('drop/resize');
        //update dogodka v modelu
        //v primeru da je odprta forma bi se naj se kliče render da se posodobijo podatki
        //samo testiranje
        this.renderDogodekLayout(event);
    };

    CalendarView.prototype.onDestroy = function () {
    };

    CalendarView.prototype.searchCollection = function (data) {
        console.log('search', data);
    };

    CalendarView.prototype.renderDogodekLayout = function (fcEvent, jsEvent, view) {
        var model = new DogodekModel.Model();

        model.set('id', fcEvent.id);
        model.set('title', fcEvent.title);
        model.set('zacetek', fcEvent.start);
        model.set('konec', fcEvent.end);

        var view = new DogodekLayoutView({
            model: model
        });

        var self = this;

        view.on('brisi', function () {
            self.onBrisi(fcEvent, jsEvent, view);
        }, this);

        this.dogodekR.show(view);
    };

    CalendarView.prototype.dodajDogodek = function (view) {
        var model = view.model;
        if (!model.get('id')) {
            this.shraniDogodek(model);
        }

        if (model.get('id')) {
            var source = {
                events: [
                    {
                        id: model.get('id'),
                        title: model.get('title'),
                        start: model.get('zacetek'),
                        end: model.get('konec')
                    }
                ]
            };

            this.ui.calendar.fullCalendar('addEventSource', source);
        }
    };

    CalendarView.prototype.onBrisi = function (fcEvent, jsEvent, view) {
        this.ui.calendar.fullCalendar('removeEvents', fcEvent.id);
    };

    CalendarView.prototype.shraniDogodek = function (model) {

        function makeId()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        model.set('id', makeId());
        localStorage.setItem('Dogodki', JSON.stringify(model.toJSON()));
    };
    return CalendarView;
});