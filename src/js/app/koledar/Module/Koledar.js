/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'radio',
    'require',
    './nav',
    'app/koledar/Model/TerminiStoritve',
    'app/koledar/Model/Dogodki'
], function (
        Marionette,
        Radio,
        require,
        moduleNav,
        TerminiStoritve,
        Dogodki
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
                    filterView: new FilterView()
                });
                ch.command('open', calView, 'Planer');
                ch.command('enableMenu', 'koledar');
            });

        };

        /**
         * Koledar zasedenosti
         * @returns {undefined}S
         */
        mod.zasedenost = function () {
            require(['../View/PregledZasedenostView', 'jquery', 'fullcalendar', 'fc-schedule'], function (View) {
                require(['fclang/sl'], function () {
                    var coll = new TerminiStoritve();
                    var view = new View({
                        collection: coll
                    });

                    ch.command('open', view, 'Zasedenost');
                    ch.command('enableMenu', 'koledar');
                });
            });
        };

        /**
         * Koledar posameznika
         * @returns {undefined}S
         */
        mod.koledarPosameznik = function () {
            require(['../View/PregledPosameznikaView', 'jquery', 'fullcalendar', 'fc-schedule'], function (View) {
                require(['fclang/sl'], function () {
                    var coll = new TerminiStoritve();
                    //trebadodati queryparams za osebo ki gleda koledar
                    var view = new View({
                        collection: coll
                    });

                    ch.command('open', view, 'Moj Koledar');
                    ch.command('enableMenu', 'koledar');
                });
            });
        };

        /**
         * Pregled koledarja za posamezni resource 
         * 
         * @returns {undefined}
         */
        mod.pregled = function () {
            require(['../View/PregledDogodkiView', 'jquery', 'fullcalendar', 'fc-schedule'], function (View) {
                require(['fclang/sl'], function () {
                    var coll = new Dogodki();
                    var view = new View({
                        collection: coll
                    });

                    ch.command('openTab', view, 'Planiranje');
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
         * Navigacija med posameznimi pogledi v koledarju
         * @returns {undefined}
         */
        mod.planer = function () {
            require(['../View/PlanerView', 'jquery', 'fullcalendar', 'fc-schedule'], function (View) {
                require(['fclang/sl'], function () {
                    var view = new View();

                    ch.command('open', view, 'Planer');
                    ch.command('enableMenu', 'koledar');
                });
            });
        };

        /**
         * 
         * Routing za javni pogled 
         */
        mod.addInitializer(function (options) {
            App.nav.registerNav(moduleNav);

            ch.comply('osveziPlaner', mod.planer);

            new Marionette.AppRouter({
                controller: mod,
                appRoutes: {
                    'koledar/navigacija': 'pregled',
                    'koledar/planiranje': 'pregled',
                    'koledar/planer': 'planer',
                    'koledar/pregled': 'pregled',
                    'koledar/ludje': 'ljudje',
                    'koledar/prostori': 'prostori',
                    'koledar/zasedenost': 'zasedenost',
                    'koledar/koledarPosameznik': 'koledarPosameznik',
                    'koledar/vaje': 'vaje',
                    'koledar/predstave': 'predstave'
                }
            });
        });

    };

    return modInit;
});
