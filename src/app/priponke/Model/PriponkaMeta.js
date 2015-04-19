define(['baseUrl', 'backbone'], function(baseUrl, Backbone) {
    return Backbone.Model.extend({
        initialize: function (attributes, options) {
            this.entity = options.entity;
        },
        entity: 'Priponka',
        url: function() {
            var url = baseUrl + '/tip/lookup/' + this.entity;
            if (!this.isNew()) {
                url = url +  '?ids=' + this.id;
            }
            return url;
        }
    });


});



