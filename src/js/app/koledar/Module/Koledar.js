/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'radio',
    'require',
    './nav'

], function (
        Marionette,
        Radio,
        require,
        moduleNav
        ) {


    var modInit = function (mod, App, Backbone, Marionette, $, _) {


        var ch = Radio.channel('layout');



        mod.ljudje = function () {

        };

        /**
         * Planer po prostorih
         * 
         * @returns {undefined}
         */
        mod.prostori = function () {
            require(['../View/PlanerView', '../Model/Resursi', '.'], function (PlanerView, resursi, FilterView) {
                var calView = new PlanerView({
                    resCollection: resursi.prostori,
                    filterView: new FilterView(),
                });
                ch.command('open', calView, 'Planer');
                ch.command('enableMenu', 'koledar');
            });

        };

        /**
         * Koledar zasedenosti za po 
         * @returns {undefined}
         */
        mod.zasedenost = function () {

        };

        /**
         * Pregled koledarja za posamezni resource 
         * 
         * @returns {undefined}
         */
        mod.pregled = function () {
            require(['../View/KoledarView', '../Model/Dogodki', 'jquery', 'fullcalendar'], function (View, Collection) {
                require(['fclang/sl'], function () {
                    var coll = new Collection();

                    var calView = new View({
                        collection: coll
                    });
                    ch.command('openTab', calView, 'Koledar');
                    ch.command('enableMenu', 'koledar');
                });
            });

        };

        /**
         * Pregled predstav po uprizoritveh 
         * @returns {undefined}
         */
        mod.predstave = function () {

        };

        /**
         * Pregled vaj po uprizoritvah 
         * 
         * @returns {undefined}
         */
        mod.vaje = function () {

        };

        /**
         * Navigacija med posameznimi pogledi v koledarju
         * @returns {undefined}
         */
        mod.navigacija = function () {
            require(['../View/Navigacija'], function (NaviView) {
                var view = new NaviView({
                });
                ch.command('open', view, 'Navigacija');
                ch.command('enableMenu', 'koledar');
            });
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
                    'koledar/navigacija': 'pregled',
                    'koledar/pregled': 'pregled',
                    'koledar/ludje': 'ljudje',
                    'koledar/prostori': 'prostori',
                    'koledar/zasedenost': 'zasedenost',
                    'koledar/vaje': 'vaje',
                    'koledar/predstave': 'predstave'
                }
            });
        });

    };

    return modInit;
});
