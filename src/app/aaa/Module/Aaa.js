/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'require',
    'backbone',
    './nav'

], function (
        Marionette,
        require,
        Backbone,
        moduleNav
        ) {


    var modInit = function (mod, App, Backbone, Marionette, $, _) {



        mod.addUser = function () {
            App.nav.crumbs.addCrumb("tralla", "#trallaa");
        };

        mod.manageUsers = function () {
            App.nav.crumbs.addCrumb("HOPSASA", "#hopsasa");

        };

        mod.roles = function () {
            App.nav.crumbs.reset();
        };

        /**
         * 
         * Routing za javni pogled 
         */
        mod.addInitializer(function (options) {

            App.nav.registerNav(moduleNav);
            new Marionette.AppRouter({
                controller: mod,
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
