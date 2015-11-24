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

//        this.vrsteFiltrov = new Vrsta(null, {
//            vrsteFiltrov: options.vrsteFiltrov
//        });
//
//        this.aktivneVrste = new AktivnaVrsta(null, {
//            aktivneVrste: options.aktivneVrste
//        });

        if (options.vrsteFiltrov) {
            this.vrsteFiltrov = this.getVrsteFiltrov(options.vrsteFiltrov);
        } else {
            this.vrsteFiltrov = new Backbone.Collection();
        }
        if (options.aktivneVrste) {
            this.aktivneVrste = this.getAktivneVrste(options.aktivneVrste);
        } else {
            this.aktivneVrste = new Backbone.Collection();
        }
        

        this.collection = this.aktivneVrste;
        this.ponastavitev = this.aktivneVrste.clone();
    };

    /**
     * V primeru da je aktivna vrsta array ga pretvorimo vcollection in določimo referenco na definicijo vrstefiltra
     * @param {Array,Collection} AVrsta
     * @returns Collection
     */
    FilterView.prototype.getAktivneVrste = function (aVrsta) {
        var coll;
        if (_.isArray(aVrsta)) {
            coll = this._arrayToCollection(aVrsta, AktivnaVrsta);
        } else if (aVrsta instanceof Backbone.Collection) {
            coll = aVrsta;
        }
        if (coll) {
            this.dolociVrsto(coll);
        }
        return coll;
    };

    /**
     * Pogledamo kakšne vrste je aktivni filter in poiščemo definicijo tega filtra med vrstamiFiltrov.
     * V kolikor bo vrsta nedoločena lahko v model vstavimo vrstaModel in se bodp od tam brale definicije
     * @param {type} coll
     * @returns {undefined}
     */
    FilterView.prototype.dolociVrsto = function (coll) {
        var self = this;
        //pogledamo vrsto modela
        coll.each(function (model) {
            var vrsta = model.get('vrsta');
            //v primeru da ni nedoločena poiščemo definicijo vrste v coll vrsteFiltra
            if (vrsta !== 'nedoloceno') {
                self.vrsteFiltrov.each(function (vModel) {
                    if (vModel.get('id') === vrsta) {
                        model.set('vrstaModel', vModel);
                    }
                });
            }
        });
        
        return coll;
    };

    /**
     * Iz arraya pretvorimo v collection
     * @param {Array,Collection} vrste
     * @returns Collection
     */
    FilterView.prototype.getVrsteFiltrov = function (vrste) {
        var coll;
        if (_.isArray(vrste)) {
            coll = this._arrayToCollection(vrste, Vrsta);
        } else if (vrste instanceof Backbone.Collection) {
            coll = vrste;
        }
        return coll;
    };

    /**
     * Array pretvorimo v collection
     * @param {type} array
     * @param {type} Coll
     * @returns {FilterView_L34.FilterView.prototype._arrayToCollection.Coll|Marionette.CompositeView@call;extend.prototype._arrayToCollection.collection}
     */
    FilterView.prototype._arrayToCollection = function (array, Coll) {
        var collection = new Coll();
        _.each(array, function (vrsta) {
            collection.add(vrsta);
        }, this);

        return collection;
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

    FilterView.prototype.onDodaj = function () {
        this.dodajAktivnoVrsto(this.vrsteFiltrov.models[0]);
        this.render();
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
     * Ko dodajamo nov aktivni model podamo še model definicij vrste filtra
     * @param Model model
     * @returns {undefined}
     */
    FilterView.prototype.dodajAktivnoVrsto = function (model) {
        this.collection.add({
            izbrani: new Backbone.Collection(),
            vrstaModel: model,
            vrsta: model.get('id')
        });
    };

    FilterView.prototype.onPonastavi = function () {
        this.collection = this.ponastavitev.clone();
        this.render();
    };

    return FilterView;
});



