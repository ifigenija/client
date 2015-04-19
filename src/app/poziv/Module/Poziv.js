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


        
        mod.poziv = function () {

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
                    'poziv': 'poziv'
                    
                }
            });
        });

    };

    return modInit;
});
