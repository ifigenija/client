define([
    'radio',
    '../View/SidebarMenu',
    '../View/OrodnaVrsticaView',
    '../Model/Crumbs',
    'app/bars',
    'text!../tpl/ifi-layout.html',
], function (
        Radio,
        SidebarMenu,
        OrodnaVrsticaView,
        Crumbs,
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
                contentR: '#main',
                orodnaR: '#orodna-vrstica',
                navR: '#side-nav'
            },
        });

        Layout.prototype.initialize = function (options) {

        };

        Layout.prototype.onRender = function () {
//            this.tabsR.show(this.tabControl);

            var ovv = new OrodnaVrsticaView({
                crumbsColl: module.crumbsColl,
                user: this.options.user
            });

            this.orodnaR.show(ovv);

            ovv.obvestilaR.show(application.flashManager.manager);
            application.flashManager.createSporocilaView();



            var menu = new SidebarMenu({
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

        Layout.prototype.replaceUrl = function (view, name, route) {
            console.log("zamenjaj URL");
        };

        module.refreshActiveTab = function (url) {
            module.layout.refresh(url);
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

        module.getActiveTab = function () {
            return module.layout.tabs.findWhere({selected: true});
        };

        module.closeActiveTab = function () {
            module.layout.tabs.remove(module.getActiveTab());
        };

        module.addInitializer(function (options) {
            this.Layout = Layout;
            var ruter = new Marionette.AppRouter({
                controller: this

            });

            this.crumbsColl = new Crumbs();

            var channel = Radio.channel('layout');
            channel.reply('activeTab', module.getActiveTab);
            channel.comply('openTab', module.open);
            channel.comply('sameTab', module.open);
            channel.comply('open', module.open);
            channel.comply('refresh', module.refreshActiveTab);
            channel.comply('close', module.closeActiveTab);
            channel.comply('setTitle', module.setTitle);
            channel.comply('replaceUrl', module.replaceUrl);


        });

    };
    return moduleInit;
});
/* 
 * Licenca GPLv3
 */


