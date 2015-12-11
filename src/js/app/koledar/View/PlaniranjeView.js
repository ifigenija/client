/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'marionette',
    'moment',
    'app/Max/View/Toolbar',
    'template!../tpl/planiranje.tpl',
    '../Model/Dogodki',
    '../Model/Dogodek',
    '../Model/TerminiStoritev',
    './KoledarView',
    './DogodekModal',
    './DogodekView',
    './VajaView',
    'formSchema!dogodek',
    'jquery.jsonrpc'
], function (
        Radio,
        i18next,
        Marionette,
        moment,
        Toolbar,
        tpl,
        Dogodki,
        Dogodek,
        TerminiStoritev,
        KoledarView,
        DogodekModal,
        DogodekView,
        VajaView,
        schemaDogodek
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
        var razred = model.get('razred');

        if (model instanceof Dogodki.prototype.model) {
            if (razred === '100s') {
            } else if (razred === '200s') {
                this.onVaja(model);
            } else if (razred === '300s') {

            } else if (razred === '400s') {

            } else if (razred === '500s') {

            } else if (razred === '600s') {

            }
        } else if (model instanceof TerminiStoritev.prototype.model) {
            this.onZasedenost(model);
            this.dogodekView.on('skrij', this.onPreklici, this);
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
        var self = this;

        DogodekModal({
            zacetek: moment(),
            konec: moment(),
            cb: function () {
                self.onUredi.apply(self, arguments);
            }
        });
    };

    PlaniranjeView.prototype.onVaja = function (model) {
        var vajaModel = new Dogodek({
            id: model.get('vaja'),
            view: 'vaja'
        });
        var self = this;
        vajaModel.fetch({
            success: function () {
                var view = new DogodekView({
                    model: model,
                    TipDogView: VajaView,
                    tipDogModel: vajaModel,
                    posodobiUrlNaslov: function () {
                    }
                });
                view.on('save:success', function () {
                    self.koledarView.ui.koledar.fullCalendar('refetchEvents');
                }, self);
                view.on('skrij', self.onPreklici, self);
                self.dogodekR.show(view);
            }
        });
    };

    PlaniranjeView.prototype.onZasedenost = function (model) {
        this.dogodekView = new Marionette.ItemView();
        console.log('zasedenost');
    };

    return PlaniranjeView;
});
