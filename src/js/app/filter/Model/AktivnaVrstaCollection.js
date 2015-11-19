define([
    'radio',
    'baseUrl',
    'backbone'
], function (
        Radio,
        baseUrl,
        Backbone
        ) {

    var AktivnaVrstaModel = Backbone.Model.extend({
        collIzbrani: null,
        modelMozni: null
    });

    AktivnaVrstaModel.prototype.initialize = function (options) {
        this.collIzbrani = options.collIzbrani || new Backbone.Collection();
        this.modelMozni = options.modelMozni || null;
        if (options.entity) {
            this.collIzbrani = new LookupModel(null, {
                entity: options.entity
            });
        } else {
            if (!options.collIzbrani) {
                throw 'Collection Izbranih modelov ni določen';
            } else {
                this.collIzbrani = options.collIzbrani;
            }
        }
    };

    var AktivnaVrstaCollection = Backbone.Collection.extend({
        model: AktivnaVrstaModel
    });

    return {
        Model: AktivnaVrstaModel,
        Collection: AktivnaVrstaCollection
    };
});