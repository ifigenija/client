/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'radio',
    'require',
    'backbone',
    './nav',
    'i18next'

], function (
        Marionette,
        Radio,
        require,
        Backbone,
        moduleNav,
        i18next
        ) {


    var modInit = function (mod, App, Backbone, Marionette, $, _) {
        var ch = Radio.channel('layout');

        mod.uprizoritve = function () {
            require(['../View/UprizoritevView'], function (UprizoritevView) {
                var view = new UprizoritevView();
                ch.command('open', view, i18next.t('produkcija.view.uprizoritev.title'));
            });
        };
        mod.osebe = function () {
            require(['../../seznami/View/OsebaView'], function (OsebaView) {
                var view = new OsebaView();
                ch.command('open', view, i18next.t('produkcija.view.oseba.title'));
            });
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
                    'pro/uprizoritev': 'uprizoritve',
                    'pro/oseba': 'osebe'
                }
            });
        });

    };

    return modInit;
});
