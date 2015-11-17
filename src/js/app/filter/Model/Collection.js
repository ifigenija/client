define([
    'baseUrl',
    'app/Max/Model/LookupModel',
    'underscore'
], function (
        baseUrl,
        LookupModel,
        _
        ) {

    var SelectListCollection = LookupModel.extend({
        entity: this.options.entity
    });

    /**
     * Vrne polje modelov, ki jih želimo izbrati
     * @returns {Marionette.CollectionView@call;extend.prototype.getSelectedModels.result|Array}
     */
    SelectListCollection.prototype.getSelectedModels = function () {
        var result = [];
        var models = this.models;
        for (var modelId in models) {
            if (models[modelId].get('selected')) {
                result.push(models[modelId]);
            }
        }
        return result;
    };
    /**
     * Vrne polje vseh modelov iz collectiona
     * @returns {DualListCollView_L21.DualListCollView.collection.models}
     */
    SelectListCollection.prototype.getAllModels = function () {
        return _.clone(this.models);
    };
    /**
     * resetiramo polje modelov
     * @returns {DualListCollView_L21.DualListCollView.collection.models}
     */
    SelectListCollection.prototype.resetSelection = function () {
        var models = this.models;
        for (var modelId in models) {
            models[modelId].set('selected', false);
        }
    };
    return SelectListCollection;
});