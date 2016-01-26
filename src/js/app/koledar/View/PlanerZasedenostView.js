/* 
 * Licenca GPLv3
 */
define([
    'baseUrl',
    'i18next',
    'backbone',
    'moment',
    'marionette',
    'app/Max/View/Toolbar',
    '../Model/TerminiStoritve',
    './ZasedenostView',
    './ZasedenostKoledarView',
    './Wizard/WizardZasedenostView',
    'template!../tpl/planer-zasedenost.tpl'
], function (
        baseUrl,
        i18next,
        Backbone,
        moment,
        Marionette,
        Toolbar,
        TerminiStoritve,
        ZasedenostView,
        ZasedenostKoledarView,
        WizardZasedenostView,
        tpl
        ) {

    var PlanerZasedenostiView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            toolbarR: '.planer-region-toolbar-zasedenost',
            detailR: '.planer-region-detail-zasedenost',
            koledarR: '.planer-region-koledar-zasedenost'
        }
    });

    PlanerZasedenostiView.prototype.initialize = function (options) {
        this.template = options.template || this.template;
    };

    PlanerZasedenostiView.prototype.onRender = function () {
        this.renderToolbar();
        this.renderKoledar();
    };
    /**
     * izris koledarja
     * @returns {undefined}
     */
    PlanerZasedenostiView.prototype.renderKoledar = function () {
        var coll = this.collection = new TerminiStoritve();

        var view = this.koledarView = new ZasedenostKoledarView({
            collection: coll
        });

        view.on('dodaj:zasedenost', this.dodajZasedenost, this);
        view.on('uredi:zasedenost', this.urediZasedenost, this);

        this.koledarR.show(view);
    };

    PlanerZasedenostiView.prototype.urediZasedenost = function (model) {

        var Model = Backbone.Model.extend({
            urlRoot: function () {
                return baseUrl + '/rest/terminStoritve/zasedenost';
            }
        });
        var mod = new Model(model.attributes);
        var zasedenostView = new ZasedenostView({
            model: mod
        });

        zasedenostView.on('skrij', function () {
            this.detailR.empty();
            this.renderToolbar();
        }, this);
        zasedenostView.on('destroy:success', function () {
            this.detailR.empty();
            this.renderKoledar();
            this.renderToolbar();
        }, this);
        zasedenostView.on('save:success', function () {
            this.renderKoledar();
        }, this);

        this.detailR.show(zasedenostView);
        this.toolbarR.empty();
    };
    PlanerZasedenostiView.prototype.dodajZasedenost = function (zacetek, konec) {
        var Model = Backbone.Model.extend({
            urlRoot: function () {
                return baseUrl + '/rest/terminStoritve/zasedenost';
            }
        });
        var model = new Model();
        var zacetek = zacetek ? moment(zacetek.toISOString()) : moment().startOf('day');
        var konec = konec ? moment(konec.toISOString()) : moment().endOf('day');
        model.set('zacetek', zacetek);
        model.set('konec', konec);
        var wizardView = new WizardZasedenostView({
            model: model,
            viewsOptions: [
                {},
                {}
            ]
        });

        wizardView.on('close', function () {
            this.detailR.empty();
            this.renderToolbar();
        }, this);

        wizardView.on('preklici', function () {
            this.detailR.empty();
            this.renderToolbar();
        }, this);
        wizardView.on('save:success', function () {
            this.renderKoledar();
        }, this);


        this.detailR.show(wizardView);
        this.toolbarR.empty();

    };
    PlanerZasedenostiView.prototype.renderToolbar = function () {
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

    PlanerZasedenostiView.prototype.onDodaj = function () {
        this.dodajZasedenost();
    };

    return PlanerZasedenostiView;
});
