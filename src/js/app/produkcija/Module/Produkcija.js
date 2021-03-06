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


    var modInit = function (mod, App, Backbone, Marionette, $, _) {
        var ch = Radio.channel('layout');

        var odpri = function (View, title, pogled) {
            var view = new View();
            if (pogled) {
                view = new View({pogled: pogled});
            }
            ch.command('open', view, i18next.t(title));
            ch.command('enableMenu', 'produkcija');
        };
        var odpriModel = function (Model, View, id, title, pogled) {
            var odpriView = function () {
                var view = new View();
                if (pogled) {
                    view = new View({pogled: pogled});
                }
                ch.command('open', view, i18next.t(title));
                ch.command('enableMenu', 'produkcija');
                view.triggerMethod('selected', model);
            };

            var model = new Model.Model({id: id});
            model.once('sync', odpriView);
            model.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        };

        mod.uprizoritev = function () {
            require(['../View/UprizoritevView'], function (View) {
                odpri(View, 'uprizoritev.title');
            });
        };
        mod.stroskovnik = function () {
            require(['../View/StroskovnikView'], function (View) {
                odpri(View, 'strupr.title');
            });
        };
        mod.sezona = function () {
            require(['../View/SezonaView'], function (View) {
                odpri(View, 'sezona.title');
            });
        };

        /**
         * neposredni dostop do podatkov stroškovnika
         * @returns {undefined}
         */
        mod.stroskovnikOdpri = function (id) {
            require(['../Model/Stroskovnik', '../View/StroskovnikView'], function (Model, View) {
                var odpriView = function () {
                    var view = new View();
                    ch.command('open', view, i18next.t('stroskovnik.title'));
                    var editor = view.formIzberi.fields.id.editor;
                    editor.setValue(id);
                    editor.trigger('changed', id);
                };

                var model = new Model.Model({id: id});
                model.once('sync', odpriView);
                model.fetch({
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            });
        };
        /**
         * neposredni dostop do podatkov uprizoritve
         * @returns {undefined}
         */
        mod.uprizoritevOdpri = function (id) {
            require(['../Model/Uprizoritev', '../View/UprizoritevView'], function (Model, View) {
                odpriModel(Model, View, id, 'uprizoritev.title');
            });
        };
        /**
         * neposredni dostop do podatkov uprizoritve
         * @returns {undefined}
         */
        mod.sezonaOdpri = function (id) {
            require(['../Model/Sezona', '../View/SezonaView'], function (Model, View) {
                odpriModel(Model, View, id, 'sezona.title');
            });
        };

        /**
         * 
         * Routing za module
         */
        mod.addInitializer(function (options) {
            App.nav.registerNav(moduleNav);

            new Marionette.AppRouter({
                controller: mod,
                appRoutes: {
                    'pro/uprizoritev': "uprizoritev",
                    "pro/stroskovnik": "stroskovnik",
                    "pro/sezona": "sezona",
                    "pro/uprizoritev/:id": 'uprizoritevOdpri',
                    "pro/stroskovnik/:id": "stroskovnikOdpri",
                    "pro/sezona/:id": "sezonaOdpri"
                }
            });
        });

    };

    return modInit;
});
