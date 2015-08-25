/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'require',
  
    './nav'

], function (
        Marionette,
        require,
        
        moduleNav
        ) {


    var modInit = function (mod, App, Backbone, Marionette, $, _) {



        mod.dodajDogodek = function () {

        };

        mod.ljudje = function () {

        };

        mod.prostori = function () {

        };
        mod.zasedenost = function () {

        };
        
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
                    'koledar/dodaj': 'dodajDogodek',
                    'koledar/dogodki': 'dogodki',
                    'koledar/ludje': 'ljudje',
                    'koledar/prostori': 'prostori',
                    'koledar/zasedenost': 'zasedenost'
                }
            });
        });

    };

    return modInit;
});
