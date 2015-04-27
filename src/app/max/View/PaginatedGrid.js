/**
 *  Paginateg grid....
 */

define([
    'backbone',
    'marionette',
    'underscore',
    './PaginatorControl',
    'text!../tpl/paginated-grid.tpl',
    'backgrid'
], function(Backbone, Marionette, _, PaginatorControl, tpl, Backgrid) {


    var SumItemView = Marionette.ItemView.extend({
         className: "row",
        template: _.template('<div class="col-xs-6"><%= label %></div><div class="col-xs-6"><span class="pull-right"><%= sum %></span></div>'),
        initialize: function(options) {
            this.listenTo(this.model, 'change:sum', this.render);
            this.formatter = new Backgrid.NumberFormatter();
        },
        serializeData: function() {
            return {
                label: this.model.get('label'),
                sum: this.formatter.fromRaw(this.model.get('sum'))
            };
        }
    });

    var PartialItemView = Marionette.ItemView.extend({
        className: "row",
        template: _.template('<div class="col-xs-6"><%= label %></div><div class="col-xs-6"><span class="pull-right"><%= sum %></span><span style="min-width:100px"><%= proc %>%</span></div>'),
        initialize: function(options) {
            this.listenTo(this.model, 'change:part', this.render);
            this.formatter = new Backgrid.NumberFormatter();
        },
        serializeData: function() {
            return {
                label: this.model.get('label'),
                proc: this.formatter.fromRaw(this.model.get('part')/this.model.get('sum') * 100),
                sum: this.formatter.fromRaw(this.model.get('part'))
            };
        }
    });

    var SumsView = Marionette.CollectionView.extend({
        itemView: SumItemView,
        className: 'dl-horizontal',
        tagName: 'dl'
    });

    var PartView = SumsView.extend({
        itemView: PartialItemView
    });

    var SumFooter = Marionette.ItemView.extend({
        template: _.template('<div class="col-sm-6"><h5> <%= sumTitle %> </h5><div class="sum"></div></div>\
    <div class="col-sm-6"><h5> <%= partTitle %> </h5><div class="partial"></div></div>'),
        className: 'row',
        selectable: false,
        initialize: function(options) {
            this.collection = options.collection;
            this.grid = options.grid;

            this.listenTo(this.collection, 'backgrid:selected', this.posodobiVsote);
            this.listenTo(this.collection, 'sync', this.posodobiVsote);
            this.listenTo(this.collection, 'reset', this.posodobiVsote);
            if (options.editable) {
                this.listenTo(this.collection, 'add', this.posodobiVsote);
                this.listenTo(this.collection, 'remove', this.posodobiVsote);
                this.listenTo(this.collection, 'backgrid:edited', this.posodobiVsote);
            }
      
            /**
             * 
             * Pogledam, če ima select-all kolono, pomeni, da lahko delam delne vsote
             */
            this.selectable = this.grid.columns.findWhere({cell: Backgrid.Extension.SelectRowCell});
            this.sumColl = new Backbone.Collection();

            var self = this;
            _.each(options.fields, function(val, key) {
                self.sumColl.add({
                    'field': key,
                    'label': val,
                    'sum': 0,
                    'part': 0
                });
            });
        },
        serializeData: function() {
            
            return {
                partTitle: this.selectable ? 'Delno' : '',
                sumTitle: 'Skupaj'
            };
        },
        posodobiVsote: function() {
            var self = this;
            var fields = this.sumColl.pluck('field');
            var sum = {};
            _.each(fields, function(f) {
                sum[f] = [0, 0];
            });

            var selected;
            if (this.selectable) {
                var selectedModels = this.grid.getSelectedModels();
                selected = function(model) {
                    if (_.indexOf(selectedModels, model) >= 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                };
            } else {
                selected = function() {
                    return 0;
                };
            }
            var coll = this.collection.fullCollection || this.collection;
            
            coll.each(function(model) {
                _.each(fields, function(p) {
                    sum[p] = [
                        sum[p][0] + model.get(p),
                        sum[p][1] + model.get(p) * selected(model)
                    ];

                });
            });

            _.each(sum, function(val, key) {
                var sumModel = self.sumColl.findWhere({'field': key});
                sumModel.set('sum', val[0]);
                sumModel.set('part', val[1]);
            });


        },
        onRender: function() {

            var sums = new SumsView({
                el: this.$('.sum'),
                collection: this.sumColl
            });
            sums.render();

            if (this.selectable) {
                var partials = new PartView({
                    el: this.$('.partial'),
                    collection: this.sumColl
                });
                partials.render();
            }
        }

    });


    var PaginatedGrid = Marionette.LayoutView.extend({
        template: _.template(tpl),
        entity: '',
        paginatorName: 'default',
        className: '',
        regions: {
            gridR: '.grid',
            pagerR: '.grid-paginator',
            filterR: '.grid-filter',
            footerR: '.footer'
        },
        gridView: null,
        filterView: new Marionette.ItemView({template: function() {
                return '';
            }
        }),
        footerView: null,
        paginatorView: null,
        collection: null,
        columns: [],
        constructor: function(options) {

            Marionette.LayoutView.prototype.constructor.call(this, options);

            this.collection = options.collection || this.collection || null;
            this.columns = options.columns || this.columns || [];
            
            this.gridView = new Backgrid.Grid(_.pick(options, 'collection','columns', 'row'));
        
            this.paginatorView = new PaginatorControl({
                collection: this.collection,
                size: 'medium'
            });
            var self = this;
            this.filterView = options.filterView || this.filterView;

            if (_.isObject(options.sums)) {
                this.footerView = new SumFooter({
                    collection: this.collection,
                    fields: options.sums,
                    grid: this.gridView
                });
            } else {
                this.footerView = new Marionette.ItemView({template: _.template('')});
            }

            this.gridFilterClass = options.gridFilterClass || 'col-sm-6';
        },
        initialize: function (options) {
            // Polna višina ali omejena?
            this.gridClass = options.gridContainerClass || 'backgrid-container';
        },
        serializeData: function () {
            return {
                gridFilterClass: this.gridFilterClass,
                gridClass: this.gridClass
            };
        },
        onBeforeRender: function() {
            //   this.pager.show(this.paginatorView);
        },
        render: function() {
            Marionette.LayoutView.prototype.render.call(this);
            this.gridR.show(this.gridView);
            this.pagerR.show(this.paginatorView);
            this.filterR.show(this.filterView || new Backgrid.Extension.ServerSideFilter({
                collection: this.collection
            }));
            if (this.footerView) {
                this.footerR.show(this.footerView);
            }

        },
        getData: function() {
            if (this.filterR.currentView.getData) {
                return this.filterR.currentView.getData();
            } else {
                return {};
            }
        }
    });

    return PaginatedGrid;

});