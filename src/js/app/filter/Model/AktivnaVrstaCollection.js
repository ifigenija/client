define([
    'radio',
    'baseUrl',
    'backbone',
    'underscore',
    './VrstaCollection'
], function (
        Radio,
        baseUrl,
        Backbone,
        _,
        Vrsta
        ) {
    
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
    
    var dolociVrsto = function (coll) {
        var self = this;
        //pogledamo vrsto modela
        coll.each(function (model) {
            var vrsta = model.get('vrsta');
            //v primeru da ni nedoločena poiščemo definicijo vrste v coll vrsteFiltra
            if (vrsta !== 'nedoloceno') {
                self.vrsteFiltrov.each(function (vModel) {
                    if (vModel.get('id') === vrsta) {
                        model.set('vrstaModel', vModel);
                    }
                });
            }
        });
        
        return coll;
    };

    var AktivnaVrstaModel = Backbone.Model.extend({
        defaults: {
            izbrani: new Backbone.Collection(),
            vrstaModel: new Vrsta(),
            vrsta: 'nedoloceno'
        }
    });
    
    AktivnaVrstaModel.prototype.initialize = function (attr) {
        if (attr.izbrani) {
            var izbrani = attr.izbrani;
            if (_.isArray(izbrani)) {
                attr.izbrani = array2Coll(izbrani);
            } else if (izbrani instanceof Backbone.Collection) {

            }
            else if (_.isObject(izbrani)) {
                attr.izbrani = obj2Coll(izbrani);
            }
        }

        this.attributes = _.extend(this.attributes, attr);

    };

    AktivnaVrstaModel.prototype.initialize = function (attr) {
        this.attributes = _.extend(this.attributes, attr);
    };

    var AktivnaVrstaCollection = Backbone.Collection.extend({
        model: AktivnaVrstaModel
    });
    
    AktivnaVrstaCollection.prototype.initialize = function (models, options) {
        if (options && options.aktivneVrste) {
            var vrste = options.aktivneVrste;
            if (!(vrste instanceof Backbone.Collection)) {
                if (_.isObject(vrste)) {
                    var coll = dolociVrsto(obj2Coll(vrste));
                    this.add(coll.models);
                } else if (_.isArray(vrste)) {
                    this.add(array2Coll(vrste).models);
                }
            } else {
                this.models = vrste.models;
            }
        }
    };

    return AktivnaVrstaCollection;
});