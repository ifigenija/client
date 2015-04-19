define([
    'application',
    'underscore',
    'backbone',
    'deep-model'
], function (
        App,
        _,
        Backbone,
        DeepModel
        ) {

    var MaxNestedModel = Backbone.DeepModel.extend({
        entity: null,
        urlRoot: null,
        constructor: function () {
            // preprečimo klic initialize() parent konstruktorja
            var init = this.initialize;
            this.initialize = function () {
            };

            Backbone.DeepModel.apply(this, arguments);

            // kreiramo nested kolekcije
            this._collectionMap = {};
            for (var attribute in this.nestedCollections) {
                var constructor = this.nestedCollections[attribute].collection;
                var mappedBy = this.nestedCollections[attribute].mappedBy;
                var collectionName = attribute + 'Collection';
                this[collectionName] = this.newNestedCollection(constructor, attribute, mappedBy);
            }

            this.initialize = init;
            this.initialize.apply(this, arguments);
        }
    });

    MaxNestedModel.prototype.newNestedCollection = function (Base, attribute, mappedBy) {
        var Constructor = Base.extend({
            _mappedBy: mappedBy,
            initialize: function () {
                // collection filtriramo tako da prikazuje samo elemente ki si jih lasti parent
                this.addFilter(mappedBy, function () {
                    return this.getParentId();
                });
                Base.prototype.initialize.apply(this, arguments);
            }
        });

        // ustvarimo collection, s podatkom parenta
        var collection = this._collectionMap[attribute] = new Constructor([], {parent: this});

        // event ki posodobi collection ko se spremeni pripadajoč attribut
        this.on('sync', this._onSync);
        return collection;
    };

    MaxNestedModel.prototype.getParentId = function () {
        return (this.collection && this.collection.parent) ?
                this.collection.parent.id : undefined;
    };

    MaxNestedModel.prototype._onSync = function (__, resp, options) {
        var triggerSync = function (model) {
            model.trigger('sync', model, model.attributes, options);
        };
        
        for (var attribute in this._collectionMap) {
            // sync event bubblamo rekurzivno v notranjost
            // zato da se posodobijo vrednosti nestanih collectionov
            var collection = this._collectionMap[attribute];
            collection = collection.fullCollection || collection;
            collection.reset(this.get(attribute));
            collection.each(triggerSync);
        }
    };

    return MaxNestedModel;
});