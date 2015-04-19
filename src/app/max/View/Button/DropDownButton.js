/* 
 * Licenca GPL V3 or later
 *  
 */

define(['./Button', 'marionette', '../../Model/Toolbar', 'underscore'], function (Button, Marionette, ToolbarModel, _) {

    // template za dropdown  item
    var tplItem = '<a href="<%= uri %>"><% if (icon) { %><i class="<%= icon %>"></i><% } %> <%= label %></a>';
    // navadni dropdown intem
    var DropdownItem = Marionette.ItemView.extend({
        tagName: 'li',
        template: _.template(tplItem),
        show: function () {
            this.$el.removeClass('hide');
            return this;
        },
        events: {
            'click a': 'onClick'
        },
        hide: function () {
            this.$el.addClass('hide');
            return this;
        },
        initialize: function (options) {
            options = options || {};
            if (options.listener) {
                this.listener = options.listener;
            }
        },
        onClick: function () {
            if (this.model && this.model.get('trigger')) {
                if (this.listener) {
                    Marionette.triggerMethod.call(this.listener, this.model.get('trigger'), this.model.get('data'));
                } else {
                    if (this.model.get('listener')) {
                        Marionette.triggerMethod.call(this.model.get('listener'), this.model.get('trigger'), this.model.get('data'));
                    }
                }
            }
        }
    });
    var DropdownLink = DropdownItem.extend({
        template: _.template('<a href="<%= uri %>"><%= label %></a>')
    });
    var DropdownHeader = DropdownItem.extend({
        className: 'dropdown-header'
    });
    var DropdownDivider = DropdownItem.extend({
        className: 'divider',
        template: _.template('')
    });
    var Dropdown = Marionette.CollectionView.extend({
        Link: DropdownLink,
        Divider: DropdownDivider,
        Header: DropdownHeader,
        tagName: 'ul',
        className: 'dropdown-menu',
        itemView: DropdownItem,
        buidlItemView: function (item, ItemViewType) {

            var options = {model: item, listener: this.options.listener};

            var type = item.model.get('type') || 'default';
            switch (type) {
                case 'link':
                    return new DropdownLink(options);
                case 'divider':
                    return new DropdownDivider(options);
                case 'header':
                    return new DropdownHeader(options);
                default:
                    return new ItemViewType({model: item, listener: this.options.listener});
            }
        },
    });


    var DropDownButton = Button.extend({
        className: 'btn btn-default dropdown-toggle',
        template: _.template('<%= label %> <span class="caret"></span>'),
        events: {'click': 'click'},
        Dropdown: Dropdown,
        initialize: function (options) {
            _.extend(this, _.pick(options, 'size', 'listener', 'form'));
            this.$el.attr('data-toggle', 'dropdown');
            this.firstClick = true;
        },
        click: function () {

            if (this.firstClick) {
                this.firstClick = false;
                var options = {model:this.model};
                var collection, dropdownItems = [];
                if (this.model.get('dropdown')) {
                    dropdownItems = this.model.get('dropdown');
                    collection = new ToolbarModel.elements(dropdownItems, this.model.attributes);
                    _.extend(options, {collection: collection});
                }
              
                this.child = new this.Dropdown(options);
                this.$el.after(this.child.el);
                this.child.render();
            }
            this.child.trigger('dropdown');
        }
    });

    return DropDownButton;
});