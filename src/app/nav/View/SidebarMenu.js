/* 
 * Licenca GPLv3
 * 
 * Stranski menu 
 */

define([
    'marionette',
    'app/handlebars',
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
            console.log('dropitem', this.model);
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
        className: "navbar-nav nav",
        getChildView: function (item) {
            console.log(item);
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
        var height3 = $(window).height();
        var height1 = $('.nav').height() + 50;
        height2 = $('.main').height();
        if (height2 > height3) {
            $('html').height(Math.max(height1, height3, height2) + 10);
            $('body').height(Math.max(height1, height3, height2) + 10);
        }
        else
        {
            $('html').height(Math.max(height1, height3, height2));
            $('body').height(Math.max(height1, height3, height2));
        }
    };

    /**
     * Vrhnji vew za stranski menu 
     * 
     * @type Marionette.ItemView
     */
    var SidebarMenu = Marionette.ItemView.extend({
        className: "navbar navbar-inverse sidebar",
        tagName: "nav",
        template: Handlebars.compile(sidebarTpl),
        onRender: function () {

            var menu = new MenuItems({
                collection: this.model.get('pages')
            });

            this.$el.append(menu.el);
            menu.render();
            this.$el.prop('role', 'navigation');

            /**
             * Povežemo dogodke za update višine navigacije 
             */
            $(document).ready(function () {
                htmlbodyHeightUpdate();
                $(window).resize(function () {
                    htmlbodyHeightUpdate();
                });
                $(window).scroll(function () {
                    htmlbodyHeightUpdate();
                });
            });

        }
    });

    return SidebarMenu;

});