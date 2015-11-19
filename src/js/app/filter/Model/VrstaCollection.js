define([
    'radio',
    'i18next',
    'baseUrl',
    'backbone',
    '../View/DualListView'
], function (
        Radio,
        i18next,
        baseUrl,
        Backbone,
        DualListView
        ) {
    var VrstaModel = Backbone.Model.extend({});

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
     * @param Array options
     * @returns {undefined}
     */
    VrstaModel.prototype.initialize = function (options) {
        this.title = options.title || i18next.t('std.title');
        this.icon = options.icon || i18next.t('std.icon');
        this.stIzpisov = options.stIzpisov || 2;
        this.SelectView = options.SelectView || DualListView;
        this.ItemView = options.ItemView || null;
        this.itemTpl = options.itemTpl || null;
        this.podatki = options.podatki || {
            collMozni: null,
            collIzbrani: null
        };

        if (!options.collMozni) {
            throw 'Collection modelov med katerimi lahko izbiramo ni določen';
        } else {
            this.podatki.collMozni = options.collMozni;
        }

        if (!options.collIzbrani) {
            throw 'Collection Izbranih modelov ni določen';
        } else {
            this.podatki.collIzbrani = options.collIzbrani;
        }
    };

    var VrstaCollection = Backbone.Collection.extend({
        model: VrstaModel
    });

    return {
        Model: VrstaModel,
        Collection: VrstaCollection
    };
});