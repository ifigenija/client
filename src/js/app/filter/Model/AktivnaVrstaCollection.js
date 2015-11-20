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

    var AktivnaVrstaModel = Backbone.Model.extend({
        defaults: {
            collIzbrani: new Backbone.Collection(),
            modelMozni: new Vrsta(),
            vrsta: 'nedoloceno'
        }
    });

    AktivnaVrstaModel.prototype.initialize = function (attr) {
        this.attributes = _.extend(this.attributes, attr);
    };

    var AktivnaVrstaCollection = Backbone.Collection.extend({
        model: AktivnaVrstaModel
    });

    return AktivnaVrstaCollection;
});