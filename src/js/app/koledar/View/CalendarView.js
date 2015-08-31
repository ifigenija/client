/* 
 * Licenca GPLv3
 */


define(['marionette', 'underscore', 'jquery', 'template!../tpl/calendar-layout.tpl', 'fullcalendar'], function (Marionette, _, $, tpl) {



    var CalendarView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            filterR: '.calendar-filter',
            msgR: '.calendar-msg',
            dogodekR: '.dogodek'

        },
        ui: {
            'calendar': '.calendar-container'
        },
        initialize: function (options) {
            this.koledarji = options.koledarji;
            this.filterView = options.filterView || new DefaultFilter();

            this.filterView.on('filter', this.searchCollection);
        },
        onRender: function () {
            var options = _.extend({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek,agendaWeek,basicDay'
                },
                selectable: true,
                selectHelper: true,
                editable: true,
                ignoreTimezone: false,
                select: this.select,
                weekNumberCalculation: 'ISO',
                firstDay: 1,
                eventClick: this.eventClick,
                eventDrop: this.eventDropOrResize,
                eventResize: this.eventDropOrResize
            }, _.omit(this.options, 'koledarji'));

            console.log('options koledar', options);
            this.filterR.show(this.filterView);
            this.ui.calendar.fullCalendar(options);

        },
        select: function (startDate, endDate) {
            console.log('select', startDate, endDate);
        },
        eventClick: function (fcEvent) {
            console.log('click', fcEvent);
        },
        change: function (event) {
            // Look up the underlying event in the calendar and update its details from the model
            var fcEvent = this.el.fullCalendar('clientEvents', event.get('id'))[0];
            fcEvent.title = event.get('title');
            fcEvent.color = event.get('color');
            this.ui.calendar.fullCalendar('updateEvent', fcEvent);
        },
        eventDropOrResize: function (fcEvent) {
            // Lookup the model that has the ID of the event and update its attributes
            this.collection.get(fcEvent.id).save({start: fcEvent.start, end: fcEvent.end});
        },
        onDestroy: function () {
        },
        searchCollection: function (data) {
            console.log('search', data);
        }
    });


    return CalendarView;
});