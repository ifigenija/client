/* 
 * Licenca GPLv3
 */

define([
    'i18next',
    'marionette',
    'backbone',
    'moment',
    'underscore',
    'jquery',
    '../Model/Dogodki',
    './DogodekView',
    './DogodekPredstavaView',
    './PlanerDogodkiView',
    'template!../tpl/planer-dan.tpl',
    './Wizard/WizardVajaView',
    './Wizard/WizardTehSploView',
    './Wizard/WizardZasedenostView',
    './Wizard/WizardPredstavaView',
    './Wizard/IzbiraRazredDogodkaView',
    'template!../tpl/vaja-form.tpl',
    'template!../tpl/predstava-form.tpl',
    'template!../tpl/tehnicni-form.tpl',
    'template!../tpl/splosni-form.tpl',
    'formSchema!vaja',
    'formSchema!predstava',
    'formSchema!dogodekTehnicni',
    'formSchema!dogodekSplosni'
], function (
        i18next,
        Marionette,
        Backbone,
        moment,
        _,
        $,
        Dogodki,
        DogodekView,
        DogodekPredstavaView,
        PlanerDogodkiView,
        tplDan,
        WizardVajaView,
        WizardTehSploView,
        WizardZasedenostView,
        WizardPredstavaView,
        IzbiraRazredDogodkaView,
        vajaTpl,
        predstavaTpl,
        tehnicniTpl,
        splosniTpl,
        vajaSch,
        predstavaSch,
        tehnicniSch,
        splosniSch
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
    var PlanerDanView = Marionette.LayoutView.extend({
        className: 'planer-dan',
        template: tplDan,
        regions: {
            dopoldneR: '.region-dopoldne',
            popoldneR: '.region-popoldne',
            zvecerR: '.region-zvecer',
            detailR: '.region-detail'
        }
    });
    PlanerDanView.prototype.onRender = function () {
        this.renderDopoldne();
        this.renderPopoldne();
        this.renderZvecer();
    };
    PlanerDanView.prototype.renderDopoldne = function () {
        var view = this.dopoldneView = this.getDogodekView(
                this.model.get('dopoldne'),
                moment(this.model.get('datum')).set('hour', uraZacetek),
                moment(this.model.get('datum')).set('hour', uraDopoldne)
                );
        this.dopoldneR.show(view);
    };
    PlanerDanView.prototype.renderPopoldne = function () {
        var view = this.popoldneView = this.getDogodekView(
                this.model.get('popoldne'),
                moment(this.model.get('datum')).set('hour', uraDopoldne),
                moment(this.model.get('datum')).set('hour', uraPopoldne)
                );
        this.popoldneR.show(view);
    };
    PlanerDanView.prototype.renderZvecer = function () {
        var view = this.zvecerView = this.getDogodekView(
                this.model.get('zvecer'),
                moment(this.model.get('datum')).set('hour', uraPopoldne),
                moment(this.model.get('datum')).set('hour', uraZvecer)
                );
        this.zvecerR.show(view);
    };
    /**
     * inicializiramo instanco viewja za prikaz dogodkov enega termina
     * @param {Backbone.Collection} collection
     * @param {moment} zacetek
     * @param {moment} konec
     * @returns {PlanerTedenView_L22.PlanerDogodkiView|Marionette.LayoutView@call;extend.prototype.getDogodekView.view}
     */
    PlanerDanView.prototype.getDogodekView = function (collection, zacetek, konec) {
        var view = new PlanerDogodkiView({
            collection: collection,
            zacetek: zacetek,
            konec: konec
        });

        view.on('prikazi:dogodek', this.urediDogodek, this);
        view.on('dodaj:dogodek', this.dodajDogodek, this);

        return view;
    };
    /**
     * Izris dogodka s podanim modelo
     * @param {Dogodek} model
     * @returns {undefined}
     */
    PlanerDanView.prototype.urediDogodek = function (model) {
        var razred = model.get('dogodek').razred;
        var TipDogodkaView, schema, tpl;
        if (razred === '100s') {
            TipDogodkaView = DogodekPredstavaView;
            schema = predstavaSch;
            tpl = predstavaTpl;
        } else if (razred === '200s') {
            TipDogodkaView = DogodekView;
            schema = vajaSch;
            tpl = vajaTpl;
        } else if (razred === '300s') {
            TipDogodkaView = null;
        } else if (razred === '400s') {
            TipDogodkaView = DogodekView;
            schema = splosniSch;
            tpl = splosniTpl;
        } else if (razred === '500s') {
            this.onZasedenost(model);
            this.dogodekView.on('skrij', this.onPreklici, this);
        } else if (razred === '600s') {
            TipDogodkaView = DogodekView;
            schema = tehnicniSch;
            tpl = tehnicniTpl;
        }
        //model forme, ki je pogojena od dokumentview mora biti dogodek model
        //tipDogModel pa je morel razreda dogodka
        var view = new TipDogodkaView({
            model: model,
            schema: schema.toFormSchema().schema,
            formTemplate: tpl
        });
        view.on('skrij', function () {
            this.detailR.empty();
        }, this);
        this.detailR.show(view);
    };
    /**
     * Dodaj dogodek, vsak od razredov dogodka potrebuje svoj Wizard View
     * @param {type} options
     * @returns {undefined}
     */
    PlanerDanView.prototype.dodajDogodek = function (options) {
        var model = new Backbone.Model();
        model.set('zacetek', moment(options.zacetek).toISOString());
        model.set('konec', moment(options.konec).toISOString());

        var view = new IzbiraRazredDogodkaView({model: model});
        this.detailR.show(view);
        var self = this;

        view.on('izbrano', function (model) {
            var wizardView;
            if (model.get('razred') === '100s') {
                wizardView = new WizardPredstavaView({
                    model: model
                });
            } else if (model.get('razred') === '200s') {
                wizardView = new WizardVajaView({
                    model: model
                });
            } else if (model.get('razred') === '300s') {

            } else if (model.get('razred') === '400s') {
                wizardView = new WizardTehSploView({
                    model: model
                });
            } else if (model.get('razred') === '500s') {
                wizardView = new WizardZasedenostView({
                    model: model
                });
            } else if (model.get('razred') === '600s') {
                wizardView = new WizardTehSploView({
                    model: model
                });
            }

            wizardView.on('close', function () {
                self.detailR.empty();
            }, self);

            wizardView.on('preklici', function () {
                self.detailR.empty();
            }, self);
            wizardView.on('save:success', function (model) {
                options.collection.add(model);
            }, self);

            self.detailR.show(wizardView);
        }, this);
    };


    /**
     * Odgovoren je za prika kolekcije dnevov
     * za obdobje, ki ga planer trenutno obdeluje
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */

    var PlanerTedenView = Marionette.CollectionView.extend({
        className: 'planer-teden',
        childView: PlanerDanView
    });

    return PlanerTedenView;
});