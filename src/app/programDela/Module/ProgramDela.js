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
        
        var odpriModel = function (Model, View, id, title, pogled) {
            var odpriView = function () {
                var view = new View({model:model});
                if (pogled) {
                    view = new View({pogled: pogled});
                }
                ch.command('open', view, i18next.t(title));
            };

            var model = new Model.Model({id: id});
            model.once('sync', odpriView);
            model.fetch();
        };

        /**
         * Odpre se stran za izbiro akcije
         * @returns {undefined}
         */
        mod.programDela = function () {
            require(['../View/PdView'], function (View) {
                odpri(View, 'programDela.title');
            });
        };
        /**
         * Odpre se Stran za ustvarjanje programa dela
         * @returns {undefined}
         */
        mod.programDelaDodaj = function () {
            require(['../View/PdDodajView'], function (View) {
                odpri(View, 'programDela.title');
            });
        };
        /**
         * Odpre se stran za urejanje programa dela
         * @returns {undefined}
         */
        mod.programDelaUredi = function (id) {
            require(['../Model/ProgramDela', '../View/PdUrediView'], function (Model, View) {
                odpriModel(Model, View, id, 'programDela.title');
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
                    'programDela/dodaj': 'programDelaDodaj',
                    'programDela/:id': 'programDelaUredi'

                }
            });
        });

    };

    return modInit;
});
