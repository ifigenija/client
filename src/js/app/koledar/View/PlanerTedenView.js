/* 
 * Licenca GPLv3
 */

define([
    'marionette',
    'backbone',
    'moment',
    'underscore',
    'jquery',
    './DogodekView',
    './VajaView',
    './PredstavaView',
    './GostovanjeView',
    './SplosniView',
    './TehnicniView',
    './PlanerDogodkiView',
    'template!../tpl/planer-dan.tpl',
    './WizardView',
    './IzbiraRazredDogodkaView',
    './IzbiraDatumView'
], function (
        Marionette,
        Backbone,
        moment,
        _,
        $,
        DogodekView,
        VajaView,
        PredstavaView,
        GostovanjeView,
        SplosniView,
        TehnicniView,
        PlanerDogodkiView,
        tplDan,
        WizardView,
        IzbiraView,
        IzbiraDatumView
        ) {

    /**
     * Prikazuje posamezni dan v planeru
     * Regije za tri dele dneva, popoldne, dopoldne, zvečer. 
     * 
     * 
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var DanView = Marionette.LayoutView.extend({
        className: 'planer-dan',
        template: tplDan,
        regions: {
            dopoldneR: '.region-dopoldne',
            popoldneR: '.region-popoldne',
            zvecerR: '.region-zvecer',
            detailR: '.region-detail'
        }
    });
    DanView.prototype.onRender = function () {
        this.renderDopoldne();
        this.renderPopoldne();
        this.renderZvecer();
    };
    DanView.prototype.renderDopoldne = function () {
        var view = this.dopoldneView = new PlanerDogodkiView({
            collection: this.model.get('dopoldne'),
            zacetek: moment(this.model.get('datum')).set('hour', 10),
            konec: moment(this.model.get('datum')).set('hour', 14)
        });
        this.bindToDogodkiView(view);
        this.dopoldneR.show(view);
    };
    DanView.prototype.renderPopoldne = function () {
        var view = this.popoldneView = new PlanerDogodkiView({
            collection: this.model.get('popoldne'),
            zacetek: moment(this.model.get('datum')).set('hour', 14),
            konec: moment(this.model.get('datum')).set('hour', 19)
        });
        this.bindToDogodkiView(view);
        this.popoldneR.show(view);
    };
    DanView.prototype.renderZvecer = function () {
        var view = this.zvecerView = new PlanerDogodkiView({
            collection: this.model.get('zvecer'),
            zacetek: moment(this.model.get('datum')).set('hour', 19),
            konec: moment(this.model.get('datum')).set('hour', 23)
        });
        this.bindToDogodkiView(view);
        this.zvecerR.show(view);
    };
    DanView.prototype.bindToDogodkiView = function (view) {
        view.on('prikazi:dogodek', this.prikaziDogodek, this);
        view.on('dodaj:dogodek', this.dodajDogodek, this);
    };
    DanView.prototype.prikaziDogodek = function (model) {
        var razred = model.get('dogodek').razred;
        var TipDogodkaView;
        if (razred === '100s') {
            TipDogodkaView = PredstavaView;
        } else if (razred === '200s') {
            TipDogodkaView = VajaView;
        } else if (razred === '300s') {
            TipDogodkaView = GostovanjeView;
        } else if (razred === '400s') {
            TipDogodkaView = SplosniView;
        } else if (razred === '500s') {
            this.onZasedenost(model);
            this.dogodekView.on('skrij', this.onPreklici, this);
        } else if (razred === '600s') {
            TipDogodkaView = TehnicniView;
        }
        var view = new DogodekView({
            model: model,
            TipDogView: TipDogodkaView,
            tipDogModel: model
        });
        view.on('skrij', function () {
            this.detailR.empty();
        }, this);
        this.detailR.show(view);
    };
    DanView.prototype.dodajDogodek = function (interval) {
        var model = new Backbone.Model();
        model.set('zacetek', moment(interval.zacetek).toISOString());
        model.set('konec', moment(interval.konec).toISOString());
        
        var view = new WizardView({
            model: model,
            defView: {
                views: [
                    IzbiraView,
                    IzbiraDatumView
                ],
                title: 'dodaj dogodek'
            }
        });

        view.on('zapri:wizard', function () {
            this.detailR.empty();
        }, this);

        view.on('preklici', function () {
            this.detailR.empty();
        }, this);

        this.detailR.show(view);
    };


    /**
     * Odgovoren je za prika kolekcije dnevov
     * za obdobje, ki ga planer trenutno obdeluje
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */

    var PlanerTedenView = Marionette.CollectionView.extend({
        childView: DanView
    });

    return PlanerTedenView;
});