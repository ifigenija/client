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
    '../Model/VrstaCollection'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Marionette,
        $,
        tpl,
        Vrsta
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
        this.vrsteFiltrov = this.getVrsteFiltrov(options.vrsteFiltrov) || null;
        this.aktivneVrste = this.getAktivneVrste(options.aktivneVrste) || null;
    };

    /**
     * 
     * @param {Array,Collection} vrste
     * @returns Collection
     */
    FilterView.prototype.getVrsteFiltrov = function (vrste) {
        var coll = new Backbone.Collection();

        if (_.isArray(vrste)) {
            coll = this._arrayToCollection(vrste);
        } else if (vrste instanceof Backbone.Collection) {
            coll = vrste;
        }
        return coll;
    };

    FilterView.prototype._arrayToCollection = function (array) {
        var collection = new Vrsta();
        _.each(array, function (vrsta) {
            collection.add(vrsta);
        }, this);

        return collection;
    };

    FilterView.prototype.getChildView = function (item) {
        var model = item.get('modelMozni');
        return model.get('VrstaFiltraView');
    };

    FilterView.prototype.onDodaj = function () {
        console.log('dodaj');
    };

    FilterView.prototype.dodajAktivnoVrsto = function (model) {
        this.collection.add({
            collIzbrani: model.get('podatki').collIzbrani,
            modelMozni: model
        });
    };

    FilterView.prototype.onPonastavi = function () {
        console.log('ponastavi');
    };

    return FilterView;
});



