/* 
 * Licenca GPLv3
 */
define([
    "marionette",
    "app/bars"
], function (
        Marionette,
        Handlebars) {


    var DebelaKnjigaView = Marionette.ItemView.extend({
        tagName: "li",
        template: Handlebars.compile(" Debela {{ id }}.\
        {{ avtor }}: {{ naslov }} "),
        triggers: {
            "click": "debela:knjiga"
        },
        onDebelaKnjiga: function () {
            console.log("Debela knjiga");
        }
    });


    var KnjigaView = Marionette.ItemView.extend({
        tagName: "li",
        template: Handlebars.compile(" {{ id }}.\
        {{ avtor }}: {{ naslov }} "),
        events: {
            "click": "knjiga"
        },
        knjiga: function () {
            console.log("Knjiga");
        }
    });


    var View = Marionette.CollectionView.extend({
        getChildView: function (model) {
            if (model.get("debela")) {
                return DebelaKnjigaView;
            } else {
                return KnjigaView;
            }
        },
        tagName: "ul"
    });

    return View;
});

