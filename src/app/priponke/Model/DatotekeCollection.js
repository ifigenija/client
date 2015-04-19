define(['baseUrl', 'backbone', './Datoteka'], function(baseUrl, Backbone, Datoteka) {
    return Backbone.Collection.extend({
        url: function() {
            var url = baseUrl + '/fs/datoteka';
            return url;
        },
        model: Datoteka,
        fetchFromPath : function (path, options) {
            if (!options) {
                options = {};
            }
            
            if (!options.data) {
                options.data = {};
            }
            
            options.data.fullpath = path;
            return this.fetch(options);
        }
    });
});

