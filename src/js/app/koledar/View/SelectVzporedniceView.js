/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'underscore'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        _
        ) {

    var ItemView = Marionette.ItemView.extend({
        tagName: 'li',
        className: 'vzporednica',
        template: Handlebars.compile('{{label}}'),
        triggers: {
            'click': 'selected'
        },
        serializeData: function () {
            return _.extend(this.model.toJSON(), {
                zasedeni: this.getZasedeni(),
                nezasedeni: this.getNezasedeni()
            });
        },
        getZasedeni: function () {
            var osebe = this.model.get('osebe');
            if (osebe) {
                
            }
            return null;
        },
        getNezaseden: function () {
            var osebe = this.model.get('osebe');
            if (osebe) {
                
            }
            return null;
        }
    });

    var SelectVzporedniceView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'vzporednice',
        childView: ItemView,
        initialize: function () {
            this.collection.comparator = function (model1, model2) {
                if (model1.get('osebe') && model2.get('osebe')) {
                    return 0;
                } else if (!model1.get('osebe') && !model2.get('osebe')) {
                    return 0;
                }
                else if (model1.get('osebe')) {
                    return 1;
                }
                else if (model2.get('osebe')) {
                    return -1;
                }
            };
            this.collection.sort();
        }
    });

    SelectVzporedniceView.prototype.onChildviewSelected = function (item) {
        var model = item.model;
        this.trigger('selected', model);
    };

    return SelectVzporedniceView;
});