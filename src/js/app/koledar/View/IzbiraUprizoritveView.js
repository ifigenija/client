/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'template!../tpl/izbira-upr.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        tpl
        ) {
    var IzbriraUprizoritveView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            uprizoritevR: '.region-uprizoritev',
            vzporedniceR: '.region-vzporednice',
            osebeR: '.region-osebe'
        }
    });

    return IzbriraUprizoritveView;
});