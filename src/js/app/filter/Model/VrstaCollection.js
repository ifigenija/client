define([
    'radio',
    'i18next',
    'baseUrl',
    'backbone',
    'underscore',
    '../View/DualListView',
    '../View/AktivnaVrstaView',
    '../View/PovzetekView',
    '../View/SelectListItemView'
], function (
        Radio,
        i18next,
        baseUrl,
        Backbone,
        _,
        DualListView,
        AktivnaVrstaView,
        PovzetekView,
        SelectListItemView
        ) {

    var VrstaModel = Backbone.Model.extend({
        defaults: {
            title: i18next.t('std.title'),
            id: 'nedoloceno',
            icon: 'fa fa-tablet',
            stIzpisov: 2,
            AktivnaVrstaView: AktivnaVrstaView,
            aktivnaVrstaTpl: null,
            PovzetekView: PovzetekView,
            povzetekTpl: null,
            SelectView: DualListView,
            ItemView: SelectListItemView,
            itemTpl: null,
            mozni: new Backbone.Collection(),
            label: 'nedoloceno'
        }
    });

    /**
     * inicializacija Modela
     * 
     * @param {Object} attr
     * @param {String} [attr.title]                 Title Default: prevod od std.title
     * @param {String} [attr.id]                    id/vrsta filtra Default: nedoloceno
     * @param {String} [attr.icon]                  Ikona Default: fa fa-tablet
     * @param {Number} [attr.stIzpisov]             Število izpisov pri povzetku Default: 2
     * @param {View} [attr.AktivnaVrstaView]        View za prikaz aktivnih filtrov/uveljavljenih filtrov Default: AktivnaVrstaView
     * @param {Function} [attr.aktivnaVrstaTpl]     Template za AktivnoVrstoView Default: null
     * @param {View} [attr.PovzetekView]            View za prikaz vrednosti aktivnig filtrov Default: PovzetekView
     * @param {Function} [attr.povzetekTpl]         template povzetkaview Default: null
     * @param {View} [attr.SelectView]              Urejanje/zbiranje vrednosti aktivnega filtra Default: DualListView
     * @param {View} [attr.ItemView]                View za izpis vrednosti filtra v SelectView Default: SelectListItemView
     * @param {Function} [attr.itemTpl]             template za Itemview Default: null
     * @param {Array|Collection} [attr.mozni]       Array ali Collection podatkov, ki jih lahko izberemo Default: new Backbone.Collection()
     * @param {String} [attr.label]                 label gumba, pri dodajanju aktivnih vrst filtra
     */
    VrstaModel.prototype.initialize = function (attr) {
        if (attr.mozni) {
            var mozni = attr.mozni;
            if (_.isArray(mozni)) {
                attr.mozni = array2Coll(mozni, Backbone.Collection);
            } else if (mozni instanceof Backbone.Collection) {

            }
            else if (_.isObject(mozni)) {
                attr.mozni = obj2Coll(mozni, Backbone.Collection);
            }
        }

        this.attributes = _.extend(this.attributes, attr);

    };
    /**
     * 
     * @param {Array} array
     * @param {VrstaCollection} Coll
     * @returns {VrstaCollection_L11.array2Coll.Coll}
     */
    var array2Coll = function (array, Coll) {
        var collection = new Coll();
        _.each(array, function (vrednost) {
            collection.add(vrednost);
        }, this);

        return collection;
    };

    /**
     * Pretvorba objekta vrste filtra v collection
     * @param {Object} obj
     * @param {VrstaCollection} Coll
     * @returns {VrstaCollection_L11.array2Coll.Coll}
     */
    var obj2Coll = function (obj, Coll) {
        //pretvorba objekta prvo v array
        var array = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                array.push(obj[key]);
            }
        }
        //pretvorba arraya v collection
        return array2Coll(array, Coll);
    };

    var VrstaCollection = Backbone.Collection.extend({
        model: VrstaModel
    });

    /**
     *
     * @param {Object} models
     * @param {Object} options
     * @param {Array|Collection} [options.vrsteFiltrov]     Array(polje objektov po vzorcu vrstaModel) ali Collection(VrstaCollection)
     */
    VrstaCollection.prototype.initialize = function (models, options) {
        if (options && options.vrsteFiltrov) {
            var vrste = options.vrsteFiltrov;
            if (!(vrste instanceof Backbone.Collection)) {
                if (_.isObject(vrste)) {
                    this.add(obj2Coll(vrste, VrstaCollection).models);
                } else if (_.isArray(vrste)) {
                    this.add(array2Coll(vrste, VrstaCollection).models);
                }
            } else {
                this.add(vrste.models);
            }
        }
    };

    return VrstaCollection;
});