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

        view.on('dodaj:zasedenost', function (zacetek, konec) {
            var Model = Backbone.Model.extend({
                urlRoot: function () {
                    return baseUrl + '/rest/terminStoritve/zasedenost';
                }
            });
            var model = new Model();
            model.set('zacetek', moment(zacetek.toISOString()));
            model.set('konec', moment(konec.toISOString()));
            var wizardView = new WizardZasedenostView({
                model: model,
                viewsOptions: [
                    {},
                    {}
                ]
            });

            wizardView.on('close', function () {
                this.detailR.empty();
            }, this);

            wizardView.on('preklici', function () {
                this.detailR.empty();
            }, this);

            this.detailR.show(wizardView);

        }, this);

        this.koledarR.show(view);
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

    return PlanerZasedenostiView;
});
