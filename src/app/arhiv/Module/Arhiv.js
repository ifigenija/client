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


     
        mod.dogodki = function () {

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
                    'arhiv/dodaj': 'dogodki',
                    
                }
            });
        });

    };

    return modInit;
});
