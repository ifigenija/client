define(['marionette',
    'underscore',
    'text!../tpl/paginator-control.tpl'
], function(Marionette, _, tpl) {

    var PaginatorControl = Marionette.ItemView.extend({
        /** @property */
        className: "btnGroup paginator-control",
        /** @property */
        tagName: 'div',
        /** @property */
        template: _.template(tpl),
        /** @property */
        events: {
            "change input[name='pageNo']": "gotoPage",
            'click .first': "first",
            'click .last': "last",
            'click .prev': "prev",
            'click .next': "next",
            'change .per-page-count': 'onChangePageSize'
        },
        sizes: {
            full: 4,
            medium: 3,
            small: 2,
            micro: 1
        },
        /**
         Initializer.
         
         @param {Object} options
         @param {Backbone.Collection} options.collection
         @param {boolean} [options.fastForwardHandleLabels] Whether to render fast forward buttons.
         */
        initialize: function(options) {
            var collection = options.collection;
            var fullCollection = collection.fullCollection;
            if (fullCollection) {
                this.listenTo(fullCollection, "add", this.render);
                this.listenTo(fullCollection, "remove", this.render);
                this.listenTo(collection, "reset", this.render);
                this.listenTo(fullCollection, "sync", this.render);
            }
            else {
//       this.listenTo(collection, "add", this.render);
//       this.listenTo(collection, "remove", this.render);
                this.listenTo(collection, "sync", this.render);
            }
            this.size = options.size || 'full';
        },
        /**
         jQuery event handler for the page handlers. Goes to the right page upon
         clicking.
         
         @param {Event} e
         */
        first: function() {
            this.collection.getFirstPage();
        },
        prev: function() {
            this.collection.getPreviousPage();
        },
        next: function() {
            this.collection.getNextPage();
        },
        last: function() {
            this.collection.getLastPage();
        },
        gotoPage: function() {
            var i = this.$("input[name='pageNo']").val();
            if (Number(i) > 0 && Number(i) < this.collection.state.totalPages) {
                this.collection.getPage(Number(i));
            }
        },
        /**
         Render the paginator handles inside an unordered list.
         */
        render: function() {
            this.$el.empty();
            var state = this.collection.state ||
                    {
                        currentPage: this.collection.currentPage,
                        pageSize: this.collection.pageSize,
                        maxRecords: this.collection.maxRecords
                    };
                    
            this.$el.append(this.template({
                state: this.collection.state,
                size: this.sizes[this.size] || '3'
            }));
            this.delegateEvents();
            return this;
        },
        onChangePageSize: function(event) {
            localStorage.setItem('tip-per-page', this.$('.per-page-count').val());
            this.collection.setPageSize(Number(this.$('.per-page-count').val()));
        }
    });
    return PaginatorControl;
});