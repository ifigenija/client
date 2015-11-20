define([
    'radio',
    'i18next',
    'baseUrl',
    'backbone',
    'underscore',
    '../View/DualListView',
    '../View/VrstaFiltraView'
], function (
        Radio,
        i18next,
        baseUrl,
        Backbone,
        _,
        DualListView,
        VrstaFiltraView
        ) {
    /**
     * Parametri
     *      - title
     *      - icon
     *      - stIzpisov
     *      - SelectView
     *      - ItemView
     *      - itemTpl
     *      - podatki:{
     *          collMozni,
     *          collIzbrani
     *          }
     * @param Array attr
     * @returns {undefined}
     */
    var VrstaModel = Backbone.Model.extend({
        defaults: {
            title: i18next.t('std.title'),
            icon: 'fa fa-tablet',
            stIzpisov: 2,
            SelectView: DualListView,
            ItemView: null,
            itemTpl: null,
            VrstaFiltraView: VrstaFiltraView,
            vrstaFiltraTpl: null,
            podatki: {
                collMozni: new Backbone.Collection(),
                collIzbrani: new Backbone.Collection()
            }
        }
    });

    VrstaModel.prototype.initialize = function (attr) {
        this.attributes = _.extend(this.attributes, attr);

        if (!attr.collMozni) {
            throw 'Collection modelov med katerimi lahko izbiramo ni določen';
        } else {
            this.get('podatki').collMozni = attr.collMozni;
        }

        if (!attr.collIzbrani) {
            throw 'Collection Izbranih modelov ni določen';
        } else {
            this.get('podatki').collIzbrani = attr.collIzbrani;
        }
    };

    var VrstaCollection = Backbone.Collection.extend({
        model: VrstaModel
    });

    return VrstaCollection;
});