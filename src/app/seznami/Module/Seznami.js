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
                ch.command('open', view, i18next.t('tipFunkcije.title'));
            });

        };
        model.zvrstUprizoritve = function () {
            require(['../View/ZvrstUprizoritveView'], function (ZvrstUprizoritveView) {
                var view = new ZvrstUprizoritveView();
                ch.command('open', view, i18next.t('zvrstUprizoritve.title'));
            });
        };
        model.drzava = function () {
            require(['../View/DrzavaView'], function (DrzavaView) {
                var view = new DrzavaView();
                ch.command('open', view, i18next.t('drzava.title'));
            });
        };
        model.oseba = function () {
            require(['../View/OsebaView'], function (OsebaView) {
                var view = new OsebaView({pogled: 'splosno'});
                ch.command('open', view, i18next.t('oseba.title'));
            });
        };
        model.posta = function () {
            require(['../View/PostaView'], function (PostaView) {
                var view = new PostaView();
                ch.command('open', view, i18next.t('posta.title'));
            });
        };
        model.popa = function () {
            require(['../View/PopaView'], function (PopaView) {
                var view = new PopaView({pogled: 'splosno'});
                ch.command('open', view, i18next.t('popa.title'));
            });
        };
        model.zvrstSurs = function () {
            require(['../View/ZvrstSursView'], function (ZvrstSursView) {
                var view = new ZvrstSursView();
                ch.command('open', view, i18next.t('zvrstSurs.title'));
            });
        };
        model.abonma = function () {
            require(['../View/AbonmaView'], function (AbonmaView) {
                var view = new AbonmaView();
                ch.command('open', view, i18next.t('abonma.title'));
            });
        };
        model.prostor = function () {
            require(['../View/ProstorView'], function (AbonmaView) {
                var view = new AbonmaView();
                ch.command('open', view, i18next.t('prostor.title'));
            });
        };
        model.alternacija = function () {
            require(['../View/AlternacijaView'], function (AlternacijaView) {
                var view = new AlternacijaView();
                ch.command('open', view, i18next.t('alternacija.title'));
            });
        };

        /**
         * Dostop direktno do podatkov osebe
         * @param {type} id
         * @returns {undefined}
         */
        model.osebaOdpri = function (id) {
            require(['../Model/Oseba', '../View/OsebaView'], function (Model, View) {
                var view = new View({pogled: 'splosno'});
                ch.command('open', view, i18next.t('oseba.title'));
                
                var model = new Model.Model({id: id});
                model.fetch();
                
                view.triggerMethod('selected', model);
            });
        };
        
        /**
         * Dostop direktno do podatkov pope
         * @param {type} id
         * @returns {undefined}
         */
        model.popaOdpri = function (id) {
            require(['../Model/Popa', '../View/PopaView'], function (Model, View) {
                var view = new View({pogled: 'splosno'});
                ch.command('open', view, i18next.t('popa.title'));
                
                var model = new Model.Model({id: id});
                model.fetch();
                
                view.triggerMethod('selected', model);
            });
        };
        /**
         * Dostop direktno do podatkov poste
         * @param {type} id
         * @returns {undefined}
         */
        model.postaOdpri = function (id) {
            require(['../Model/Posta', '../View/PostaView'], function (Model, View) {
                var view = new View();
                ch.command('open', view, i18next.t('posta.title'));
                
                var model = new Model.Model({id: id});
                model.fetch();
                
                view.triggerMethod('selected', model);
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
                    'alternacija': 'alternacija',
                    
//                    'tipFunkcije/:id': 'tipFunkcijeOdpri',
//                    'zvrstUprizoritve/:id': 'zvrstUprizoritveOdpri',
//                    'zvrstSurs/:id': 'zvrstSursOdpri',
//                    'drzava/:id': 'drzavaOdpri',
                    'oseba/:id': 'osebaOdpri',
                    'posta/:id': 'postaOdpri',
                    'popa/:id': 'popaOdpri',
//                    'abonma/:id': 'abonmaOdpri',
//                    'prostor/:id': 'prostorOdpri',
//                    'alternacija/:id': 'alternacijaOdpri'
                }
            });
        });

    };

    return modInit;
});
