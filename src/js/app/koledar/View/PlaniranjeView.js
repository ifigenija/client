/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone',
    'marionette',
    'app/Max/View/Toolbar',
    'template!../tpl/planiranje.tpl',
    '../Model/Dogodki',
    './KoledarView',
    './Wizard/WizardView',
    './Wizard/IzbiraRazredDogodkaView',
    './Wizard/IzbiraCasView',
    './RazmnoziView',
    './DogodekView',
    './DogodekPredstavaView',
    'template!../tpl/vaja-form.tpl',
    'template!../tpl/predstava-form.tpl',
    'template!../tpl/tehnicni-form.tpl',
    'template!../tpl/splosni-form.tpl',
    'formSchema!vaja',
    'formSchema!predstava',
    'formSchema!dogodekTehnicni',
    'formSchema!dogodekSplosni'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        Toolbar,
        tpl,
        Dogodki,
        KoledarView,
        WizardView,
        IzbiraView,
        IzbiraCasView,
        RazmnoziView,
        DogodekView,
        DogodekPredstavaView,
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
        var coll = new Dogodki();

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
        if (razred === '100s') {
            this.renderRazredDogodek(model, DogodekPredstavaView, predstavaSch, predstavaTpl);
        } else if (razred === '200s') {
            this.renderRazredDogodek(model, DogodekView, vajaSch, vajaTpl);
        } else if (razred === '300s') {
            this.renderRazredDogodek(model, null);
        } else if (razred === '400s') {
            this.renderRazredDogodek(model, DogodekView, splosniSch, splosniTpl);
        } else if (razred === '500s') {
            this.onZasedenost(model);
            this.dogodekView.on('skrij', this.onPreklici, this);

        } else if (razred === '600s') {
            this.renderRazredDogodek(model, DogodekView, tehnicniSch, tehnicniTpl);
        }
    };
    PlaniranjeView.prototype.onPreklici = function () {
        this.dogodekR.empty();
    };

    /**
     * Klik na gumb Dodaj
     * @returns {undefined}
     */
    PlaniranjeView.prototype.onDodaj = function () {
        var model = new Backbone.Model();

        var wizardView = new WizardView({
            model: model,
            defWizard: {
                views: [
                    IzbiraView,
                    IzbiraCasView
                ],
                title: i18next.t('dogodek.dodajDogodek'),
                nazajText: i18next.t('std.nazaj'),
                naprejText: i18next.t('std.naprej'),
                okText: i18next.t('std.potrdi'),
                cancelText: i18next.t('std.preklici')
            }
        });
        
        this.dogodekR.show(wizardView);
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
        
        var razmnoziView = new RazmnoziView({
            model: new Backbone.Model({
                dni: ["1", "2","3","4", "5","6", "7"],
                termini: [
                        {kratica: "dop", ime: i18next.t('Dopoldan') },
                        {kratica: "pop", ime: i18next.t('Popoldan') },
                        {kratica: "zve", ime: i18next.t('Zvečer') }
                    ]

            })
        });
           
        razmnoziView.on('preklici', function () {
            this.dogodekR.empty();
        }, this)
        razmnoziView.on('save:success', function () {
           console.log('shranjeno, posodobi dogodke');
           
        }, this) 
        this.dogodekR.show(razmnoziView);
    };

    PlaniranjeView.prototype.onZasedenost = function (model) {
        this.dogodekView = new Marionette.ItemView();
        console.log('zasedenost');
    };

    return PlaniranjeView;
});
