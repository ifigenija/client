define([
    'marionette',
    'backbone',
    'underscore',
    'jquery',
    './Buttons',
    '../Model/Toolbar'
], function (
        Marionette,
        Backbone,
        _, $,
        Buttons,
        ToolbarModel
        ) {



    /**
     * Seznam gumbov v posamezni button groupi 
     * 
     */
    var ToolbarGroup = Marionette.CollectionView.extend({
        tagName: 'div',
        initialize: function (options) {
            options = options || {};
            this.size = options.size || '';
            this.listener = options.listener || null;
        },
        itemView: Buttons['button-link'],
        buildItemView: function (item) {
            var type = item.get('element') || 'button-trigger';
            var Button = item.get('object') ? {view: item.get('object')} : (Buttons[type] || Buttons['button-link']);
            var view;
            var options = {
                model: item,
                size: this.size,
                listener: this.listener
            };
            return new Button(options);           
        }
    });



    /**
     * Button groupe, ki se stavljajo celotni toolbar 
     */
    return Marionette.CollectionView.extend({
        className: 'btn-toolbar',
        initialize: function (options) {
            options = options || {};

            if (options.buttonGroups) {
                this.collection = new ToolbarModel.collection(options.buttonGroups);

            }

            this.size = options.size || '';
            this.listener = options.listener || null;
            this.className = options.className || 'btn-toolbar';
            this.groupClass = options.groupClass || 'btn-group';
        },
        itemView: ToolbarGroup,
        buildItemView: function (model) {
            var item =  new ToolbarGroup({
                size: this.size,
                listener: this.listener,
                className: this.groupClass,
                collection: model.elements
            });
            return item;
        }
    });
});