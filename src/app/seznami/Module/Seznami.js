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

        model.tipFunkcije = function () {
            require(['../View/TipFunkcijeView'], function (View) {
                odpri(View, 'tipFunkcije.title');
            });

        };
        model.zvrstUprizoritve = function () {
            require(['../View/ZvrstUprizoritveView'], function (View) {
                odpri(View, 'zvrstUprizoritve.title');
            });
        };
        model.drzava = function () {
            require(['../View/DrzavaView'], function (View) {
                odpri(View, 'drzava.title');
            });
        };
        model.oseba = function () {
            require(['../View/OsebaView'], function (View) {
                odpri(View, 'oseba.title', 'splosno');
            });
        };
        model.posta = function () {
            require(['../View/PostaView'], function (View) {
                odpri(View, 'posta.title');
            });
        };
        model.popa = function () {
            require(['../View/PopaView'], function (View) {
                odpri(View, 'popa.title', 'splosno');
            });
        };
        model.zvrstSurs = function () {
            require(['../View/ZvrstSursView'], function (View) {
                odpri(View, 'zvrstSurs.title');
            });
        };
        model.abonma = function () {
            require(['../View/AbonmaView'], function (View) {
                odpri(View, 'abonma.title');
            });
        };
        model.prostor = function () {
            require(['../View/ProstorView'], function (View) {
                odpri(View, 'prostor.title');
            });
        };
        model.alternacija = function () {
            require(['../View/AlternacijaView'], function (View) {
                odpri(View, 'alternacija.title');
            });
        };

        /**
         * Dostop direktno do podatkov osebe
         * @param {type} id
         * @returns {undefined}
         */
        model.osebaOdpri = function (id) {
            require(['../Model/Oseba', '../View/OsebaView'], function (Model, View) {
                odpriModel(Model, View, id, 'oseba.title', 'splosno');
            });
        };

        /**
         * Dostop direktno do podatkov pope
         * @param {type} id
         * @returns {undefined}
         */
        model.popaOdpri = function (id) {
            require(['../Model/Popa', '../View/PopaView'], function (Model, View) {
                odpriModel(Model, View, id, 'popa.title', 'splosno');
            });
        };

        /**
         * Dostop direktno do podatkov poste
         * @param {type} id
         * @returns {undefined}
         */
        model.postaOdpri = function (id) {
            require(['../Model/Posta', '../View/PostaView'], function (Model, View) {
                odpriModel(Model, View, id, 'posta.title');
            });
        };

        /**
         * Neposreden pogled podatkov drzave
         * @param {type} id
         * @returns {undefined}
         */
        model.drzavaOdpri = function (id) {
            require(['../Model/Drzava', '../View/DrzavaView'], function (Model, View) {
                odpriModel(Model, View, id, 'drzava.title');
            });
        };

        /**
         * Neposreden pogled podatkov tipafunkcije
         * @param {type} id
         * @returns {undefined}
         */
        model.tipFunkcijeOdpri = function (id) {
            require(['../Model/TipFunkcije', '../View/TipFunkcijeView'], function (Model, View) {
                odpriModel(Model, View, id, 'tipFunkcije.title');
            });
        };

        /**
         * Neposreden pogled podatkov zvrsti uprizoritve
         * @param {type} id
         * @returns {undefined}
         */
        model.zvrstUprizoritveOdpri = function (id) {
            require(['../Model/ZvrstUprizoritve', '../View/ZvrstUprizoritveView'], function (Model, View) {
                odpriModel(Model, View, id, 'zvrstUprizoritve.title');
            });
        };

        /**
         * Neposreden pogled podatkov zvrsti SURS
         * @param {type} id
         * @returns {undefined}
         */
        model.zvrstSursOdpri = function (id) {
            require(['../Model/ZvrstSurs', '../View/ZvrstSursView'], function (Model, View) {
                odpriModel(Model, View, id, 'zvrstSurs.title');
            });
        };

        /**
         * Neposreden pogled podatkov abonmaja
         * @param {type} id
         * @returns {undefined}
         */
        model.abonmaOdpri = function (id) {
            require(['../Model/Abonma', '../View/AbonmaView'], function (Model, View) {
                odpriModel(Model, View, id, 'abonma.title');
            });
        };

        /**
         * Neposreden pogled podatkov prostora
         * @param {type} id
         * @returns {undefined}
         */
        model.prostorOdpri = function (id) {
            require(['../Model/Prostor', '../View/ProstorView'], function (Model, View) {
                odpriModel(Model, View, id, 'prostor.title');
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
                    'tipFunkcije/:id': 'tipFunkcijeOdpri',
                    'zvrstUprizoritve/:id': 'zvrstUprizoritveOdpri',
                    'zvrstSurs/:id': 'zvrstSursOdpri',
                    'drzava/:id': 'drzavaOdpri',
                    'oseba/:id': 'osebaOdpri',
                    'posta/:id': 'postaOdpri',
                    'popa/:id': 'popaOdpri',
                    'abonma/:id': 'abonmaOdpri',
                    'prostor/:id': 'prostorOdpri'
                }
            });
        });

    };

    return modInit;
});
