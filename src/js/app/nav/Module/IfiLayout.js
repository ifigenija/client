define([
    'radio',
    '../View/NavBarMenu',
    'app/bars',
    'text!../tpl/ifi-layout.html'
], function (
        Radio,
        NavBarMenu,
        Handlebars,
        layoutTpl
        ) {


    var moduleInit = function (module, application, Backbone, Marionette, $, _) {


        var EmptyView = Marionette.ItemView.extend({
            template: Handlebars.compile('prazenView'),
            onRender: function () {

            }
        });

        var Layout = Marionette.LayoutView.extend({
            template: Handlebars.compile(layoutTpl),
            regions: {
                contentR: '.main',
                navR: '.side-nav',
                obvestilaR: '.obvestila'
            }
        });

        Layout.prototype.initialize = function (options) {

        };

        Layout.prototype.onRender = function () {
//            this.tabsR.show(this.tabControl);

            var fm = application.flashManager;
            this.obvestilaR.show(fm.manager);
            fm.manager.$el.prop('id', 'flashMessagesManager');
            fm.createSporocilaView("#sporocila-ifi");



            var menu = new NavBarMenu({
                model: application.nav.navigation
            });
            this.navR.show(menu);

        };

        Layout.prototype.open = function (view, name, route) {
            name = name || view.cid;
            this.contentR.show(view);
            if (name) {
                module.setTitle(name);
            }
            if (route) {
                module.replaceUrl(route);
            }
        };

        Layout.prototype.replaceUrl = function (url) {
            Backbone.history.navigate(url);
        };
        
        module.open = function (view, name, route) {
            module.layout.open(view, name, route);
        };

        module.setTitle = function (title) {
            $('title').text(title);
        };

        module.replaceUrl = function (url) {
            module.layout.replaceUrl(url);
        };
        
        
        module.enableMenu = function (id) {
            var nav = application.nav.navigation;
            nav.deselect();
            nav.enableById(id);
        };

        module.addInitializer(function (options) {
            this.Layout = Layout;
            var router = new Marionette.AppRouter({
                controller: this

            });

            var channel = Radio.channel('layout');
            channel.comply('open', module.open);
            channel.comply('openTab', module.open);
            channel.comply('setTitle', module.setTitle);
            channel.comply('replaceUrl', module.replaceUrl);
            channel.comply('enableMenu', module.enableMenu);

        });

    };
    return moduleInit;
});
/* 
 * Licenca GPLv3
 */


