define(['jquery',
    'backbone',
    'marionette',
    'underscore',
    './Button'], function (
        $,
        Backbone,
        Marionette,
        _,
        Button) {

// funkcija, ki selekta vsebino elementa
    var selectElementContents = function (el) {
        var body = document.body, range, sel;
        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents();
                sel.addRange(range);
            } catch (e) {
                range.selectNode(el);
                sel.addRange(range);
            }
        } else if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }
    };

    // Item view za izbor tabele, ko je več tabel na strani
    var TableSelectItem = Marionette.ItemView.extend({
        tagName: 'a',
        className: 'list-group-item unselectable',
        template: _.template('Tabela <%= id + 1 %>'),
        triggers: {
            'mouseenter': 'hilite:table',
            'mouseleave': 'dehilite:table',
            'mousedown': 'sel:table'
        },
        onHiliteTable: function () {
            $(this.model.get('el')).css({'background-color': '#d1d1d1'});
            return false;
        },
        onDehiliteTable: function () {
            $(this.model.get('el')).css({'background-color': ''});
            return false;
        },
        onSelTable: function (e) {
            this.onDehiliteTable();
            selectElementContents(this.model.get('el'));
            this.trigger('table:selected');
        },
        onRender: function () {
            this.$el.attr('href', 'javascript:void(0)');
        }

    });

    /**
     * 
     * @type @exp;Marionette@pro;CompositeView
     */
    var TableSelectCompositeView = Marionette.CompositeView.extend({
        triggers: {
            'click button': "close:popover"
        },
        template: _.template('<div><div class="list-group"></div><button>Zapri</button></div>'),
        itemViewContainer: '.list-group',
        itemView: TableSelectItem
    });


    var SelectTableButton = Button.extend({
        events: {
            'click': 'onClick'
        },
        onClick: function () {
            var tables = $('.page-active').find('table');
            var self = this;


            if (tables.length > 1) {

                // če je več tabel potem naredim kolekcijo z vsemi tabelami
                var coll = new Backbone.Collection();
                tables.each(function (ind, el) {
                    coll.add({id: ind, el: el});
                });
                // naredim izirno okno za tabelo
                this.chooser = new TableSelectCompositeView({
                    collection: coll
                });

                this.$el.popover({
                    animation: true,
                    html: true,
                    content: this.chooser.el,
                    trigger: 'manual',
                    title: 'Izberi tabelo',
                    placement: 'bottom'
                });
                this.$el.popover('show');
                this.chooser.render();
                this.$el.on('hide.bs.popover', function () {
                    self.chooser.close();
                    self.$el.off('hide.bs.popover');
                });
                this.$el.on('hidden.bs.popover', function () {
                    self.$el.off('hidden.bs.popover');
                    self.$el.popover('destroy');
                });
                this.listenTo(this.chooser, 'close:popover', this.onClosePopover);
                this.listenTo(this.chooser, 'itemview:table:selected', this.onTableSelected);
            } else {
                selectElementContents(tables[0]);
            }

        },
        onTableSelected: function (view) {
            this.onClosePopover();
        },
        onClosePopover: function () {
            this.$el.popover('hide');
        }
    });

    return SelectTableButton;
});