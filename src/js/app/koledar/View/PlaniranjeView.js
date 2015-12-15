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
    //'./DogodekModal',
    './WizardView',
    './IzbiraRazredDogodkaView',
    './IzbiraDatumView',
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
        //DogodekModal,
        WizardView,
        IzbiraView,
        IzbiraDatumaView,
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

        var iv1 = new IzbiraView({
            model: model
        });
        
        var idv2 = new IzbiraDatumaView({
            model: model
        });

        var wizardView = new WizardView({
            content: [
                iv1,
                idv2
            ],
            nazajText: 'nazaj',
            naprejText: 'naprej',
            okText: 'potrdi',
            cancelText: 'preklici'
        });

        var zakljucek = function () {
            console.log(model);
        };

        wizardView.open(zakljucek);
    };

    PlaniranjeView.prototype.renderRazredDogodek = function (razredModel, TipDogView) {
        var dogodekModel = new Dogodki.prototype.model(razredModel.get('dogodek'));

        var self = this;
        var view = new DogodekView({
            model: dogodekModel,
            TipDogView: TipDogView,
            tipDogModel: razredModel,
            posodobiUrlNaslov: function () {
            }
        });
        view.on('save:success', function () {
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
