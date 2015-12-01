define([
    'radio',
    'i18next',
    'backbone',
    'marionette',
    'underscore',
    'jquery'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        _,
        $
        ) {

    var AktivniFiltriCollectionView = Marionette.CollectionView.extend({
        tagName:'span',
        className: 'filter-aktivni-filtri'
    });
    
    /**
     * Poskrbeli bomo da lahko nastavljamo različne viewje kot optione
     * parametri
     *      - collection : collection aktivnih vrst filtra
     *      - vrsteFiltra: collection vrst filtra
     * @param Array options
     * @returns {undefined}
     */
    AktivniFiltriCollectionView.prototype.initialize = function (options) {
        this.vrsteFiltrov = options.vrsteFiltrov;
        this.aktivneVrste = options.aktivneVrste;
        this.collection = this.aktivneVrste;
        
        this.collection.on('add remove', function(){
            this.trigger('changed:vrednosti');
        }, this);
    };
    
    /**
     * Pridobimo view ki naj bo renderiran v povezavi s posameznim modelom
     * @param {type} child
     * @returns {unresolved}
     */
    AktivniFiltriCollectionView.prototype.getChildView = function (child) {
        var model = child.get('vrstaModel');
        return model.get('AktivnaVrstaView');
    };
    
    /**
     * Metoda se kliče, ko se v childu proži "izbrane:vrednosti:filtra"
     * ob spremembi enega filtra preberemo vse vrednosti filtrov
     * @param {type} child
     * @returns {undefined}
     */
    AktivniFiltriCollectionView.prototype.onChildviewChangedVrednosti = function (child) {
        this.trigger('changed:vrednosti');
    };
    
    AktivniFiltriCollectionView.prototype.onChildviewChangeVrednosti = function (child) {
        this.trigger('change:vrednosti');
    };

    return AktivniFiltriCollectionView;
});



