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
            require(['../View/DrzavaView'], function (DrzavaView) {
                var view = new DrzavaView();
                ch.command('open', view, i18next.t('seznami.drzava.title'));
            });
        };
        model.oseba = function () {
            require(['../View/OsebaView'], function (OsebaView) {
                var view = new OsebaView();
                ch.command('open', view, i18next.t('seznami.oseba.title'));
            });
        };
        model.uporabnik = function () {
            require(['../View/UporabnikView'], function (UporabnikView) {
                var view = new UporabnikView();
                ch.command('open', view, i18next.t('seznami.uporabnik.title'));
            });
        };
        model.posta = function () {
            require(['../View/PostaView'], function (PostaView) {
                var view = new PostaView();
                ch.command('open', view, i18next.t('seznami.posta.title'));
            });
        };
        model.postniNaslov = function () {
            require(['../View/PostniNaslovView'], function (PostniNaslovView) {
                var view = new PostniNaslovView();
                ch.command('open', view, i18next.t('seznami.postniNaslov.title'));
            });
        };
        model.trr = function () {
            require(['../View/TrrView'], function (TrrView) {
                var view = new TrrView();
                ch.command('open', view, i18next.t('seznami.trr.title'));
            });
        };
        model.telefonska = function () {
            require(['../View/TelefonskaView'], function (TelefonskaView) {
                var view = new TelefonskaView();
                ch.command('open', view, i18next.t('seznami.telefonska.title'));
            });
        };
        model.popa = function () {
            require(['../View/PopaView'], function (PopaView) {
                var view = new PopaView();
                ch.command('open', view, i18next.t('seznami.popa.title'));
            });
        };
        model.vloga = function () {
            require(['../View/VlogaView'], function (VlogaView) {
                var view = new VlogaView();
                ch.command('open', view, i18next.t('seznami.vloga.title'));
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
                    'uporabnik': 'uporabnik',
                    'posta': 'posta',
                    'postniNaslov': 'postniNaslov',
                    'trr': 'trr',
                    'telefonska': 'telefonska',
                    'popa': 'popa',
                    'vloga': 'vloga'
                }
            });
        });

    };

    return modInit;
});
