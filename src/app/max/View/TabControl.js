define([
    'backbone',
    'underscore',
    'marionette'
], function(Backbone, _, Marionette) {


    var Tab = Marionette.ItemView.extend({
        tagName: 'li',
        template: _.template('<a href="<%= route %>" title="<%= name %>"><span><%= title %><span></a>'),
        triggers: {
            'click': 'select',
            'click .close': 'close:tab'
        },
        initialize: function(options) {
            var t = this;
            this.listenTo(this.model, 'change:name', function() {
                t.render();
            });
        },
        serializeData: function() {
            var data = {};
            _.extend(data, this.model.attributes);
            data.title = this.model.get('name').substr(0, 25);
            if (typeof data.route === 'undefined') {
                data.route = '#';
            } else {
                data.route = '#' + data.route;
            }
            return data;
        },
        onRender: function() {
            if (this.model.get('view')) {
                this.$el.find('a').append('<button class="close" type="button">×</button>');
            }
        },
        onCloseTab: function() {
            var view = this.model.get('view');
            view.close();
            this.model.collection.remove(this.model);
        }

    });

    var TabControl = Marionette.CollectionView.extend({
        tagName: 'ul',
        itemView: Tab,
        className: 'nav nav-tabs nav-justified',
        initialize: function(options) {
            var tabs = options.tabs;
            if (tabs) {
                this.collection = new Backbone.Collection(tabs, {model: Backbone.Model});
            }
            //   this._initialEvents();
            this.listener = options.listener || this;
        },
        onItemviewSelect: function(tab) {

            var view = tab.model ? tab : this.children.findByModel(tab);
            var model = tab.model ? tab.model : tab;
            this.$('li.active').removeClass('active');
            view.$el.addClass('active');
            this.activeTab = model;
            if (model.get('event')) {
                Marionette.triggerMethod.call(this.listener, model.get('event'));
            }

            if (model.get('view')) {
                this.collection.trigger('tabSwitched', model);
                var prefix = model.get('routePrefix') || '';
                Backbone.history.navigate(prefix + model.get('id'));
            }
        },
        onRender: function() {
            this.activeTab = this.children.first();
            this.refreshActiveTab();
        },
        addTab: function(tab) {
            if (!(tab instanceof Backbone.Model)) {
                tab = new Backbone.Model(tab);
            }
            this.collection.add(tab);
            this.onItemviewSelect(this.children.findByModel(tab));
            return tab;
        },
        removeTab: function(tabName) {
            this.collection.remove(this.collection.where({id: tabName}));
        },
        findTab: function(tabId) {
            return this.collection.findWhere({id: tabId});
        },
        refreshActiveTab: function() {
            if (this.activeTab) {
                this.triggerMethod('itemview:select', this.activeTab);
            }
        }


    });
    return TabControl;
});