define([
    'radio',
    '../View/NavBarMenu',
    'backbone',
    'template!../tpl/uporabnik.tpl',
    'template!../tpl/ifi-layout.html'
], function (
        Radio,
        NavBarMenu,
        Backbone,
        uporabnikTpl,
        layoutTpl
        ) {


    var moduleInit = function (module, application, Backbone, Marionette, $, _) {


        var Layout = Marionette.LayoutView.extend({
            template: layoutTpl,
            regions: {
                contentR: '.main',
                navR: '.glavna-navigacija',
                userR: '.user-links',
                jobsR: '.jobmanager-links',
                obvestilaR: '.obvestila'
            }
        });

        Layout.prototype.initialize = function (options) {
            this.user = options.user;
        };


        Layout.prototype.onRender = function () {
            var fm = application.flashManager;
            this.obvestilaR.show(fm.manager);
            fm.manager.$el.prop('id', 'flashMessagesManager');
            fm.createSporocilaView(".sporocila-ifi");
            var menu = new NavBarMenu({
                model: application.nav.navigation
            });
            this.navR.show(menu);
            var userView = new Marionette.ItemView({
                tagName:'span',
                template: uporabnikTpl,
                model: new Backbone.Model(this.user)                
            });
            this.jobsR.show(application.jobManager.getObvestilaView());
            this.userR.show(userView);
            
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

        /**
         * 
         * Nastavi active na id v elementu menuja
         * 
         * @param {string} id
         * @param {boolean} clear če === false, potem  se pokliče deselect
         * @returns {undefined}
         */
        module.enableMenu = function (id, clear) {
            if (typeof clear === 'undefined') {
                clear = true;
            }
            var nav = application.nav.navigation;
            if (clear) {
                nav.deselect();
            }
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

