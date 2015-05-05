/**
 * Kalkulacije 
 */

define([
    'marionette',
    'require'
], function (
        Marionette,
        require
        ) {


    var modInit = function (mod, MyApp, Backbone, Marionette, $, _) {

        var openDokumentView = function (View, model) {
            var openView = function () {
                var view = new View({model: model});
                MyApp.TabLayout.openTab(view, view.getTabNaslov());
            };

            if (model.isNew()) {
                openView();
            } else {
                model.once('sync', openView);
                model.fetch();
            }
        };

        var dodajFun = function (Model, DokumentView) {
            openDokumentView(DokumentView, new Model.Dokument());
        };

        mod.drzavaDodaj = function () {
            require(['../Model/Drzv', '../View/DrzvView'], dodajFun);

        };

        mod.drzava = function (id) {
            require(['../Model/Drzv', '../View/DrzvView'],
                    function (Model, DokumentView) {
                        openDokumentView(DokumentView, new Model.Dokument({id: id}));
                    });
        };

        mod.addInitializer(function (options) {
            new Marionette.AppRouter({
                controller: mod,
                appRoutes: {
                    'drzava/dodaj': 'drzavaDodaj',
                    'drzava/:id': 'drzava'
                }
            });
        });

    };

    return modInit;
});