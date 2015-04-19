define(['baseUrl', 'backbone'], function(baseUrl, Backbone) {
    return Backbone.Model.extend({
        entity: 'Priponka',
        url: function() {
            var url = baseUrl + '/fs/priponka';
            if (!this.isNew()) {
                url = url + '/' + this.id;
            }
            return url;
        },
        validate: function(attrs, options) {

            if (attrs.naziv.length === 0) {
                return "Naziv ne sme biti prazen";
            }
            if (typeof attrs.jeMapa  !== "boolean") {
                return "Napačna izbira tipa priponke";
            }

        }
    });

});



