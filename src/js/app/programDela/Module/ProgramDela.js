/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'require',
    'backbone',
    'radio',
    'i18next',
    './nav',
    'baseUrl'

], function (
        Marionette,
        require,
        Backbone,
        Radio,
        i18next,
        moduleNav,
        baseUrl
        ) {


    var modInit = function (mod, App, Backbone, Marionette, $, _) {

        var ch = Radio.channel('layout');

        /**
         * Odpre se stran za izbiro akcije
         * @returns {undefined}
         */
        mod.programDela = function () {
            require(['../View/ProgramView'], function (View) {
                var view = new View();
                ch.command('open', view, i18next.t('programDela.title'));
            });
        };
        /**
         * Odpre se Stran za ustvarjanje programa dela
         * @returns {undefined}
         */
        mod.programDelaDodaj = function () {
            this.programDelaUredi(null);
        };

        /**
         * Odpre se stran za urejanje programa dela
         * @param {string} id
         * @returns {undefined}
         */
        mod.programDelaUredi = function (id) {
            require(['../Model/ProgramDokument', '../View/ProgramDokView'], function (Model, View) {
                var model = new Model.Model({id: id});
                var odpriView = function () {
                    var view = new View({model: model});
                    ch.command('open', view, i18next.t('programDela.title'));
                };
                model.once('sync', odpriView);
                model.fetch({
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            });
        };

        var prikaz = function (id, idd, akcije) {
            require(['../Model/ProgramDokument', '../View/ProgramDokView'], function (Model, View) {
                var model = new Model.Model({id: id});
                var odpriView = function () {
                    var view = new View({model: model});
                    ch.command('open', view, i18next.t('programDela.title'));
                    _.each(akcije, function (akcija) {
                        view.triggerMethod(akcija);
                    });
                };
                model.once('sync', odpriView);
                model.fetch();
            });
        };


        /**
         * odpre stran za urejanje Ponovitve premiere
         * @param {string} id
         * @returns {undefined}
         */
        mod.sklopEna = function (id, idd) {
            prikaz(id, idd, [
                'sklopEna',
                'premiere'
            ]);
        };

        /**
         * odpre stran za urejanje festivali
         * @param {string} id
         * @returns {undefined}
         */
        mod.sklopDva = function (id, idd) {
            prikaz(id, idd, [
                'sklopDva',
                'gostovanje'
            ]);
        };
        /**
         * odpre stran za urejanje kazalniki
         * @param {string} id
         * @returns {undefined}
         */
        mod.kazalniki = function (id, idd) {
            prikaz(id, idd, [
                'kazalniki'
            ]);
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
                    'programDela/:id': 'programDelaUredi',
                    'programDela/:id/sklopEna': 'sklopEna',
                    'programDela/:id/sklopDva': 'sklopDva',
                    'programDela/:id/kazalniki': 'kazalniki'
                }
            });
        });

    };

    return modInit;
});
