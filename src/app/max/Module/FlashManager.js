define([
    'underscore',
    'jquery',
    'backbone',
    'marionette',
    'text!../tpl/flash-messages-manager.tpl'
], function (
        _,
        $,
        Backbone,
        Marionette,
        tplFlashMessagesManager
        ) {


    var flashManagerInit = function (mod, App, Backbone, Marionette, $, _) {

        var MessagesModel = Backbone.Model.extend({
        });

        var MessagesCollection = Backbone.Collection.extend({
            model: MessagesModel
        });

        var Message = Marionette.ItemView.extend({
            className: "alert col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3",
            events: {
                'click .close': 'close'
            },
            serializeData: function () {
                var err = this.model.attributes;
                var ret = {};
                _.extend(ret, err);
                if (typeof err.code === 'undefined') {
                    ret.code = '';
                }
                return ret;
            },
            template: _.template('<%= code %> <%= message %> <button class="close" type="button" > × </button>'),
            onRender: function () {
                this.setSeverity();

                // fade animacija
                this.$el.hide().fadeIn();

                // avtomatsko skrijem sporočilo čez nekaj časa
                _.bindAll(this, 'close');
                setTimeout(this.close, 5000);
            },
            setSeverity: function () {
                var sev = this.model.get('severity') || 'warning';
                if (sev === 'error') {
                    sev = 'danger';
                }
                this.$el.addClass('alert-' + sev);
            },
            remove: function () {
                this.$el.fadeOut(function () {
                    $(this).remove();
                });
            }
        });

        var FlashMessages = Marionette.CollectionView.extend({
            el: $('#sporocila'),
            itemView: Message
        });


        var ManagerMessage = Message.extend({
            className: "alert",
            onRender: function () {
                this.setSeverity();
            }
        });


        var FlashMessagesManager = Marionette.CompositeView.extend({
            template: _.template(tplFlashMessagesManager),
            itemView: ManagerMessage,
            itemViewContainer: ".panel-flashmessages",
            onRender: function () {
                this.open = false;
            },
            events: {
                'click button.flashMessages': function () {
                    if (!this.open) {

                        this.$el.find('.panel').show();
                        this.open = true;
                    } else {
                        this.$el.find('.panel').hide();
                        this.open = false;
                    }
                },
                'click button.closeMgr': function () {
                    this.$el.find('.panel').hide();
                    this.open = false;
                }
            },
            addMessages: function (messages) {
                this.collection.add(messages);
            }
        });

        mod.invalid = function (e) {
            mod.manager.addMessages([{
                    message: e.validationError,
                    severity: 'danger'
                }]);
        };

        mod.fromResponse = function (response) {
            mod.manager.addMessages(response.errors);
        };

        mod.fromXhr = function (model, xhr) {
            var err = xhr.responseJSON;
            if (err && err.errors) {
                mod.manager.addMessages(err.errors);
            } else {
                mod.manager.addMessages([{
                        message: 'Napaka na strežniku.',
                        severity: 'danger'
                    }]);
            }
        };


        mod.fromSync = function (xhr) {
            var err = xhr.responseJSON;
            mod.manager.addMessages(err.errors);
        };

        mod.fromValidation = function (errors, schema) {
            var mess = {
                success: false,
                errors: []
            };

            _.each(_.keys(errors), function (e) {
                var title = schema[e].title || '';
                mess.errors.push({message: errors[e].message + (title ? ' - ' + title : ''), code: '', severity: 'danger'});
            });
            mod.manager.addMessages(mess.errors);
        };

        mod.addMessages = function (messages) {
            mod.manager.addMessages(messages);
        };

        mod.flash = function (message) {
            mod.manager.addMessages([message]);
        };

        mod.formErrors = function (err, schema) {
            _.each(_.keys(err), function (e) {
                App.mod.flash({
                    message: 'Polje ' + schema[e].title + ': ' + err[e].message,
                    severity: 'danger'
                });
            });
        };

        mod.createSporocilaView = function () {
            new FlashMessages({
                el: mod.manager.$('#sporocila'),
                collection: mod.messagesCollection
            });
        };

// narišem Flash messages Manager
        mod.addInitializer(function (options) {
            mod.messagesCollection = new MessagesCollection();
            mod.manager = new FlashMessagesManager({
                collection: mod.messagesCollection
            });
        });

    };
    return flashManagerInit;
});
