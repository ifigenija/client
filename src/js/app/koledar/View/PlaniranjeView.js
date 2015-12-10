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
        VajaView
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

        view.on('prikazi:dogodek', this.onUredi, this);

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
            this.dogodekView.on('skrij', this.onPreklici, this);
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
        var model = new Dogodek({
            id: model.get('vaja'),
            view: 'vaja'
        });
        
        model.fetch({
            success: function () {
                var view = DogodekView({
                    model: model,
                    TipDogView: VajaView,
                    tipDogModel: model,
                    posodobiUrlNaslov: function () {
                    }
                });
                view.on('save:success', function () {
                    this.koledarView.ui.koledar.fullCalendar('refetchEvents');
                }, this);
                this.dogodekR.show(view);
            }
        });
    };

    PlaniranjeView.prototype.onZasedenost = function (model) {
        this.dogodekView = new Marionette.ItemView();
        console.log('zasedenost');
    };

    return PlaniranjeView;
});
