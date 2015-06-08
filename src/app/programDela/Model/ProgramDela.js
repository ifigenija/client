define([
    'baseUrl',
    'backbone',
    'underscore',
    'app/Max/Model/MaxPageableCollection'
], function (
        baseUrl,
        Backbone,
        _,
        PageableCollection
        ) {

    var model = Backbone.Model.extend({
        urlRoot: baseUrl + '/rest/programDela'
//        getObdobjaOptions: function(leto) {
//            var select = [{id: "leto", oznaka: "Skupaj"}];
//           _.each(this.get('obdobja'), function(o) {
//               select.push(_.pick(o,"id", "oznaka"));
//           });
//           return select; 
//        }
    });

    var collection = PageableCollection.extend({
        url: baseUrl + 'rest/programDela',
        model: model
    });

    return {
        model: model,
        collection: collection
    };

});