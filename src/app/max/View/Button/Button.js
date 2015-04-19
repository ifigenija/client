define([
    'jquery',
    'underscore',
    'marionette',
    'text!../../tpl/button.tpl'
], function ($, _, Marionette, tplButton) {


    var Button = Marionette.ItemView.extend({
        tagName: 'button',
        className: 'btn btn-default',
        template: _.template(tplButton),
        size: 'xs',
        modelEvents: {
          change: "modelChanged"  
        },
        
        initialize: function (options) {
            options = options || {};
            _.extend(this, _.pick(options, 'size', 'listener', 'form'));
            this.size = options.size || this.size;
            this.listener = options.listener || null;
            this.disabled = options.model.get('disabled') || false;
           
        },
        onRender: function () {
            if (this.size !== '') {
                this.$el.addClass('btn-' + this.size);
            }

            if (this.model.get('title')) {
                this.$el.attr('title', this.model.get('title'));
            }

            if (this.model.get('disabled')) {
                this.$el.prop('disabled', true);
            } else {
                this.$el.prop('disabled',false);
            }
        },
        modelChanged: function() {
            this.render();
        } 
    });

    return Button;
});