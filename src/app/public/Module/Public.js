/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'require',
    'backbone',
    'app/handlebars'
], function (
        Marionette,
        require,
        Backbone,
        Handlebars
        ) {


    var modInit = function (mod, App, Backbone, Marionette, $, _) {

        mod.program = function () {
            var xx = new Marionette.ItemView({
                template: Handlebars.compile("<div>program</div>")
            });
            App.glavniContainer.show(xx);
        };

        mod.uprizoritve = function () {
            var xx = new Marionette.ItemView({
                template: Handlebars.compile("<div>uprizoritve <a href=\"#uprizoritev/12\">dvanajsta</a></div>")
            });
            App.glavniContainer.show(xx);

        };

        mod.uprizoritev = function (id) {
            var model = new Backbone.Model({
               stevilka: id 
            });
            var xx = new Marionette.ItemView({
                template: Handlebars.compile("<div>Uprizoritev št {{ stevilka }}.</div>"),
                model: model
            });
            App.glavniContainer.show(xx);
        };

        mod.addInitializer(function (options) {
            new Marionette.AppRouter({
                controller: mod,
                appRoutes: {
                    'uprizoritve': 'uprizoritve',
                    'uprizoritev/:id': 'uprizoritev',
                    'program': 'program'
                }
            });
        });

    };

    return modInit;
});
