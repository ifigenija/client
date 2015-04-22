define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    './PaginatorControl',
    '../Model/LookupModel',
    'text!../tpl/lookup-grid.tpl',
],
        function (
                $,
                _,
                Backbone,
                Marionette,
                PaginatorControl,
                LookupModel,
                tpl)
        {
            var LookupGrid = Marionette.LayoutView.extend({
                template: _.template(tpl),
                regions: {
                    filter: '.lookup-filter',
                    paginator: '.lookup-paginator',
                    grid: '.lookup-grid'
                },
                events: {
                    'click .close': function () {
                        this.triggerMethod('close');
                    },
                    'resize window': 'resizeGrid'
                },
                /**
                 * Inicializacija parametrov
                 *
                 * @param {object} options opcije
                 * @returns {undefined}
                 */
                initialize: function (options) {
                   
                    this.collection = options.collection || null;
                    this.collection.state.pageSize = Number(localStorage.getItem('tip-per-page') || 20);
                    this.minLength = this.minLength || 3;
                    this.required = this.required || false;
                    this.fieldname = options.fieldname || '';
                    if (options.search) {
                        this.search = options.search;
                    } else {
                        this.search = '';
                    }

                    this.collection.state.fullEntity = options.fullEntity || 0;
                },
                serializeData: function () {
                    return  {field: this.fieldname};
                },
                onRender: function () {
                    var columns = ['ident', 'label'];

                    var data = {};
                    // če je bil v vnosnem polju vpisan iskalni pojem 
                    // potem ga nastavimo za query parameter
                    if (this.search) {
                        data.q = this.search;
                    }
                    var fm = window.App.FlashManager;
                    var ui = window.App.UI;
                    // naložim prvo stran 
                    this.collection.getFirstPage({
                        async: false,
                        data: data,
                        error: fm.fromXhr
                    });
                    var filter = new ui.Backgrid.Extension.ServerSideFilter({
                        collection: this.collection,
                        name: 'q',
                        placeholder: 'Išči..'
                    });
                    if (this.collection.meta) {
                        columns = this.collection.meta;
                        _.each(columns, function (item) {
                            _.extend(item, {editable: false});
                        });
                    }
                    var paginator = new PaginatorControl({
                        collection: this.collection
                    });
                    
                    var grid = new ui.Backgrid.Grid({
                        row: ui.Backgrid.ClickableRow,
                        columns: columns,
                        collection: this.collection
                    });
                    //  this.listenTo(this.collection, 'selectValue', this.onSelectRow);
                    // this.listenTo(this.grid, 'rendered', this.resizeGrid);
                    this.paginator.show(paginator);

                    this.filter.show(filter);
                    if (this.search !== '') {
                        filter.searchBox().val(this.search);
                    }
                    this.grid.show(grid);
                    filter.searchBox().select();

                    this.listenTo(this.collection, 'sync', this.resizeGrid);
                    _.bindAll(this, 'resizeGrid');
                    $('window').on('resize', this.resizeGrid);
                },
                onClose: function () {
                    $('window').off('resize', this.resizeGrid);
                },
                onSelectRow: function (view) {
                    // console.log(view);
                },
                resizeGrid: function (event) {
                    this.$('.lookup-grid').css('height', this.$el.height() - this.$('.lookup-header').outerHeight() - this.$('.lookup-tools').outerHeight() - 3);
                }
            });
            return LookupGrid;
        });