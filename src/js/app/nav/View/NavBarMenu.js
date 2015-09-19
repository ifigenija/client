/* 
 * Licenca GPLv3
 * 
 * Stranski menu 
 */

define([
    'marionette',
    'app/bars',
    'template!../tpl/navbar.tpl',
    'template!../tpl/dropdown.tpl'
], function (
        Marionette,
        Handlebars,
        navbarTpl,
        dropDownTpl
        ) {


    /**
     * Najnižji nivo menuja 
     * 
     * @type Marionette.ItemView
     */
    var DropDownItem = Marionette.ItemView.extend({
        tagName: "li",
        template: Handlebars.compile('<a href="{{ uri }}"><span class="fa {{ icon }}"></span> {{ label }}</a>'),
        modelEvents: {
            change: "modelChanged"
        },
        modelChanged: function () {
            this.render();
        },
        onRender: function () {
            if (this.model.get('divider')) {
                this.$el.html('');
                this.$el.addClass('divider');
                return;
            }
            if (this.model.get('selected')) {
                this.$el.addClass('active');
            } else {
                this.$el.removeClass('active');
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
        template: dropDownTpl,
        childView: DropDownItem,
        childViewContainer: ".dropdown-menu",
        addChild: function (child, ChildView, index) {
            if (child.isGranted()) {
                Marionette.CompositeView.prototype.addChild.apply(this, arguments);
            }
        },
        initialize: function () {
            this.model.on("change", this.modelChanged, this);
        },
        modelChanged: function () {
            this.render();
        },
        onRender: function () {
            if (this.model.get('selected')) {
                this.$el.addClass('active');
            } else {
                this.$el.removeClass('active');

            }
        }
    });

    /**
     * Postavka v menuju, ki nima podtočk
     * @type Marionette.ItemView
     */
    var MenuItem = Marionette.ItemView.extend({
        tagName: 'li',
        template: Handlebars.compile('<a href="{{ uri }}"> <span class="showopacity fa {{ icon }}"></span> {{ label }} </a>'),
        onRender: function () {
            if (this.model.get('selected')) {
                this.$el.addClass('active');
            } else {
                this.$el.removeClass('active');

            }
        },
        modelEvents: {
            change: "modelChanged"
        },
        modelChanged: function () {
            this.render();
        },
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
        },
        addChild: function (child, ChildView, index) {
            if (child.isGranted()) {
                Marionette.CollectionView.prototype.addChild.apply(this, arguments);
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
    var NavBarMenu = Marionette.ItemView.extend({
        className: "navbar navbar-inverse",
        tagName: "nav",
        template: navbarTpl,
        onRender: function () {

            var menu = new MenuItems({
                collection: this.model.get('pages')
            });

            this.$el.find('#navbar').append(menu.el);
            menu.render();
            this.$el.prop('role', 'navigation');



        }
    });

    return NavBarMenu;

});