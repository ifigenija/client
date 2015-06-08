/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'require',
    'backbone',
    'radio',
    'i18next',
    './nav'

], function (
        Marionette,
        require,
        Backbone,
        Radio,
        i18next,
        moduleNav
        ) {


    var modInit = function (mod, App, Backbone, Marionette, $, _) {

        var ch = Radio.channel('layout');

        var odpri = function (View, title, pogled) {
            var view = new View();
            if (pogled) {
                view = new View({pogled: pogled});
            }
            ch.command('open', view, i18next.t(title));
        };

        /**
         * Odpre se stran za izbiro akcije
         * @returns {undefined}
         */
        mod.programDela = function () {
            require(['../View/pdPrvaView'], function (View) {
                odpri(View, 'programDela.title');
            });
        };
        /**
         * Odpre se Stran za ustvarjanje programa dela
         * @returns {undefined}
         */
        mod.programDelaUstvari = function () {
            require(['../View/pdUstvariView'], function (View) {
                odpri(View, 'programDela.title');
            });
        };
        /**
         * Odpre se stran za urejanje programa dela
         * @returns {undefined}
         */
        mod.programDelaUredi = function () {
            require(['../View/pdUrediView'], function (View) {
                odpri(View, 'programDela.title');
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
                    'programDela': 'programDela',
                    'programDela/ustvari': 'programDelaUstvari',
                    'programDela/uredi/:id': 'programDelaUredi'

                }
            });
        });

    };

    return modInit;
});
