/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'require',
    'backbone',
    './nav',
    'radio',
    'i18next'

], function (
        Marionette,
        require,
        Backbone,
        moduleNav,
        Radio,
        i18next
        ) {


    var modelInit = function (model, App, Backbone, Marionette, $, _) {

        var ch = Radio.channel('layout');
     
        model.dogodki = function () {

        };
        
        model.besedila = function () {
            require(['../View/BesediloView'], function (BesediloView) {
                var view = new BesediloView();
                ch.command('open', view, i18next.t('seznami.besedilo.title'));
            });
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
                    'arhiv/dodaj': 'dogodki',
                    'arhiv/besedila' : 'besedila'
                    
                }
            });
        });

    };

    return modelInit;
});
