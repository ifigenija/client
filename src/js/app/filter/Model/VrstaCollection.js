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
    /**
     * Parametri
     *      - title
     *      - icon
     *      - stIzpisov
     *      - SelectView
     *      - ItemView
     *      - itemTpl
     *      - mozni, (podatki, ki jih lahko izbiramo)
     * @param Array attr
     * @returns {undefined}
     */
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
            mozni: new Backbone.Collection()
        }
    });

    var array2Coll = function (array) {
        var collection = new Backbone.Collection();
        _.each(array, function (vrednost) {
            collection.add(vrednost);
        }, this);

        return collection;
    };

    var obj2Coll = function (obj) {
        var array = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                array.push(obj[key]);
            }
        }

        return array2Coll(array);
    };

    VrstaModel.prototype.initialize = function (attr) {
        if (attr.mozni) {
            var mozni = attr.mozni;
            if (_.isArray(mozni)) {
                attr.mozni = array2Coll(mozni);
            } else if (mozni instanceof Backbone.Collection) {

            }
            else if (_.isObject(mozni)) {
                attr.mozni = obj2Coll(mozni);
            }
        }

        this.attributes = _.extend(this.attributes, attr);

    };

    VrstaModel.prototype.initialize = function (attr) {
        if (attr.mozni) {
            var mozni = attr.mozni;
            if (_.isArray(mozni)) {
                attr.mozni = array2Coll(mozni);
            } else if (mozni instanceof Backbone.Collection) {

            }
            else if (_.isObject(mozni)) {
                attr.mozni = obj2Coll(mozni);
            }
        }

        this.attributes = _.extend(this.attributes, attr);

    };

    var VrstaCollection = Backbone.Collection.extend({
        model: VrstaModel
    });

    VrstaCollection.prototype.initialize = function (models, options) {
        if (options && options.vrsteFiltrov) {
            var vrste = options.vrsteFiltrov;
            if (!(vrste instanceof Backbone.Collection)) {
                if (_.isObject(vrste)) {
                    this.add(obj2Coll(vrste).models);
                } else if (_.isArray(vrste)) {
                    this.add(array2Coll(vrste).models);
                }
            } else {
                this.add(vrste.models);
            }
        }
    };

    return VrstaCollection;
});