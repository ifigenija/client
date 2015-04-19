define([ 'baseUrl','backbone'], function(baseUrl,Backbone) {
    return Backbone.Model.extend({
        defaults: {
            naziv: '(Nova datoteka)',
            stevilka: ''
        },
        urlRoot: function() {
            return baseUrl + '/fs/datoteka';
        },
        entity: 'Datoteka',
        brisi: function(options) {

            this.makeUrl({
                odkod: options.odkod,
                kdo: options.kdo,
            });
            this.destroy({
                success: options.success,
                error: options.error,
                wait: true
            });
            delete this.url;
        },
        move: function(srcId, dstId, options) {
            this.makeUrl({
                src: srcId,
                oper: 'move',
                dst: dstId
            });
            this.save({mape: []}, options);
            delete this.url;
        },
        makeUrl: function(data) {
            this.url = this.urlRoot() + '/' + this.id + '?';

            var qs = "";
            for (var key in data) {
                var value = data[key];
                this.url += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
            }
        },
        getDownloadUrl : function () {
            return baseUrl + '/fs/datoteka/' + this.get('id') + '/prenesi';
        },
    });
});