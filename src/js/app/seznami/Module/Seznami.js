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
            ch.command('enableMenu', 'seznami');
        };

        var odpriModel = function (Model, View, id, title, pogled) {
            var odpriView = function () {
                var view = new View();
                if (pogled) {
                    view = new View({pogled: pogled});
                }
                ch.command('open', view, i18next.t(title));
                ch.command('enableMenu', 'seznami');
                view.triggerMethod('selected', model);
            };

            var model = new Model.Model({id: id});
            model.once('sync', odpriView);
            model.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
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
        model.vrstaStroska = function () {
            require(['../View/VrstaStroskaView'], function (View) {
                odpri(View, 'vrstaStroska.title');
            });
        };
        
        model.zaposlitev = function () {
            require(['../View/ZaposlitevView'], function (View) {
                odpri(View, 'zaposlitev.title');
            });
        };
        
        model.tipPopa = function () {
            require(['../View/TipPopaView'], function (View) {
                odpri(View, 'tipPopa.title');
            });
        };
        
        model.tipVaje = function () {
            require(['../View/TipVajeView'], function (View) {
                odpri(View, 'tipVaje.title');
            });
        };
        
        model.orgEnota = function () {
            require(['../View/OrgEnotaView'], function (View) {
                odpri(View, 'orgEnota.title');
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
         * Neposreden pogled podatkov vrstaStroska
         * @param {type} id
         * @returns {undefined}
         */
        model.vrstaStroskaOdpri = function (id) {
            require(['../Model/VrstaStroska', '../View/VrstaStroskaView'], function (Model, View) {
                odpriModel(Model, View, id, 'vrstaStroska.title');
            });
        };
        
        model.zaposlitevOdpri = function (id) {
            require(['../Model/Zaposlitev', '../View/ZaposlitevView'], function (Model, View) {
                odpriModel(Model, View, id, 'zaposlitev.title');
            });
        };
        
        model.tipPopaOdpri = function (id) {
            require(['../Model/TipPopa', '../View/TipPopaView'], function (Model, View) {
                odpriModel(Model, View, id, 'tipPopa.title');
            });
        };
        
        model.tipVajeOdpri = function (id) {
            require(['../Model/TipVaje', '../View/TipVajeView'], function (Model, View) {
                odpriModel(Model, View, id, 'tipVaje.title');
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
                    'vrstaStroska': 'vrstaStroska',
                    'alternacija': 'alternacija',
                    'zaposlitev': 'zaposlitev',
                    'tipPopa': 'tipPopa',
                    'tipVaje': 'tipVaje',
                    'orgEnota': 'orgEnota',
                    'tipFunkcije/:id': 'tipFunkcijeOdpri',
                    'zvrstUprizoritve/:id': 'zvrstUprizoritveOdpri',
                    'zvrstSurs/:id': 'zvrstSursOdpri',
                    'drzava/:id': 'drzavaOdpri',
                    'oseba/:id': 'osebaOdpri',
                    'posta/:id': 'postaOdpri',
                    'popa/:id': 'popaOdpri',
                    'abonma/:id': 'abonmaOdpri',
                    'prostor/:id': 'prostorOdpri',
                    'vrstaStroska/:id': 'vrstaStroskaOdpri',
                    'zaposlitev/:id': 'zaposlitevOdpri',
                    'tipPopa/:id': 'tipPopaOdpri',
                    'tipVaje/:id': 'tipVajeOdpri'
                }
            });
        });

    };

    return modInit;
});
