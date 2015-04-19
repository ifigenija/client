define([
    'baseUrl',
    'backbone',
    './Priponka'], function(baseUrl, Backbone, Priponka) {
    return  Backbone.Collection.extend({
        initialize: function (models,options) {
          this.owner = options.owner;
        },
        url: function(models) {
           return baseUrl + '/fs/priponka/o/' + this.owner;
        },
        model: Priponka

    });
});
