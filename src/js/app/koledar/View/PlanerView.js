/* 
 * Licenca GPLv3
 */

define(['marionette',
    'moment',
    'underscore',
    'jquery',
    'template!../tpl/calendar-layout.tpl',
    'fullcalendar',
    'fc-schedule'
], function (Marionette,
        moment,
        _,
        $,
        tpl) {

    var PlanerView = Marionette.LayoutView.extend({
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
            this.resCollection = options.resCollection;
            if (!this.resCollection) {
                throw "resource collection not specified";
            }
            this.filterView.on('filter', this.searchCollection);
            this.listenTo(this.resCollection, 'add', this.addResource);
            this.listenTo(this.resCollection, 'remove', this.removeResource);
            this.listenTo(this.resCollection, 'reset', this.resetResources);
        },
        onRender: function () {
            var options = _.extend({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timelineDan,timelineTeden,timelineMonth'
                },
                contentHeight: 'auto',
                events: function (start, end, callback) {
                    console.log(start,end);
                    callback([         ]);
                },
                defaultView: "timelineDan",
                resourceGroupField: 'popa',
                resourceGroupText: function (group) {
                    return group ? group.label : 'Doma';
                },
                views: {
                    timelineTeden: {
                        type: 'timeline',
                        duration: {days: 7},
                        slotDuration: {hours: 4}
                    },
                    timelineDan: {
                        type: 'timeline',
                        duration: {days: 2},
                        minTime: {hours: 8},
                        slotDuration: {hours: 2}
                    }
                },
                resourceColumns: [],
                selectable: true,
                selectHelper: true,
                editable: true,
                ignoreTimezone: false,
                select: this.select,
                weekNumberCalculation: 'ISO',
                firstDay: 1,
                defaultView: 'timelineWeek',
                schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
                eventClick: this.eventClick,
                eventDrop: this.eventDropOrResize,
                eventResize: this.eventDropOrResize,
                resources: this.resCollection.getResources
            }, this.options.calendarOptions);
            console.log('options koledar', options);
            this.filterR.show(this.filterView);
            this.ui.calendar.fullCalendar(options);
        },
        addResource: function (model) {

        },
        removeResource: function (model) {

        },
        resetResources: function (model) {

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
    return PlanerView;
});