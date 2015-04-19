define([
    'application',
    'backbone',
], function(App, Backbone) {

    var MapaAcl = Backbone.Model.extend({
        entity: 'MapaAcl',
        defaults: {skupina: null, dostop: 'R'}
    });
    var MapaAclCollection = Backbone.Collection.extend({
        model: MapaAcl,
        cleanup: function() {
            var toRemove = this.filter(function(item) {
                return !item.get('skupina');
            });
            this.remove(toRemove);
        }
    });

    return {model: MapaAcl, collection: MapaAclCollection};

});
