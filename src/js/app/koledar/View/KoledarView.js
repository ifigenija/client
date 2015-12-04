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
    './DogodekModal',
    './DogodekFilter',
    './DogodekView',
    './KoledarFilterView',
    './VajaView',
    'formSchema!vaja',
    'app/Max/View/Toolbar',
    'fc-schedule'
], function (
        Radio,
        i18next,
        Marionette,
        _,
        $,
        tpl,
        DogodekModal,
        DogodekFilter,
        DogodekView,
        KoledarFilterView,
        VajaView,
        schemaVaja,
        Toolbar
        ) {

    var KoledarView = Marionette.LayoutView.extend({
        template: tpl,
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
        this.listenTo(this.collection, 'change', this.change);
    };

    KoledarView.prototype.onRender = function () {
        this.renderFilterView();
        this.renderToolbar();
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

    KoledarView.prototype.renderToolbar = function () {
        var groups = [[
                {
                    id: 'koledar-dodaj',
                    label: i18next.t('std.dodaj'),
                    element: 'button-trigger',
                    trigger: 'dodaj'
                }
            ]];

        var toolbarView = new Toolbar({
            buttonGroups: groups,
            listener: this,
            size: 'md'
        });

        this.toolbarR.show(toolbarView);
    };

    KoledarView.prototype.select = function (start, end, jsEvent, view) {
        var view = this.options.view;
        DogodekModal({
            zacetek: start.format(),
            konec: end.format(),
            cb: function () {
                KoledarView.prototype.onUredi.apply(view, arguments);
            }
        });
    };

    KoledarView.prototype.onDodaj = function () {
        var self = this;
        DogodekModal({
            cb: function () {
                KoledarView.prototype.onUredi.apply(self, arguments);
            }
        });
    };

    KoledarView.prototype.onUredi = function (model) {
        //model, določi url modela
        var razred = model.get('model');

        if (razred === 'vaja') {
            this.onVaja(model);
        }
    };

    KoledarView.prototype.onVaja = function (model) {
        var View = VajaView.extend({
            posodobiUrlNaslov: function () {
            }
        });
        var view = new View({
            model: model,
            schema: schemaVaja.toFormSchema().schema
        });

        var koledarView = this;

        view.on('save:success', function () {
            koledarView.ui.koledar.fullCalendar('refetchEvents');
        }, this);

        view.on('skrij', function () {
            koledarView.dogodekR.empty();
        }, this);

        koledarView.dogodekR.show(view);
    };

    KoledarView.prototype.eventClick = function (fcEvent, jsEvent, view) {
        this.renderDogodek(fcEvent, jsEvent, view);
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
});