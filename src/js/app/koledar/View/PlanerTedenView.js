/* 
 * Licenca GPLv3
 */

define([
    'marionette',
    'underscore',
    'moment',
    './DogodekView',
    './DogodekPredstavaView',
    './DogodekGostovanjeView',
    './PlanerDogodkiView',
    './Wizard/DodajDogodekWizardView',
    'template!../tpl/planer-dan.tpl',
    'template!../tpl/vaja-form.tpl',
    'template!../tpl/predstava-form.tpl',
    'template!../tpl/gostovanje-form.tpl',
    'template!../tpl/tehnicni-form.tpl',
    'template!../tpl/splosni-form.tpl',
    'formSchema!vaja',
    'formSchema!predstava',
    'formSchema!gostovanje',
    'formSchema!dogodekTehnicni',
    'formSchema!dogodekSplosni',
    'options!dogodek.termini'
], function (
        Marionette,
        _,
        moment,
        DogodekView,
        DogodekPredstavaView,
        DogodekGostovanjeView,
        PlanerDogodkiView,
        DodajDogodekWizardView,
        tplDan,
        vajaTpl,
        predstavaTpl,
        gostovanjeTpl,
        tehnicniTpl,
        splosniTpl,
        vajaSch,
        predstavaSch,
        gostovanjeSch,
        tehnicniSch,
        splosniSch,
        termini
        ) {
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

    PlanerDanView.prototype.serializeData = function () {
        return _.extend(this.model.toJSON(), {
            danVTednu: moment(this.model.get('datum')).format('dddd')
        });
    };

    PlanerDanView.prototype.onRender = function () {
        this.renderDopoldne();
        this.renderPopoldne();
        this.renderZvecer();
    };
    PlanerDanView.prototype.renderDopoldne = function () {
        var view = this.dopoldneView = this.getDogodekView(
                this.model.get('dopoldne'),
                moment(this.model.get('datum')).set({'hour': termini.dopoldanZacetek.h, 'minute': termini.dopoldanZacetek.m}),
                moment(this.model.get('datum')).set({'hour': termini.dopoldanKonec.h, 'minute': termini.dopoldanKonec.m})
                );
        this.dopoldneR.show(view);
    };
    PlanerDanView.prototype.renderPopoldne = function () {
        var view = this.popoldneView = this.getDogodekView(
                this.model.get('popoldne'),
                moment(this.model.get('datum')).set({'hour': termini.popoldanZacetek.h, 'minute': termini.popoldanZacetek.m}),
                moment(this.model.get('datum')).set({'hour': termini.popoldanKonec.h, 'minute': termini.popoldanKonec.m})
                );
        this.popoldneR.show(view);
    };
    PlanerDanView.prototype.renderZvecer = function () {
        var view = this.zvecerView = this.getDogodekView(
                this.model.get('zvecer'),
                moment(this.model.get('datum')).set({'hour': termini.vecerZacetek.h, 'minute': termini.vecerZacetek.m}),
                moment(this.model.get('datum')).set({'hour': termini.vecerKonec.h, 'minute': termini.vecerKonec.m})
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
     * @param {RazredDogodek} model
     * @returns {undefined}
     */
    PlanerDanView.prototype.urediDogodek = function (model) {
        var razred = model.get('dogodek').razred;
        var TipDogodkaView = DogodekView, schema, tpl;

        switch (razred) {
            case '100s':
                TipDogodkaView = DogodekPredstavaView;
                schema = predstavaSch;
                tpl = predstavaTpl;
                break;
            case '200s':
                schema = vajaSch;
                tpl = vajaTpl;
                break;
            case '300s':
                TipDogodkaView = DogodekGostovanjeView;
                schema = gostovanjeSch;
                tpl = gostovanjeTpl;
                break;
            case '400s':
                schema = splosniSch;
                tpl = splosniTpl;
                break;
            case '600s':
                schema = tehnicniSch;
                tpl = tehnicniTpl;
                break;
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
        var dodajDogodekView = new DodajDogodekWizardView({
            zacetek: options.zacetek,
            konec: options.konec,
            collection: options.collection
        });
        this.detailR.show(dodajDogodekView);
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