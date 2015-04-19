define(['application', 'underscore', 'marionette', '../Model/TreeModel'],
        function(App, _, Marionette, TreeModel) {

            var templateNode = _.template('<span>\
  <i class=\'tree-view-chevron <%=(hasChildren ? "fa fa-chevron-right" : "")%>\'></i>\
     <i class="tree-view-icon"></i> \
<a id="<%=autoId%>" class="tree-view-label"> <%=label%></a></span>\
<div class="clearfix"></div>\
  <ul class="tree-view-list">\
  </ul>');
            var TreeNode = Marionette.CompositeView.extend({
                tagName: "li",
                className: "tree-view-node clearfix",
                itemViewContainer: ".tree-view-list",
                template: templateNode,
                /**
                 * ui elementi
                 */
                ui: {
                    chevron: ".tree-view-chevron",
                    label: "a.tree-view-label",
                    list: ".tree-view-list",
                    icon: ".tree-view-icon"
                },
                /**
                 * dogodki, ki jih poslušamo
                 */
                triggers: {
                    "click .tree-view-chevron": {
                        event: "toggle:view",
                        preventDefault: true,
                        stopPropagation: true
                    },
                    "click .tree-view-label": {
                        event: "select",
                        preverntDefault: true,
                        stopPropagation: true
                    }
                },
                /**
                 * Inicializacija vozlišča
                 *
                 * @param object options
                 * @returns {undefined}
                 */
                constructor: function(options) {
                    this.template = options.template || this.template;
                    this.listView = options.listView;
                    this.eventPrefix = options.eventPrefix || '';
                    _.bindAll(this, 'select');
                    this.readOnly = options.readOnly || false;
                    var args = Array.prototype.slice.apply(arguments);
                    Marionette.CompositeView.prototype.constructor.apply(this, args);

                    this.on('select', this.select);
                    this.on('toggle:view', this.toggleView);
                },
                /**
                 * Opcije, ki se pošljejo v Item view, ko se renderira kolekcija
                 * @returns {_L1.Anonym$0.itemViewOptions.Anonym$1}
                 */
                itemViewOptions: function() {
                    return {
                        eventPrefix: this.eventPrefix,
                        droppable: this.droppable,
                        readOnly: this.readOnly,
                        listView: this.listView
                    };
                },
                /**
                 * Kreiraj in poveži kolekcijo z otroki
                 * @returns {undefined}
                 */
                bindCollection: function() {
                    var models = [];
                    this.model.expand();
                    this.collection = this.model.get('children');
                    //  this.listenTo(this.collection, 'destroy', this.render);
                },
                /**
                 * Ko se template nariše poskrbimo še za dodatne olepšave in stribute
                 * @returns {undefined}
                 */
                render: function() {
                    // this.bindCollection();
                    Marionette.CompositeView.prototype.render.apply(this);
                    if (this.model.hasChildren()) {
                        this.$el.addClass("tree-view-branch");
                    } else {
                        this.$el.addClass("tree-view-leaf");
                    }

                    if (this.model.get("class")) {
                        this.ui.icon.addClass(this.model.get("class"));
                    } else {
                        this.ui.icon.addClass('fa fa-folder-close-alt');
                    }
                    if (this.droppable) {
                        this.ui.label.prop('draggable', 'true');
                    }
                    this.switchChevron();
                },
                /**
                 * rekurzivno išče ali ta view vsebuje iskanega
                 *
                 * @param {MapaTreeNode}
                 * @returns {bool}
                 */
                containsView: function(v) {
                    if (!this.children.findByCid(v.cid)) {
                        return this.children.find(function(view) {
                            return view.containsView.apply(view, [v]);
                        });
                    }
                    return true;
                },
                /**
                 * Open / close child folder list
                 * @returns {Boolean}
                 */
                toggleView: function(open) {
                    var self = this;
                    if (this.model.isNew()) {
                        return false;
                    }
                    if (!this.collectionLoaded) {
                        this.bindCollection();
                        this.collection.fetch({
                            success: function() {
                                self.render();
                                self.collectionLoaded = true;
                            },
                            error: App.FlashManager.fromXhr,
                            async: false
                        });
                    }

                    if (open === true) {
                        this.$el.addClass("open");
                    } else {
                        this.$el.toggleClass("open");
                    }
                    this.switchChevron();
                    return false;
                },
                /**
                 * Preklopi chevron znak in ikono na mapi glede na stanje odrtosti / zaprtosti
                 * @returns {unresolved}
                 */
                switchChevron: function() {
                    if (!this.model.hasChildren()) {
                        return;
                    }

                    if (this.$el.hasClass("open")) {
                        this.ui.chevron.removeClass('fa fa-chevron-right');
                        this.ui.chevron.addClass('fa fa-chevron-down');
                        if (this.model.get("class")) {
                            this.ui.icon.removeClass(this.model.get("class"));
                        } else {
                            this.ui.icon.removeClass('fa fa-folder-close-alt');
                        }
                        this.ui.icon.addClass('fa fa-folder-open-alt');

                    } else {
                        this.ui.chevron.removeClass('fa fa-chevron-down');
                        this.ui.chevron.addClass('fa fa-chevron-right');
                        this.ui.icon.removeClass('fa fa-folder-open-alt');
                        if (this.model.get("class")) {
                            this.ui.icon.addClass(this.model.get("class"));
                        } else {
                            this.ui.icon.addClass('fa fa-folder-close-alt');
                        }
                    }

                },
                /**
                 * Odstrani status izbranega iz mape
                 * @returns {undefined}
                 */
                deselect: function() {
                    this.ui.label.removeClass('tree-node-selected');
                    this.listView.off('node:deselect');
                },
                /**
                 * Event handler, ki se odzove na izbor mape in sproži dogodke
                 * za izključitev prejšnjega izbora in dogodek, ki javi staršu, da je mapa izbrana
                 * @returns {Boolean}
                 */
                select: function(event) {
                    var trenutna;
                    this.ui.label.addClass('tree-node-selected');

                    if (this.listView.selectedNode !== this.model) {
                        this.listView.selectedNode = this.model;
                        this.listView.triggerMethod('node:deselect');
                        this.listView.on('node:deselect', this.deselect, this);
                    }
                    this.listView.triggerMethod('node:selected', this);
                    return false;
                },
                /**
                 * Pripravi podatke za izris
                 * @returns {_L1.Anonym$0.serializeData.Anonym$5}
                 */
                serializeData: function() {
                    return {
                        autoId: _.uniqueId(),
                        hasChildren: this.model.hasChildren(),
                        model: this.model.attributes,
                        label: this.model.getLabel(),
                        id: this.model.id
                    };
                },
            });

            var TreeList = Marionette.CollectionView.extend({
                tagName: "ul",
                className: "tree-view-root",
                selectedNode: null,
                constructor: function(options) {
                    this.droppable = Marionette.getOption(this, 'droppable') || false;
                    this.readOnly = Marionette.getOption(this, 'readOnly') || false;
                    this.itemTemplate = Marionette.getOption(this, 'itemTemplate') || false;
                    this.itemView = Marionette.getOption(this, 'itemView') || TreeNode;
                    var args = Array.prototype.slice.apply(arguments);
                    Marionette.CollectionView.prototype.constructor.apply(this, args);
                    this.eventPrefix = Marionette.getOption(this, 'eventPrefix') || this.cid;

                },
                itemViewOptions: function() {
                    return {
//                        template: this.itemTemplate,
                        droppable: this.droppable,
                        eventPrefix: this.eventPrefix,
                        readOnly: this.readOnly,
                        listView: this
                    };
                },
                onNodeSelected: function(view) {
                    this.triggerMethod('selected', view);
                }
            });

            return {TreeList: TreeList, TreeNode: TreeNode};
        });