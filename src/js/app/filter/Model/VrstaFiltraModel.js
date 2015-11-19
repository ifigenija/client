define([
    'radio',
    'baseUrl',
    'backbone',
    'app/Max/Model/LookupModel',
    '../View/DualListView'
], function (
        Radio,
        baseUrl,
        Backbone,
        LookupModel,
        DualListView
        ) {
    /**
     * options:
     *      - entity: določa katero entiteto bomo vzeli v collIzbira in v collIzbrani
     *      - collIzbira: določi collection kriterijev filtra med katerimi lahko izbiramo
     *      - collIzbrani: določa collection izbranih kriterijev filtra
     *      - SelectView: predstavlja view, ki se bo prikazal pri urejanju/spreminjaju kriterijev
     *      
     * V primeru da določimo entiteto se bosta collIzbira in collIzbrani inicializirala.
     * V nasprotnem primeru pa moramo podati modelu collIzbira in collIzbrani
     * @type @exp;Backbone@pro;Model@call;extend
     */
    var VrstaFiltraModel = Backbone.Model.extend({
        initialize: function (options) {
            if (options.entity) {
                this.collIzbrani = new LookupModel(null, {
                    entity: options.entity
                });

                this.collIzbira = new LookupModel(null, {
                    entity: options.entity
                });

                this.collIzbira.fetch({
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            } else {
                if (!options.collIzbira) {
                    throw 'Collection modelov med katerimi lahko izbiramo ni določen';
                } else {
                    this.collIzbira = options.collIzbira;
                }

                if (!options.collIzbrani) {
                    throw 'Collection Izbranih modelov ni določen';
                } else {
                    this.collIzbrani = options.collIzbrani;
                }
            }

            //vsak model ima lahko svoj izgled
            this.SelectView = options.Selectview || DualListView;
            this.ItemView = options.ItemView || null;
            this.itemTemplate = options.itemtemplate || null;
        }
    });

    var VrstaFiltraCollection = Backbone.Collection.extend({
        model: VrstaFiltraModel
    });

    return {
        Model: VrstaFiltraModel,
        Collection: VrstaFiltraCollection
    };
});