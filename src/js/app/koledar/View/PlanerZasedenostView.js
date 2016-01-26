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

    /**
     * Funkcija se kliče ko ZasedenostKoledarView proži uredi:zasedenost
     * Funkcija je odgovorna da prikaže podatke zasedenosti(terminaStoritve)
     * @param {type} model
     * @returns {undefined}
     */
    PlanerZasedenostiView.prototype.urediZasedenost = function (model) {

        //Model je terminStoritve s urlje rest/terminstoritve, kar ni vredu ko kličemo CREATE in PUT, ker ne upošteva osebe
        //preko propertija view nastavimo da pošlje na rest/terminstoritve/zasedenost
        model.view = 'zasedenost';
        var zasedenostView = new ZasedenostView({
            model: model
        });

        //zapiranje forme
        zasedenostView.on('skrij', function () {
            this.detailR.empty();
            this.renderToolbar();
        }, this);
        //zapiranje forme renderiramo koledar
        zasedenostView.on('destroy:success', function () {
            this.detailR.empty();
            this.renderKoledar();
            this.renderToolbar();
        }, this);
        //na novo renderiramo koledar
        zasedenostView.on('save:success', function () {
            this.renderKoledar();
        }, this);

        this.detailR.show(zasedenostView);
        this.toolbarR.empty();
    };
    /**
     * Funkcija se kliče ko se v zasedenostKoledarView proži dodaj:zasedenost
     * Funkcija je zadolžena da prikaže wizardZasedenostview in uporabnika vodi skozi korake dodajanja.
     * 
     * @param {type} zacetek
     * @param {type} konec
     * @returns {undefined}
     */
    PlanerZasedenostiView.prototype.dodajZasedenost = function (zacetek, konec) {

        var model = new TerminiStoritve.prototype.model();
        model.view = 'zasedenost';

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

        //ob preklicanem dodajanju se  wizard zapre
        wizardView.on('preklici', function () {
            this.detailR.empty();
            this.renderToolbar();
        }, this);
        //ob uspešno shranjenem modelu se na novo renderira koledar
        wizardView.on('save:success', function () {
            this.renderKoledar();
        }, this);

        this.detailR.show(wizardView);
        this.toolbarR.empty();

    };
    /**
     * Funkcija renderira toolbar view-a
     * @returns {undefined}
     */
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

    /**
     * Funkcija se kliče ob kliku na gumb dodaj(ko view proži dodaj)
     * @returns {undefined}
     */
    PlanerZasedenostiView.prototype.onDodaj = function () {
        this.dodajZasedenost();
    };

    return PlanerZasedenostiView;
});
