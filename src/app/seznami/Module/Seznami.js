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
                ch.command('open', view, i18next.t('seznami.zvrstUprizoritve.title'));
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
                var view = new OsebaView({pogled: 'splosno'});
                ch.command('open', view, i18next.t('seznami.oseba.title'));
            });
        };
        model.posta = function () {
            require(['../View/PostaView'], function (PostaView) {
                var view = new PostaView();
                ch.command('open', view, i18next.t('seznami.posta.title'));
            });
        };
        model.popa = function () {
            require(['../View/PopaView'], function (PopaView) {
                var view = new PopaView({pogled: 'splosno'});
                ch.command('open', view, i18next.t('seznami.popa.title'));
            });
        };
        model.zvrstSurs = function () {
            require(['../View/ZvrstSursView'], function (ZvrstSursView) {
                var view = new ZvrstSursView();
                ch.command('open', view, i18next.t('seznami.zvrstSurs.title'));
            });
        };
        model.abonma = function () {
            require(['../View/AbonmaView'], function (AbonmaView) {
                var view = new AbonmaView();
                ch.command('open', view, i18next.t('seznami.abonma.title'));
            });
        };
        model.prostor = function () {
            require(['../View/ProstorView'], function (AbonmaView) {
                var view = new AbonmaView();
                ch.command('open', view, i18next.t('seznami.prostor.title'));
            });
        };        
        model.alternacija = function () {
            require(['../View/AlternacijaView'], function (AlternacijaView) {
                var view = new AlternacijaView();
                ch.command('open', view, i18next.t('seznami.alternacijaView.title'));
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
                    'zvrstSurs': 'zvrstSurs',
                    'drzava': 'drzava',
                    'oseba': 'oseba',
                    'posta': 'posta',
                    'popa': 'popa',
                    'abonma': 'abonma',
                    'prostor': 'prostor',
                    'alternacija' : 'alternacija'
                }
            });
        });

    };

    return modInit;
});
