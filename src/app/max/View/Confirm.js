
define([
    'marionette',
    'backbone',
    'underscore',
    'backbone-modal'
], function(

        Marionette,
        Backbone,
        _,
        BootstrapModal
        ) {

    var Confirm = Marionette.ItemView.extend({
        template: _.template('<%= text %>'),
        initialize: function(options) {
            this.model = new Backbone.Model(options);
        }
    });

    return function(options) {
        options = options || {};
        options.cancelText = options.cancelText || 'Prekliči';
        options.modalOptions = {
            className: 'modal modal-confirm'
        };
        options.content = new Confirm(options);

        var BootstrapModalConfirm = Backbone.BootstrapModal.extend({
            className: 'modal modal-confirm'
        });
        var modal = new BootstrapModalConfirm(options);
        if (options.ok && _.isFunction(options.ok)) {
            modal.open(options.ok);
        }

    };

});