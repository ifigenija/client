define([   
    'backbone',
    'marionette',
    'underscore',
    'text!../tpl/error.tpl'
], function(
        Backbone,
        Marionette,        
        _,
        tpl
        ) {
    var ErrorView = Marionette.ItemView.extend({
        template: _.template(tpl),
        initialize: function(options) {
            if (!this.model) {
                this.model = new Backbone.Model(_.extend({}, _.pick(options, 'message', 'code', 'data')));
            }
        }
    });
    return ErrorView;
});