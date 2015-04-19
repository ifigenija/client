define([
    'baseUrl',
    'backbone',
    'underscore'
], function(baseUrl, Backbone, _) {
    var Kontekst = Backbone.Model.extend({
        defaults: {
            ime: 'Brez imena',
            global: false,
            globalPermission: false
        }
    });

    var KontekstCollection = Backbone.Collection.extend({
        model: Kontekst,
        comparator: function(a, b) {
            if (a.attributes.global === b.attributes.global) {
                return (a.attributes.ime < b.attributes.ime) ? -1 : 1;
            } else {
                return a.attributes.global ? -1 : 1;
            }
        },
        initialize: function(models, options) {
            var kontekst = options.kontekst.replace(/\//g, '-');
            this.url = baseUrl + '/tip/k/' + kontekst;
            _.extend(this, _.pick(options, 'kontekst', 'listener', 'globalPermission', 'form'));
        }
    });

    return {model: Kontekst, collection: KontekstCollection};
});