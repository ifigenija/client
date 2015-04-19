/* 
 * Licenca GPL V3 or later
 *  
 */



define(['underscore',
    'jquery',
    './DropDownButton',
    'marionette',
    './KontekstDialog',
    '../../Model/Kontekst',
    '../../Model/Toolbar'
], function (_,
        $,
        DropDownButton,
        Marionette,
        KontekstDialog,
        KontekstModel,
        ToolbarModel) {


    var Dropdown = DropDownButton.prototype.Dropdown;

    var KontekstItem = Dropdown.prototype.Link.extend({
        template: _.template('<a href="#">\
    <%= ime %>\
    <% if (!global || (global && globalPermission)) { %>\
        <i class="fa fa-remove pull-right"></i>\
    <% } %>\
</a>'),
        events: {
            'click a': 'select',
            'click i': 'destroy'
        },
        serializeData: function () {
            return _.extend(
                    this.model.toJSON(),
                    {globalPermission: this.model.collection.globalPermission}
            );
        },
        select: function () {
            var kontekst = this.model.toJSON();
            this.model.collection.trigger('select', this.model);
        },
        destroy: function (e) {
            this.model.destroy();
            e.stopImmediatePropagation(); // prepreči this.select
        }
    });

    var tplDodaj = '<a href="#">Dodaj</a>';
    var KontekstDodaj = Dropdown.prototype.Link.extend({
        template: _.template(tplDodaj),
        events: {'click': 'click'},
        click: function () {
            // to-do: premakni modal iz layouta v svoj view
            var model = new KontekstModel.model();
            var dialog = new KontekstDialog({collection: this.collection,
                model: model,
                form: this.options.form});
            $('#modal').append(dialog.render().el);
        }
    });



    var KontekstDropdown = Dropdown.extend({
        itemView: KontekstItem,
        initialize: function (options) {


            this.on('dropdown', this.update, this);
            this.collection = new KontekstModel.collection({}, {kontekst: options.model.get('kontekst')});
            this.global = new Dropdown.prototype.Header({model: new ToolbarModel.element({label: 'Skupni konteksti'})});
            this.local = new Dropdown.prototype.Header({model: new ToolbarModel.element({label: 'Moji konteksti'})});
            this.divider = new Dropdown.prototype.Divider();
            this.form = options.model.get('form');
            this.button = new KontekstDodaj({
                collection: this.collection,
                form: this.form
            });
            if (this.collection.listener) {
                this.listenTo(this.collection, 'select', function (model) {
                    model.collection.listener.triggerMethod('filter:select', model);
                });
            }

        },
        update: function () {
            this.collection.fetch();
        },
        getGlobal: function () {
            return this.global.$el.nextUntil('.dropdown-header');
        },
        getLocal: function () {
            return this.local.$el.nextUntil('.divider');
        },
        onRender: function () {
            this.$el.append([
                this.global.hide().render().$el,
                this.local.hide().render().$el,
                this.divider.hide().render().$el,
                this.button.render().$el
            ]);
        },
        appendHtml: function (collectionView, itemView, index) {
            var global = itemView.model.attributes.global;
            var header = global ? this.global : this.local;

            var $global = this.getGlobal();
            var $items = global ? $global : this.getLocal();

            if (!global) {
                index -= $global.size();
            }
            if ($items.size() === 0) { // dodaj prvi element
                header.$el.after(itemView.el);
                header.show();
                this.divider.show();
            } else if ($items.size() - 1 < index) { // dodaj na konec
                $items.last().after(itemView.el);
            } else { // vstavi pred index
                $items.eq(index).before(itemView.el);
            }
        },
        itemViewOptions: function (item) {
            return {
                form: this.form
            };
        },
        onItemRemoved: function (itemView) {
            var global = itemView.model.attributes.global;
            var header = global ? this.global : this.local;
            var items = this.collection.where({global: global});

            if (this.collection.length === 0) {
                this.divider.hide();
            }

            if (items.length === 0) {
                header.hide();
            }
        }
    });



    var KontekstButton = DropDownButton.extend({
        className: 'btn btn-default dropdown-toggle',
        template: _.template('<%= label %> <span class="caret"></span>'),
        Dropdown: KontekstDropdown,
        initialize: function (options) {
            DropDownButton.prototype.initialize.apply(this, arguments);
            _.extend(this, _.pick(options, 'size', 'listener', 'form'));
            this.$el.attr('data-toggle', 'dropdown');
            this.$el.dropdown();

        }



    });


    return KontekstButton;

});