define([
    'marionette',
    'jquery',
    'underscore',
    'text!../tpl/priponka-item.tpl'

],
        function(Marionette, $, _, tpl) {

            var PriponkaListItem = Marionette.ItemView.extend({
                tagName: 'a',
                className: 'list-group-item',
                template: _.template(tpl),
                events: {
                    'click': 'select'
                },
                render: function() {
                    if (this.model.attributes.hasOwnProperty('jeMapa')) {
                        this.$el.html(this.template(this.model.attributes));
                    } else {
                        this.$el.html('&nbsp;');
                    }
                    return this;
                },
                select: function(event) {
                    this.$el.addClass('active');
                    this.trigger('item:select', this);
                },
                deselect: function() {
                    this.$el.removeClass('active');
                }
            });


            var PriponkeList = Marionette.CollectionView.extend({
                itemView: PriponkaListItem,
                initialize: function(options) {
                    this.owner = options.owner;
                    this.ownerClass = options.ownerClass;
                    this.on('itemview:item:select', this.onSelect);
                    if (options.vent) {
                        this.vent = options.vent;
                    }
                },
                /**
                 *  za klik event
                 *  @param {PriponkaListItem} childView Izbrani view
                 */
                onSelect: function(childView) {
                    if (this.selected && this.selected !== childView) {
                        this.selected.deselect();
                    }
                    this.selected = childView;
                    this.trigger('priponka:selected', childView.model);
                },
                /**
                 * za nastaviti od zunaj
                 * @param {Priponka} model Izbran model
                 */
                setSelected: function(model) {
                    if (this.selected && this.selected.model !== model) {
                        this.selected.deselect();
                    }

                    var child = this.children.findByModel(model);
                    child.render();
                    child.select();
                },
            });
            return PriponkeList;
        });