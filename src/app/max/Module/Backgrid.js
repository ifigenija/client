define([
   
    'jquery',
    'backgrid',
    'backbone',
    'marionette',
    'underscore',
    'moment',
    'lib/extensions/moment-cell/backgrid-moment-cell',
    'lib/extensions/select-all/backgrid-select-all',
    'lib/extensions/filter/backgrid-filter'
], function (
        $,
        Backgrid,
        Backbone,
        Marionette,
        _,
        moment              
        ) {


    Backgrid.DateTimeCell = Backgrid.Extension.MomentCell.extend({
        displayFormat: 'YYYY-MM-DD HH:mm',
        className: "datetime-cell",
        modelInUTC: true,
        displayInUTC: true,
        modelLang: 'sl',
        displayLang: 'sl'
    });
    Backgrid.DateCell = Backgrid.Extension.MomentCell.extend({
        displayFormat: 'L',
        className: "date-cell",
        modelInUTC: true,
        displayInUTC: true,
        modelLang: 'sl',
        displayLang: 'sl'

    });
    Backgrid.TimeCell = Backgrid.Extension.MomentCell.extend({
        displayFormat: 'LT',
        className: "time-cell",
        modelInUTC: true,
        displayInUTC: true,
        modelLang: 'sl',
        displayLang: 'sl'

    });
    Backgrid.NumberFormatter.prototype.defaults = {
        decimals: 2,
        decimalSeparator: ',',
        orderSeparator: '.'
    };
    Backgrid.NumberCell.prototype.decimals = 2;
    Backgrid.NumberCell.prototype.decimalSeparator = ',';
    Backgrid.NumberCell.prototype.orderSeparator = '.';
    Backgrid.Grid.prototype.className = "backgrid table-hover";
    Backgrid.NumberHeaderCell = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });
//
//    Backgrid.StringCell.prototype.enterEditMode = function  () {
//        Backgrid.Cell.prototype.enterEditMode.apply(this,arguments);
//        this.currentEditor.$el.select();
//    }
// 
//    Backgrid.NumberCell.prototype.enterEditMode = function  () {
//        Backgrid.Cell.prototype.enterEditMode.apply(this,arguments);
//        this.currentEditor.$el.select();
//    }

    /**
     * Vrstica za backgrid, ki sporži selectValue event na collectionu,
     * z parametrom model-a vrstice, ki je bila kiknjena
     * @
     */
    var ClickableRow = Backgrid.ClickableRow = Backgrid.Row.extend({
        events: {
            'click': 'select'
        },
        select: function (event) {
            var coll = this.model.collection.fullCollection || this.model.collection;
            coll.trigger('deselect', coll);
            coll.trigger('selectValue', this.model);
            this.$el.addClass('active');
            this.listenTo(coll, 'deselect', this.deselect);
        },
        deselect: function (coll) {
            this.$el.removeClass('active');
            if (coll) {
                coll.off('deselect');
            }
        }

    });
    var expandRoute = function (def) {
        var self = this;
        var namedParam = /(\(\?)?:[\w\.]+/g;
        def.route = def.route.replace(namedParam, function (match) {
            var getParam = match.substring(1);
            var id = self.model.get(getParam);
            return id;
        });
    };

    Backgrid.ActionView = Backbone.View.extend({
        defaults: {
            delete: 'Briši',
            drilldown: 'Podrobno',
            edit: 'Uredi'
        },
        tagName: 'a',
        initialize: function (options) {
            _.extend(this, _.pick(options, 'class', 'icon', 'event', 'title', 'route'));
            _.bindAll(this, 'clicked');
            if (this.defaults[this.event]) {
                if (!this.title) {
                    this.title = this.defaults[this.event];
                }
            }

        },
        render: function () {
            if (this.title) {
                this.$el.attr('title', this.title);
            }
            if (this.class) {
                this.$el.attr('class', this.class);
            }

            if (this.route) {
                this.$el.attr('href', '#' + this.route);
            } else {
                this.$el.attr('href', 'javascript:void(0)');
            }

            if (this.event) {
                this.$el.on('click', this.clicked);
            }
            if (this.icon || this.event) {
                this.$el.append(this.getIcon(this.icon, this.event));
            }

            return this;
        },
        clicked: function (e) {
            this.trigger('action', this.event);
            return false;
        },
        getIcon: function (icon, event) {
            if (typeof icon === 'undefined') {
                if (typeof event !== 'undefined') {
                    switch (event) {
                        case 'delete':
                        case 'brisi':
                            icon = 'fa fa-trash-o';
                            break;
                        case 'drilldown':
                            icon = 'fa fa-level-down';
                            break;
                        case 'edit':
                        case 'uredi':
                            icon = 'fa fa-edit';
                            break;
                        case 'up':
                        case 'premakniGor':
                            icon = 'fa fa-chevron-up';
                            break;
                        case 'down':
                        case 'premakniDol':
                            icon = 'fa fa-chevron-down';
                            break;
                        default:
                            icon = 'fa fa-' + event;
                            break;
                    }
                } else {
                    icon = 'fa fa-ellipsis-horizontal';
                }
            }
            return '<i class="' + icon + '"></i>';
        }


    });
    Backgrid.ActionCell = Backgrid.Cell.extend({
        formatter: Backgrid.CellFormatter,
        /** @property */
        events: {
        },
        initialize: function (options) {
            Backgrid.Cell.prototype.initialize.apply(this, arguments);
            this.actionViews = [];
            options.column.set('editable', false);
            var self = this;
            _.each(options.column.get('actions'), function (action) {
                var def = _.extend({}, action);
                if (def.route) {
                    self.expandRoute(def);
                }
                var act = new Backgrid.ActionView(def);
                self.actionViews.push(act);
                self.listenTo(act, 'action', self.triggerActionEvent);
            });
        },
        /**
         Render a text string in a table cell. The text is converted from the
         model's raw value for this cell's column.
         */
        render: function () {
            this.$el.empty();
            var self = this;
            _.each(this.actionViews, function (actionView) {
                actionView.render();
                self.$el.append(actionView.el);
                self.$el.append(' ');
            });
            this.delegateEvents();
            return this;
        },
        expandRoute: expandRoute,
        triggerActionEvent: function (event) {
            this.model.trigger('backgrid:action', this.model, event);
        },
        remove: function () {
            var self = this;
            _.each(this.actionViews, function (v) {
                self.stopListening(v);
                v.remove.apply(self, arguments);
            });
            return Backgrid.Cell.prototype.remove.apply(this, arguments);
        }
    });


    Backgrid.RouteCell = Backgrid.Cell.extend({
        formatter: Backgrid.CellFormatter,
        /** @property */
        events: {
        },
        initialize: function (options) {
            Backgrid.Cell.prototype.initialize.apply(this, arguments);
            options.column.set('editable', false);
            this.linkDef = _.pick(options.column.attributes, 'route', 'title', 'name');

        },
        /**
         Render a text string in a table cell. The text is converted from the
         model's raw value for this cell's column.
         */
        render: function () {
            this.$el.empty();
            this.expandRoute(this.linkDef);

            var href, text, title;

            if (_.isFunction(this.linkDef.route)) {
                href = this.linkDef.route.apply(this);
            } else {
                href = this.linkDef.route;
            }
            if (_.isFunction(this.linkDef.title)) {
                title = this.linkDef.title.apply(this);
            } else {
                title = this.linkDef.title;
            }

            text = this.model.get(this.linkDef.name);

            var link = $('<a></a>').attr('href', href).attr('title', title).append(text);
            this.$el.append(link);
            return this;
        },
        expandRoute: expandRoute,
        remove: function () {
            var self = this;
            return Backgrid.Cell.prototype.remove.apply(this, arguments);
        }
    });

    /**
     NumberCell is a generic cell that renders all numbers. Numbers are formatted
     using a Backgrid.NumberFormatter.
     
     @class Backgrid.NumberCell
     @extends Backgrid.Cell
     */
    var CallbackCell = Backgrid.CallbackCell = Backgrid.NumberCell.extend({
        /**
         Render a text string in a table cell. The text is converted from the
         model's raw value for this cell's column.
         */
        render: function () {
            this.$el.empty();
            var model = this.model;
            var callback = this.column.get('callback');
            this.$el.text(this.formatter.fromRaw(callback(model)));
            this.delegateEvents();
            return this;
        },
    });

        Backgrid.Extension.ServerSideFilter = Backgrid.Extension.ServerSideFilter.extend({
            template: _.template('<div class="input-group">\
            <input type="search" <% if (placeholder) { %> placeholder="<%- placeholder %>" <% } %> name="<%- name %>" class="form-control" />\n\
            <span class="input-group-addon">\n\
                <a class="clear" data-backgrid-action="clear" href="#"><i class="fa fa-remove"></i></a>\
            </span></div>', null, {variable: null}),
            /**
             Upon search form submission, this event handler constructs a query
             parameter object and pass it to Collection#fetch for server-side
             filtering.
             
             If the collection is a PageableCollection, searching will go back to the
             first page.
             */
            search: function (e) {
                if (e) {
                    e.preventDefault();
                }

                var data = {};
                var query = this.searchBox().val();
                if (query) {
                    data[this.name] = query;
                }

                var collection = this.collection;
                // go back to the first page on search
                if (Backbone.PageableCollection &&
                        collection instanceof Backbone.PageableCollection) {
                    collection.getFirstPage({data: data, reset: true, fetch: true, error: App.FlashManager.fromXhr});
                } else {
                    collection.fetch({data: data, reset: true, error: App.FlashManager.fromXhr});
                }
            }
        });


    return Backgrid;
});