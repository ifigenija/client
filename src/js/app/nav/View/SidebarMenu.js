/* 
 * Licenca GPLv3
 * 
 * Stranski menu 
 */

define([
    'marionette',
    'app/bars',
    'text!../tpl/sidebar.tpl',
    'text!../tpl/menu-item.tpl',
    'text!../tpl/dropdown.tpl'
], function (
        Marionette,
        Handlebars,
        sidebarTpl,
        menuTpl,
        dropDownTpl
        ) {


    /**
     * Najnižji nivo menuja 
     * 
     * @type Marionette.ItemView
     */
    var DropDownItem = Marionette.ItemView.extend({
        tagName: "li",
        template: Handlebars.compile('<a href="{{ uri }}"><span class="fa"></span> {{ label }}</a>'),
        onRender: function () {
            if (this.model.get('divider')) {
                this.$el.html('');
                this.$el.addClass('divider');
                return;
            }
            if (this.model.get('icon')) {
                this.$(".fa").addClass(this.model.get('icon'));
            }
        }
    });


    /**
     * Postavka v menuju, ki se razširi 
     * 
     * @type Marionette.CompositeView
     */
    var DropDownMenu = Marionette.CompositeView.extend({
        tagName: 'li',
        className: 'dropdown',
        template: Handlebars.compile(dropDownTpl),
        childView: DropDownItem,
        childViewContainer: ".dropdown-menu"
    });

    /**
     * Postavka v menuju, ki nima podtočk
     * @type Marionette.ItemView
     */
    var MenuItem = Marionette.ItemView.extend({
        tagName: 'li',
        template: Handlebars.compile(menuTpl)
    });

    /**
     * 
     * Seznam postavk v menuju. Različno glede na strukturo menuja
     * 
     * @type Marionette.CollectionView
     */
    var MenuItems = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: "nav navbar-nav",
        getChildView: function (item) {
            if (item.get('pages')) {
           
              return DropDownMenu;
            } else {
                return MenuItem;
            }
        },
        childViewOptions: function (item, index) {
            if (item.get('pages')) {
                return {
                    collection: item.get('pages')
                };
            }
        }

    });

    /**
     * Funkcija za posodobitev višine ob resize in ob scroll
     * @param {type} height2
     * @returns {undefined}
     */
    var htmlbodyHeightUpdate = function (height2) {
        var height3 = this.$(window).height();
        var height1 = this.$('.nav').height() + 50;
        height2 = this.$('.main').height();
        if (height2 > height3) {
            this.$('html').height(Math.max(height1, height3, height2) + 10);
            this.$('body').height(Math.max(height1, height3, height2) + 10);
        }
        else
        {
            this.$('html').height(Math.max(height1, height3, height2));
            this.$('body').height(Math.max(height1, height3, height2));
        }
    };

    /**
     * Vrhnji vew za stranski menu 
     * 
     * @type Marionette.ItemView
     */
    var SidebarMenu = Marionette.ItemView.extend({
        className: "navbar navbar-inverse",
        tagName: "nav",
        template: Handlebars.compile(sidebarTpl),
        onRender: function () {

            var menu = new MenuItems({
                collection: this.model.get('pages')
            });

            this.$el.find('#navbar').append(menu.el);
            menu.render();
            this.$el.prop('role', 'navigation');

           

        }
    });

    return SidebarMenu;

});