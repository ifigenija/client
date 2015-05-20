/** 
 * Licenca GPLv3
 */
define([
    'radio',
    'marionette',
    'require',
    'backbone',
    'i18next',
    './nav'

], function (
        Radio,
        Marionette,
        require,
        Backbone,
        i18next,
        moduleNav
        ) {


    var modInit = function (model, App, Backbone, Marionette, $, _) {
        var ch = Radio.channel('layout');

        model.page = function () {
            console.log("Page");
        };

        /**
         * 
         * Routing za javni pogled 
         */
        model.addInitializer(function (options) {

            App.nav.registerNav(moduleNav);
            new Marionette.AppRouter({
                controller: model,
                appRoutes: {
                    'aaa': 'page'
                }
            });
        });

    };

    return modInit;
});
