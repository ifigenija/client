/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'moment',
    '../Model/TerminiStoritve',
    './ZasedenostView',
    './KoledarZasedenostView',
    './Wizard/WizardZasedenostView',
    './PregledView'
], function (
        i18next,
        moment,
        TerminiStoritve,
        ZasedenostView,
        KoledarZasedenostView,
        WizardZasedenostView,
        PregledView
        ) {

    var PregledZasedenostiView = PregledView.extend({
        title: i18next.t('koledar.zasedenost'),
        KoledarView: KoledarZasedenostView
    });

    /**
     * Funkcija se kliče ko KoledarZasedenostView proži uredi:zasedenost
     * Funkcija je odgovorna da prikaže podatke zasedenosti(terminaStoritve)
     * @param {type} model
     * @returns {undefined}
     */
    PregledZasedenostiView.prototype.urediEvent = function (model) {

        //Model je terminStoritve s urlje rest/terminstoritve, kar ni vredu ko kličemo CREATE in PUT, ker ne upošteva osebe
        //preko propertija view nastavimo da pošlje na rest/terminstoritve/zasedenost
        model.view = 'zasedenost';
        var zasedenostView = new ZasedenostView({
            model: model
        });

        //zapiranje forme
        zasedenostView.on('skrij', function () {
            this.contentR.empty();
            this.renderToolbar();
        }, this);
        //zapiranje forme renderiramo koledar
        zasedenostView.on('destroy:success', function () {
            this.contentR.empty();
            this.renderKoledar();
            this.renderToolbar();
        }, this);
        //na novo renderiramo koledar
        zasedenostView.on('save:success', function () {
            this.renderKoledar();
        }, this);

        this.contentR.show(zasedenostView);
        this.toolbarR.empty();
    };
    /**
     * Funkcija se kliče ko se v KoledarZasedenostView proži dodaj:zasedenost
     * Funkcija je zadolžena da prikaže wizardZasedenostview in uporabnika vodi skozi korake dodajanja.
     * 
     * @param {type} zacetek
     * @param {type} konec
     * @returns {undefined}
     */
    PregledZasedenostiView.prototype.dodajEvent = function (zacetek, konec) {

        var model = new TerminiStoritve.prototype.model();
        model.view = 'zasedenost';

        var zacetekE = zacetek ? moment(zacetek.toISOString()) : moment().startOf('day');
        var konecE = konec ? moment(konec.toISOString()) : moment().endOf('day');
        model.set('zacetek', zacetekE);
        model.set('konec', konecE);
        var wizardView = new WizardZasedenostView({
            model: model,
            viewsOptions: [
                {},
                {}
            ]
        });

        //ob preklicanem dodajanju se  wizard zapre
        wizardView.on('preklici', function () {
            this.contentR.empty();
            this.renderToolbar();
        }, this);
        //ob uspešno shranjenem modelu se na novo renderira koledar
        wizardView.on('save:success', function () {
            this.renderKoledar();
            this.contentR.empty();
        }, this);

        this.contentR.show(wizardView);
        this.toolbarR.empty();
    };

    /**
     * Funkcija se kliče ob kliku na gumb dodaj(ko view proži dodaj)
     * @returns {undefined}
     */
    PregledZasedenostiView.prototype.onDodaj = function () {
        this.dodajEvent(moment(), moment().add('hours', 1));
    };

    return PregledZasedenostiView;
});
