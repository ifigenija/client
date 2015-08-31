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

        mod.prostori = function () {

        };
        mod.zasedenost = function () {

        };

        mod.pregled = function () {
            require(['../View/CalendarView', '../View/BasicFilter'], function (CalendarView, FilterView) {                
                var calView = new CalendarView({
                    filterView: new FilterView()                   
                });
                ch.command('open', calView, 'Kodelar');
            });

        };

        mod.predstave = function () {

        };

        mod.vaje = function () {

        };


        mod.navigacija = function () {
            require(['../View/Navigacija'], function (NaviView) {                
                var view = new NaviView({
                });
                ch.command('open', view, 'Navigacija');
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
                    'koledar/navigacija': 'navigacija',
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
