/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhnodni podatki:
 *      vrste filtrov
 *      prednastavljeni filter
 *      {
 *      vrsta1:{ids:{}},
 *      vrsta2:{ids:{}}
 *      }
 *
 * Prikaz vrst filtrov
 * toolbar z gumboma dodaj vrsto filtra in ponastavi filtre
 * 
 * Izhodni podatki:
 *      {
 *      vrsta1:{ids:{}},
 *      vrsta2:{ids:{}}
 *      }
 */

define([
    'radio',
    'i18next',
    'backbone',
    'underscore',
    'marionette',
    'jquery',
    'template!../tpl/filter.tpl',
    '../Model/VrstaCollection',
    '../Model/AktivnaVrstaCollection'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Marionette,
        $,
        tpl,
        Vrsta,
        AktivnaVrsta
        ) {

    var FilterView = Marionette.CompositeView.extend({
        template: tpl,
        className: 'filter-select',
        childViewContainer: '.region-vrste-filtra',
        triggers: {
            'click .vrsta-filtra-dodaj': 'dodaj',
            'click .vrsta-filtra-reset': 'ponastavi'
        }
    });

    /**
     * Poskrbeli bomo da lahko nastavljamo različne viewje kot optione
     * parametri
     *      - collection : collection aktivnih vrst filtra
     *      - vrsteFiltra: collection vrst filtra
     * @param Array options
     * @returns {undefined}
     */
    FilterView.prototype.initialize = function (options) {
        this.template = options.template || this.template;

        this.vrsteFiltrov = new Vrsta(null, {
            vrsteFiltrov: options.vrsteFiltrov
        });

        this.aktivneVrste = new AktivnaVrsta(null, {
            aktivneVrste: options.aktivneVrste,
            vrsteFiltrov: this.vrsteFiltrov
        });


        this.collection = this.aktivneVrste;
        this.ponastavitev = this.aktivneVrste.clone();
    };

    /**
     * Pridobimo view ki naj bo renderiran v povezavi s posameznim modelom
     * @param {type} child
     * @returns {unresolved}
     */
    FilterView.prototype.getChildView = function (child) {
        var model = child.get('vrstaModel');
        return model.get('AktivnaVrstaView');
    };

    /**
     * Ob kliku na gumb dodaj odpremo view za izbiranje filtra
     * @returns {undefined}
     */
    FilterView.prototype.onDodaj = function () {
        this.dodajAktivnoVrsto(this.vrsteFiltrov.models[0]);
        this.renderIzbiraFiltra();
    };

/**
 * render Viewja ki je zadolžen za izbiro novega filtra
 * @returns {undefined}
 */
    FilterView.prototype.renderIzbiraFiltra = function () {
        this.render();
    };

    /**
     * Ko dodajamo nov aktivni model podamo še model definicij vrste filtra
     * @param Model model
     * @returns {undefined}
     */
    FilterView.prototype.dodajAktivnoVrsto = function (model) {
        this.collection.add({
            izbrani: new Backbone.Collection(),
            vrstaModel: model,
            vrsta: model.get('vrsta')
        });
    };

    /**
     * Metoda se kliče, ko se v childu proži "izbrane:vrednosti:filtra"
     * ob spremembi enega filtra preberemo vse vrednosti filtrov
     * @param {type} child
     * @returns {undefined}
     */
    FilterView.prototype.onChildviewIzbraneVrednostiFiltra = function (child) {
        var vrednostiFiltra = this.getVrednostiAktivnihFiltrov();
        this.trigger('posodobljene:vrednosti:filtrov');
    };

    /**
     * Vrne Vse nastavljene vrednosti aktivnih vrst filtrov
     * @param {type} child
     * @returns {FilterView_L34.FilterView.prototype@pro;aktivneVrste@call;getVrednostiFiltrov}
     */
    FilterView.prototype.getVrednostiAktivnihFiltrov = function (child) {
        return this.aktivneVrste.getVrednostiFiltrov();
    };


    /**
     * zamenjamo collection viewja s podatki ki smo jih dobili ob inicializaciji
     * @returns {undefined}
     */
    FilterView.prototype.onPonastavi = function () {
        this.collection = this.ponastavitev.clone();
        this.render();
    };

    return FilterView;
});