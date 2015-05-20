/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'require',
    'backbone',
    './nav',
    'radio',
    'i18next'

], function (
        Marionette,
        require,
        Backbone,
        moduleNav,
        Radio,
        i18next
        ) {


    var modelInit = function (model, App, Backbone, Marionette, $, _) {

        var ch = Radio.channel('layout');
      
        model.moznosti = function () {

        };
        
        model.addUser = function () {
            console.log("Dodaj uporabnika");
        };

        model.manageUsers = function () {
            require(['../View/UporabnikView'], function (UporabnikView) {
                var view = new UporabnikView();
                ch.command('open', view, i18next.t('aaa.uporabnik.title'));
            });
        };

        model.roles = function () {
            require(['../View/VlogaView'], function (VlogaView) {
                var view = new VlogaView();
                ch.command('open', view, i18next.t('aaa.vloga.title'));
            });
        };

        /**
         * 
         * Routing za modelule
         */
        model.addInitializer(function (options) {
            App.nav.registerNav(moduleNav);

            new Marionette.AppRouter({
                controller: model,
                appRoutes: {
                    'aaa/moznosti': 'moznosti',
                    'aaa/user/dodaj': 'addUser',
                    'aaa/users': 'manageUsers',
                    'aaa/roles': 'roles'
                }
            });
        });

    };

    return modelInit;
});
