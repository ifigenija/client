/** 
 * Licenca GPLv3
 */
define([
    'radio',
    'marionette',
    'require',
    'backbone',
    'i18next',
    './nav'

], function (
        Radio,
        Marionette,
        require,
        Backbone,
        i18next,
        moduleNav
        ) {


    var modInit = function (model, App, Backbone, Marionette, $, _) {
        var ch = Radio.channel('layout');

        model.addUser = function () {
            App.nav.crumbs.addCrumb("tralla", "#trallaa");
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
         * Routing za javni pogled 
         */
        model.addInitializer(function (options) {

            App.nav.registerNav(moduleNav);
            new Marionette.AppRouter({
                controller: model,
                appRoutes: {
                    'aaa/user/dodaj': 'addUser',
                    'aaa/users': 'manageUsers',
                    'aaa/roles': 'roles'
                }
            });
        });

    };

    return modInit;
});
