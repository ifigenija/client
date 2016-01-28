/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'marionette',
    'underscore',
    'app/Max/View/Toolbar',
    'template!../tpl/urnik-layout-prostor.tpl',
    '../Model/KoledarLookup',
    'fullcalendar',
    'fc-schedule'
], function (
        Radio,
        i18next,
        Marionette,
        _,
        Toolbar,
        tpl,
        KoledarLookup
        ) {

    var UrnikProstorView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'urnik-prostor',
        regions: {
            toolbarR: '.urnik-toolbar'
        },
        ui: {
            'koledar': '.urnik-container-prostor'
        },
        naslov: i18next.t('urnik.dogodkiProstori')
    });

    UrnikProstorView.prototype.serializeData = function (options) {
        return{
            naslov: this.naslov
        };
    };

    UrnikProstorView.prototype.initialize = function (options) {
        this.datum = options.datum;
        this.dogodek = options.dogodek;
        this.naslov = options.naslov || this.naslov;
    };

    UrnikProstorView.prototype.renderToolbar = function () {
        var groups = [[
                {
                    id: 'urnik-zapri',
                    label: i18next.t('std.zapri'),
                    element: 'button-trigger',
                    trigger: 'zapri:urnik'
                }
            ]];

        var toolbarView = new Toolbar({
            buttonGroups: groups,
            listener: this
        });

        this.toolbarR.show(toolbarView);
    };

    UrnikProstorView.prototype.onRender = function () {
        this.renderToolbar();

        var self = this;
        var options = {
            view: self,
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'timelineDay,timelineTwoDays,timelineThreeDays'
            },
            views: {
                timelineTwoDays: {
                    type: 'timeline',
                    duration: {days: 2},
                    buttonText: i18next.t('koledar.dvaDni')
                },
                timelineThreeDays: {
                    type: 'timeline',
                    duration: {days: 3},
                    buttonText: i18next.t('koledar.triDni')
                }
            },
            height: 'auto',
            selectHelper: true,
            editable: true,
            lang: 'sl',
            now: this.datum,
            minTime: "06:00:00",
            scrollTime: "10:00:00",
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
                        var resources = collection.getResources();
                        resources.push({
                            label: i18next.t('std.neuvrsceni'),
                            id: '0'
                        });
                        callback(resources);
                    },
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            },
            eventSources: [
                {
                    events: function (zacetek, konec, timezone, callback) {
                        self.collection.queryParams.zacetek = zacetek.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        self.collection.queryParams.konec = konec.format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ');
                        self.collection.fetch({
                            success: function (coll) {
                                coll.remove(coll.where({id: self.dogodek.get('id')}));
                                callback(coll.getEventObjects());
                            },
                            error: Radio.channel('error').request('handler', 'xhr')
                        });
                    },
                    editable: false,
                    color: 'red',
                    className: 'background-event'
                },
                {
                    events: function (zacetek, konec, timezone, callback) {
                        var podatki = [];
                        podatki.push(self.dogodek.getEventObject());
                        callback(podatki);
                    },
                    dogodek: self.dogodek
                }
            ],
            eventClick: this.eventClick,
            eventDrop: this.eventDropOrResize,
            eventResize: this.eventDropOrResize,
            eventMouseover: this.eventMouseOver
        };
        setTimeout(function () {
            self.ui.koledar.fullCalendar(options);
        }, 200);
    };

    UrnikProstorView.prototype.eventDropOrResize = function (fcEvent, delta, revert, jsEvent, ui, view) {
        //dogodki preko rest put z novim začetkom in koncem
        var model = fcEvent.source.dogodek;
        model.save({zacetek: fcEvent.start.toISOString(), konec: fcEvent.end.toISOString(), prostor: fcEvent.resourceId}, {
            error: function (model, xhr) {
                revert();
                Radio.channel('error').command('xhr', model, xhr);
            }
        });
    };


    return UrnikProstorView;
});
