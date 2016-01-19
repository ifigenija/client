/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'backbone',
    'marionette',
    'app/Max/View/Toolbar',
    'template!../tpl/planiranje.tpl',
    '../Model/Dogodki',
    './KoledarView',
    './Wizard/WizardVajaView',
    './Wizard/WizardTehSploView',
    './Wizard/WizardPredstavaView',
    './Wizard/IzbiraRazredDogodkaView',
    '../Model/OptionsProstorTipVaje',
    './RazmnoziView',
    './DogodekView',
    'template!../tpl/vaja-form.tpl',
    'template!../tpl/predstava-form.tpl',
    'template!../tpl/tehnicni-form.tpl',
    'template!../tpl/splosni-form.tpl',
    'formSchema!vaja',
    'formSchema!predstava',
    'formSchema!dogodekTehnicni',
    'formSchema!dogodekSplosni'
], function (
        i18next,
        Backbone,
        Marionette,
        Toolbar,
        tpl,
        Dogodki,
        KoledarView,
        WizardVajaView,
        WizardTehSploView,
        WizardPredstavaView,
        IzbiraRazredDogodkaView,
        optionsProstorTipVaje,
        RazmnoziView,
        DogodekView,
        vajaTpl,
        predstavaTpl,
        tehnicniTpl,
        splosniTpl,
        vajaSch,
        predstavaSch,
        tehnicniSch,
        splosniSch
        ) {

    var PlaniranjeView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            dogodekR: '.planiranje-region-dogodek',
            koledarR: '.planiranje-region-koledar',
            toolbarR: '.planiranje-region-toolbar'
        }
    });

    PlaniranjeView.prototype.initialize = function (options) {
        this.template = options.template || this.template;
    };

    PlaniranjeView.prototype.onRender = function () {
        this.renderKoledar();
        this.renderToolbar();
    };
    /**
     * izris koledarja
     * @returns {undefined}
     */
    PlaniranjeView.prototype.renderKoledar = function () {
        var coll = this.collection = new Dogodki();

        var view = this.koledarView = new KoledarView({
            collection: coll
        });

        view.on('prikazi:dogodek', this.prikaziDogodek, this);

        this.koledarR.show(view);
    };

    PlaniranjeView.prototype.renderToolbar = function () {
        var groups = [[
                {
                    id: 'planiranje-dodaj',
                    label: i18next.t('std.dodaj'),
                    element: 'button-trigger',
                    trigger: 'dodaj'
                }
            ]];

        var toolbarView = new Toolbar({
            buttonGroups: groups,
            listener: this
        });

        this.toolbarR.show(toolbarView);
    };

    PlaniranjeView.prototype.prikaziDogodek = function (model) {
        this.koledarView.ui.koledar.fullCalendar('refetchEvents');
        this.onUredi(model);
    };

    /**
     * Vhodni parameter model je razredDogodka
     * @param {type} model
     * @returns {undefined}
     */
    PlaniranjeView.prototype.onUredi = function (model) {
        var razred = model.get('dogodek').razred;

        switch (razred) {
            case '100s':
                this.renderRazredDogodek(model, DogodekView, predstavaSch, predstavaTpl);
                break;
            case '200s':
                this.renderRazredDogodek(model, DogodekView, vajaSch, vajaTpl);
                break;
            case '300s':
                this.renderRazredDogodek(model, null);
                break;
            case '400s':
                this.renderRazredDogodek(model, DogodekView, splosniSch, splosniTpl);
                break;
            case '500s':
                this.onZasedenost(model);
                this.dogodekView.on('skrij', this.onPreklici, this);
                break;
            case '600s':
                this.renderRazredDogodek(model, DogodekView, tehnicniSch, tehnicniTpl);
                break;
        }
    }
    ;
    PlaniranjeView.prototype.onPreklici = function () {
        this.dogodekR.empty();
    };

    /**
     * Klik na gumb Dodaj
     * @returns {undefined}
     */
    PlaniranjeView.prototype.onDodaj = function () {
        var model = new Backbone.Model();

        var self = this;
        var izbiraView = new IzbiraRazredDogodkaView({model: model});
        izbiraView.on('preklici', function () {
            this.dogodekR.empty();
        }, this);

        izbiraView.on('izbrano', function (model) {
            optionsProstorTipVaje(function (prostori, tipiVaj) {
                var wizardView;
                var razred = model.get('razred');
                switch (razred) {
                    case '100s':
                        wizardView = new WizardPredstavaView({
                            model: model,
                            viewsOptions: [
                                {},
                                {},
                                {schemaOptions: prostori}
                            ]
                        });
                        break;
                    case '200s':
                        wizardView = new WizardVajaView({
                            model: model,
                            viewsOptions: [
                                {},
                                {},
                                {schemaOptions: tipiVaj},
                                {schemaOptions: prostori}
                            ]
                        });
                        break;
                    case '300s':
                        break;
                    case '400s':
                        wizardView = new WizardTehSploView({
                            model: model,
                            viewsOptions: [
                                {},
                                {},
                                {schemaOptions: prostori}
                            ]
                        });
                        break;
                    case '600s':
                        wizardView = new WizardTehSploView({
                            model: model,
                            viewsOptions: [
                                {},
                                {},
                                {schemaOptions: prostori}
                            ]
                        });
                        break;
                }

                wizardView.on('close', function () {
                    self.dogodekR.empty();
                }, self);

                wizardView.on('preklici', function () {
                    self.dogodekR.empty();
                }, self);
                wizardView.on('save:success', function (model) {
                    self.collection.add(model);
                }, self);

                self.dogodekR.show(wizardView);
            });
        }, this);

        this.dogodekR.show(izbiraView);
    };

    PlaniranjeView.prototype.renderRazredDogodek = function (razredModel, TipDogView, schema, tpl) {
        var self = this;
        var view = new TipDogView({
            model: razredModel,
            schema: schema.toFormSchema().schema,
            formTemplate: tpl
        });

        //view.setButtons();

        //console.log('(a) new DogodekView');
        //console.log('view.model', view.model);
        //console.log('view.model -> status', view.model.get('status'));

        view.on('save:success', function () {
            self.koledarView.ui.koledar.fullCalendar('refetchEvents');
        }, self);

        view.on('destroy:success', function () {
            self.koledarView.ui.koledar.fullCalendar('refetchEvents');
        }, self);
        view.on('skrij', self.onPreklici, self);
        self.dogodekR.show(view);

        view.on('razmnozi', function () {

            self.renderRazmnozi();
        }, self);
    };


    PlaniranjeView.prototype.renderRazmnozi = function () {

        //console.log('ID dogodka: ', this.dogodekR.currentView.model.id );
        var idDogodka = this.dogodekR.currentView.model.id;

        var razmnoziView = new RazmnoziView({
            model: new Backbone.Model({
                id: idDogodka,
                dni: ["1", "2", "3", "4", "5", "6", "7"],
                termini: [
                    {kratica: "dop", ime: i18next.t('Dopoldan')},
                    {kratica: "pop", ime: i18next.t('Popoldan')},
                    {kratica: "zve", ime: i18next.t('Zvečer')}
                ]
            })
        });

        razmnoziView.on('preklici', function () {
            this.dogodekR.empty();
        }, this);
        razmnoziView.on('save:success', function () {
            console.log('shranjeno, posodobi dogodke');

        }, this);
        this.dogodekR.show(razmnoziView);
    };

    PlaniranjeView.prototype.onZasedenost = function (model) {
        this.dogodekView = new Marionette.ItemView();
        console.log('zasedenost');
    };

    return PlaniranjeView;
});
