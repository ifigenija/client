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
        
        var odpri = function (View, title, pogled) {
            var view = new View();
            if (pogled) {
                view = new View({pogled: pogled});
            }
            ch.command('open', view, i18next.t(title));
        };

        var odpriModel = function (Model, View, id, title, pogled) {
            var odpriView = function () {
                var view = new View();
                if (pogled) {
                    view = new View({pogled: pogled});
                }
                ch.command('open', view, i18next.t(title));
                view.triggerMethod('selected', model);
            };

            var model = new Model.Model({id: id});
            model.once('sync', odpriView);
            model.fetch();
        };
     
        model.dogodki = function () {

        };
        
        model.besedila = function () {
            require(['../View/BesediloView'], function (View) {
                odpri(View, 'besedilo.title');
            });
        };
        /**
         * naposredni dostop do podatkov besedila
         * @returns {undefined}
         */
        model.besedilaOdpri = function (id) {
            require(['../Model/Besedilo', '../View/BesediloView'], function (Model, View) {
                odpriModel(Model, View, id, 'besedilo.title');
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
                    'arhiv/besedila' : 'besedila',
                    'arhiv/besedila/:id' : 'besedilaOdpri'
                    
                }
            });
        });

    };

    return modelInit;
});
