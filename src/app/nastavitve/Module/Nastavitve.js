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
            model.manageUsers('dodaj');
        };

        model.manageUsers = function (akcija) {
            require(['../View/UporabnikView'], function (UporabnikView) {
                var view = new UporabnikView();
                ch.command('open', view, i18next.t('aaa.user.title'));
                if (akcija) {
                    view.triggerMethod(akcija);
                }
            });
        };

        model.roles = function () {
            require(['../View/RoleView'], function (RoleView) {
                var view = new RoleView();
                ch.command('open', view, i18next.t('aaa.roles.title'));
            });
        };

        model.permission = function () {
            require(['../View/PermissionView'], function (PermissionView) {
                var view = new PermissionView();
                ch.command('open', view, i18next.t('aaa.permission.title'));
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
                    'aaa/roles': 'roles',
                    'aaa/permissions': 'permission'
                }
            });
        });

    };

    return modelInit;
});
