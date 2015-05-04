define([
    'app/Max/Model/MaxNestedModel',
    'app/Max/Model/MaxPageableCollection'
], function (
        MaxNestedModel,
        MaxPageableCollection
        ) {


    var PostavkaCollection = MaxPageableCollection.extend({
        entity: null,
        model: null,
        mode: 'client',
        index: null,
        state: {
            pageSize: 1000,
            currentPage: 1
        },
        constructor: function () {
            // kateri atribut uporabljamo za index. Če imamo index, sortiramo
            // postavke po indexu in podpiramo moveUp, moveDown funkcije
            if (this.index) {
                this.state.sortKey = this.index;
            }
            MaxPageableCollection.apply(this, arguments);
        }
    });


    PostavkaCollection.prototype.getVsota = function (field) {

        return  this.reduce(function (memo, item) {
            return memo + item.get(field);
        }, 0);
    };
    
    PostavkaCollection.prototype.create = function (model) {
        // novim postavkam z indexom dodamo naslednji index (pozicijo)
        if (this.index && model.isNew()) {
            model.set(this.index, this.getIndexMax() + 1);
        }
        return MaxPageableCollection.prototype.create.apply(this, arguments);
    };

    PostavkaCollection.prototype.moveUp = function (model) {
        var collection = this.fullCollection || this;
        var index = this.indexOf(model);
        if (this.index && index > 0 && index < this.length) {
            var a = model;
            var b = collection.models[index - 1];

            var temp = a.get(this.index);
            a.set(this.index, b.get(this.index));
            b.set(this.index, temp);

            a.save();
            b.save();
            collection.sort();
        }
    };

    PostavkaCollection.prototype.moveDown = function (model) {
        var collection = this.fullCollection || this;
        var index = this.indexOf(model);
        if (this.index && index >= 0 && index < this.length - 1) {
            var a = model;
            var b = collection.models[index + 1];

            var temp = a.get(this.index);
            a.set(this.index, b.get(this.index));
            b.set(this.index, temp);

            a.save();
            b.save();
            collection.sort();
        }
    };

    PostavkaCollection.prototype.getIndexMax = function () {
        var index = this.index;
        var collection = this.fullCollection || this.collection;
        var max = collection.max(function (model) {
            return model.get(index);
        });
        return (max === -Infinity) ? 0 : max.get(index);
    };

    var DokumentCollection = MaxPageableCollection.extend({
        model: MaxNestedModel,
        mode: 'server',
        entity: null,
        state: {
            pageSize: 20,
            currentPage: 1
        }
    });

    return {
        Model: MaxNestedModel,
        Collection: DokumentCollection,
        Postavka: MaxNestedModel,
        PostavkaCollection: PostavkaCollection
    };
});