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
                error: function () {
                    Radio.channel('error').command('flash', {
                        message: i18next.t("napaka.fetch") + ' ' + '(ProgramDela)',
                        code:'9000100',
                        severity: 'error'
                    });
                }
            });
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
