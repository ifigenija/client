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

        var uraZacetek = 10;
        var uraDopoldne = 14;
        var uraPopoldne = 19;
        var uraZvecer = 23;
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
        var view = this.dopoldneView = this.getDogodekView(
            this.model.get('dopoldne'),
            moment(this.model.get('datum')).set('hour', uraZacetek),
            moment(this.model.get('datum')).set('hour', uraDopoldne)
        );
        this.dopoldneR.show(view);
    };
    DanView.prototype.renderPopoldne = function () {
        var view = this.popoldneView = this.getDogodekView(
            this.model.get('popoldne'),
            moment(this.model.get('datum')).set('hour', uraDopoldne),
            moment(this.model.get('datum')).set('hour', uraPopoldne)
        );
        this.popoldneR.show(view);
    };
    DanView.prototype.renderZvecer = function () {
        var view = this.zvecerView = this.getDogodekView(
            this.model.get('zvecer'),
            moment(this.model.get('datum')).set('hour', uraPopoldne),
            moment(this.model.get('datum')).set('hour', uraZvecer)
        );
        this.zvecerR.show(view);
    };
    DanView.prototype.getDogodekView = function (collection, zacetek, konec) {
        var view = new PlanerDogodkiView({
            collection: collection,
            zacetek: zacetek,
            konec: konec
        });
        
        view.on('prikazi:dogodek', this.prikaziDogodek, this);
        view.on('dodaj:dogodek', this.dodajDogodek, this);
        
        return view;
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
        className: 'planer-teden',
        childView: DanView
    });

    return PlanerTedenView;
});