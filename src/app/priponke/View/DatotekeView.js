// @formatter:off
define([
    'marionette',
    'jquery',
    'underscore',
    'text!../tpl/datoteka-item.tpl',
    '../Model/DatotekeCollection',
    'app/util'
], function(
        Marionette, 
        $, 
        _, 
        tpl, 
        DatotekeCollection, 
        util) {
// @formatter:on
    var prazno = _.template('Prazen seznam'), DatotekePrazne = Marionette.ItemView.extend({
        template : prazno
    });

    var DatotekaListItem = Marionette.ItemView.extend({
        className : 'filemanager-datoteka',
        template : _.template(tpl),
        tagName : 'li',
        events : {
            'click' : 'select',
            'dragstart' : 'handleDragstart',
            'dragend' : 'handleDragend'
        },
        onRender : function() {
            this.$el.prop('draggable', 'true');
            this.listenTo(this.model, 'change', this.render);
        },
        templateHelpers : util,
        select : function(event) {
            this.$el.addClass('active');
            this.trigger('item:select', this);
        },
        deselect : function() {
            this.$el.removeClass('active');
        },
        /**
         * Handler za dogodek dragstart.
         * @param {type} e
         * @returns {undefined}
         */
        handleDragstart : function(e) {
            this.$el.addClass('element-in-dragging');
            this.$el.data('view', this);
            e.originalEvent.dataTransfer.effectAllowed = 'all';
            e.originalEvent.dataTransfer.setData('text/html', 'xxx');
            e.stopPropagation();
        },
        /**
         * Handler za dogodek dragend.
         * @param {type} e
         * @returns {undefined}
         */
        handleDragend : function(e) {
            this.$el.removeClass('element-in-dragging');
            this.$el.data('view', null);
        },
    });

    var DatotekeView = Marionette.CollectionView.extend({
        itemView : DatotekaListItem,
        emptyView : DatotekePrazne,
        className : "filemanager-filelist",
        tagName : "ul",
        initialize : function(options) {
            if (!options.mapa) {
                this.mapa = {
                    id : null
                };
            } else {
                this.mapa = options.mapa;
            }
            if (!this.collection) {
                this.collection = new DatotekeCollection();
                this.collection.fetch({
                    data : {
                        mapa : this.mapa.id
                    },
                    processData : true
                });
            }
            this.on('itemview:item:select', this.onSelect);

        },
        /**
         *  za klik event
         */
        onSelect : function(childView) {
            if (this.selected && this.selected !== childView) {
                this.selected.deselect();
            }
            this.selected = childView;
            this.trigger('datoteka:izbrana', childView.model);
        },
        /**
         * za nastaviti od zunaj
         */
        setSelected : function(model) {
            if (this.selected && this.selected.model !== model) {
                this.selected.deselect();
            }

            var child = this.children.findByModel(model);
            child.render();
            child.select();
        },
        onRender : function() {

        },
    });
    return DatotekeView;
});
