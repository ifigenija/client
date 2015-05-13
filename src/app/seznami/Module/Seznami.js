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


    var modInit = function (model, App, Backbone, Marionette, $, _) {
        var ch = Radio.channel('layout');

        model.tipFunkcije = function () {
            require(['../View/TipFunkcijeView'], function (TipFunkcijeView) {
                var view = new TipFunkcijeView();
                ch.command('open', view, i18next.t('seznami.tipFunkcije.title'));
            });

        };

        model.zvrstUprizoritve = function () {
            require(['../View/ZvrstUprizoritveView'], function (ZvrstUprizoritveView) {
                var view = new ZvrstUprizoritveView();
                ch.command('open', view, i18next.t('seznami.zvrstUprozoritve.title'));
            });
        };

        model.drzava = function () {
            require(['../View/Drzava/DrzavaView'], function (DrzavaView) {
                var view = new DrzavaView();
                ch.command('open', view, i18next.t('seznami.drzava.title'));
            });
        };
        model.oseba = function () {
            require(['../View/Oseba/OsebaView'], function (OsebaView) {
                var view = new OsebaView();
                ch.command('open', view, i18next.t('seznami.oseba.title'));
            });
        };
        model.posta = function () {
            require(['../View/Posta/PostaView'], function (PostaView) {
                var view = new PostaView();
                ch.command('open', view, i18next.t('seznami.posta.title'));
            });
        };
        model.popa = function () {
            require(['../View/Popa/PopaView'], function (PopaView) {
                var view = new PopaView();
                ch.command('open', view, i18next.t('seznami.popa.title'));
            });
        };

        /**
         * 
         * Routing za module
         */
        model.addInitializer(function (options) {
            App.nav.registerNav(moduleNav);

            new Marionette.AppRouter({
                controller: model,
                appRoutes: {
                    'tipFunkcije': 'tipFunkcije',
                    'zvrstUprizoritve': 'zvrstUprizoritve',
                    'drzava': 'drzava',
                    'oseba': 'oseba',
                    'posta': 'posta',
                    'popa': 'popa'
                }
            });
        });

    };

    return modInit;
});
