/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone',
    'marionette',
    'moment',
    'app/Max/View/Toolbar',
    'template!../tpl/planiranje.tpl',
    '../Model/Dogodki',
    './KoledarView',
    './Wizard/WizardView',
    './Wizard/IzbiraRazredDogodkaView',
    './Wizard/IzbiraCasView',
    './DogodekView',
    './VajaView',
    './PredstavaView',
    './GostovanjeView',
    './SplosniView',
    './TehnicniView'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        moment,
        Toolbar,
        tpl,
        Dogodki,
        KoledarView,
        WizardView,
        IzbiraView,
        IzbiraCasView,
        DogodekView,
        VajaView,
        PredstavaView,
        GostovanjeView,
        SplosniView,
        TehnicniView
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
            this.renderRazredDogodek(model, PredstavaView);
        } else if (razred === '200s') {
            this.renderRazredDogodek(model, VajaView);
        } else if (razred === '300s') {
            this.renderRazredDogodek(model, GostovanjeView);
        } else if (razred === '400s') {
            this.renderRazredDogodek(model, SplosniView);
        } else if (razred === '500s') {
            this.onZasedenost(model);
            this.dogodekView.on('skrij', this.onPreklici, this);

        } else if (razred === '600s') {
            this.renderRazredDogodek(model, TehnicniView);
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

    PlaniranjeView.prototype.renderRazredDogodek = function (razredModel, TipDogView) {
        var dogodekModel = new Dogodki.prototype.model(razredModel.get('dogodek'));

        var self = this;
        var view = new DogodekView({
            model: dogodekModel,
            TipDogView: TipDogView,
            tipDogModel: razredModel
        });
        view.on('save:success', function () {
            self.koledarView.ui.koledar.fullCalendar('refetchEvents');
        }, self);
        
        view.on('destroy:success', function () {
            self.koledarView.ui.koledar.fullCalendar('refetchEvents');
        }, self);
        view.on('skrij', self.onPreklici, self);
        self.dogodekR.show(view);
    };

    PlaniranjeView.prototype.onZasedenost = function (model) {
        this.dogodekView = new Marionette.ItemView();
        console.log('zasedenost');
    };

    return PlaniranjeView;
});
