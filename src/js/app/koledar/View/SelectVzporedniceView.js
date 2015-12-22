/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette
        ) {

    var ItemView = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'vzporednica',
        template: Handlebars.compile('{{label}}'),
        triggers: {
            'click': 'selected'
        }
    });

    var SelectVzporedniceView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'vzporednice',
        childView: ItemView
    });

    SelectVzporedniceView.prototype.onChildviewSelected = function (item) {
        var model = item.model;
        this.trigger('selected', model);
    };

    return SelectVzporedniceView;
});