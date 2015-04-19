define(['jquery',
    'marionette',
    'underscore',
    'backbone',
    './Button'], function (
        $,
        Marionette,
        _,
        Backbone,
        Button)
{

    /**
     *     
     */
    var PriponkeButton = Button.extend({
        events: {
            'click': 'onClick'
        }
    });

    /**
     * Kaj se zgodi ob kliku gumba 
     * 
     * @returns {Boolean}
     */
    PriponkeButton.prototype.onClick = function () {
        Backbone.history.navigate(this.model.get('uri'), {trigger: true});
        return false;
    };

    /**
     * Nariše badge s številom priponk na gumb
     * @returns {undefined}
     */
    PriponkeButton.prototype.onRender = function () {
        Button.prototype.onRender.apply(this, arguments);
        if (this.model.get('counter')) {
            this.$el.append('<span class="badge">' + this.model.get('counter') + '</span>');
        }
    };

    return PriponkeButton;
});