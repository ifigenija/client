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


      
        mod.nastavitve = function () {

        };

        /**
         * 
         * Routing za module
         */
        mod.addInitializer(function (options) {
            App.nav.registerNav(moduleNav);

            new Marionette.AppRouter({
                controller: mod,
                appRoutes: {
                    'nastavitve': 'nastavitve'
                }
            });
        });

    };

    return modInit;
});
