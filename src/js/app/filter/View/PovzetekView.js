/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 */

define([
    'radio',
    'i18next',
    'backbone',
    'marionette',
    'app/bars'
], function (
        Radio,
        i18next,
        Backbone,
        Marionette,
        Handlebars
        ) {

    var ItemView = Backbone.Marionette.ItemView.extend({
        tagName: 'span',
        template: Handlebars.compile('{{label}}, ')
    });

    var PovzetekView = Marionette.CollectionView.extend({
        tagName: 'span',
        childView: ItemView
    });

    return PovzetekView;
});



