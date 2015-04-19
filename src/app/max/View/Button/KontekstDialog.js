define([
    'marionette',
    'underscore',
    'text!../../tpl/kontekst-dialog.tpl'
], function(Marionette, _, tpl) {
    return Marionette.ItemView.extend({
        template: _.template(tpl),
        events: {
            'click .save': 'add',
            'hidden.bs.modal': 'destroy'
        },
        serializeData: function() {
            return {globalPermission: this.collection.globalPermission};
        },
        onRender: function() {
            this.$dialog = this.$('#kontekstDialog');
            this.$ime = this.$('#kontekstIme');
            this.$auto = this.$('#kontekstAuto');
            this.$global = this.$('#kontekstGlobal');

            this.$dialog.modal('show');
        },
        add: function() {

            var data = {};

            var err = this.options.form.validate();
            if (err) {
                window.App.FlashManager.formErrors(err, this.collection.form.schema);
            }

            this.model.set({                
                kontekst: this.collection.kontekst.replace(/\//g,'-'),
                ime: this.$ime.val(),
                auto: this.$auto.is(':checked'),
                global: this.$global.is(':checked'),
                data: this.options.form.getValue()
            });

            var self = this;
            this.collection.create(this.model, {
                wait: true,
                success: function() {
                    self.$dialog.modal('hide');
                },
                error: window.App.FlashManager.fromXhr
                
            });
        },
        destroy: function() {
            this.close();
        }
    });
});