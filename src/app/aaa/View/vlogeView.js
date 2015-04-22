/* 
 * Licenca GPLv3
 */
define([
    "marionette",
    "app/handlebars"
], function (
        Marionette,
        Handlebars
        ) {

    var VlogaView = Marionette.ItemView.extend({
        tagName: "li",
        template: Handlebars.compile(" {{ vloga }} ")
    });


    var View = Marionette.CollectionView.extend({
        childView: VlogaView,
        tagName: "ul"
        });

    return View;
});

