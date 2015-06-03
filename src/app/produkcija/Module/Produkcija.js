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
                ch.command('open', view, i18next.t('uprizoritev.title'));
            });
        };
        mod.stroskovnik = function () {
            require(['../View/StroskovnikView'], function (StroskovnikView) {
                var view = new StroskovnikView();
                ch.command('open', view, i18next.t('strupr.title'));
            });
        };
        mod.zaposlitev = function () {
            require(['../View/ZaposlitevView'], function (ZaposlitevView) {
                var view = new ZaposlitevView();
                ch.command('open', view, i18next.t('zaposlitev.title'));
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
                    "pro/stroskovnik": "stroskovnik",
                    "pro/zaposlitev": "zaposlitev"
                }
            });
        });

    };

    return modInit;
});
