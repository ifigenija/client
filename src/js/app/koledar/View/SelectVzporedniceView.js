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

    /**
     * Namenjena izrisu osebe
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var OsebaView = Marionette.ItemView.extend({
        className: 'vzporednice-oseba',
        template: Handlebars.compile('<div>{{label}}</div>')
    });

    /**
     * Namenjena izroisu oseb v funkciji
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var FunkcijeView = Marionette.CollectionView.extend({
        className: 'vzporednice-funkcije',
        childView: OsebaView
    });

    /**
     * Namenjena izrisu funkcij v uprizoritvi
     * @type @exp;Marionette@pro;CompositeView@call;extend
     */
    var UprizoritevView = Marionette.CompositeView.extend({
        className: 'vzporednice-uprizoritev',
        template: Handlebars.compile('<div>{{label}}</div>'),
        childView: FunkcijeView,
        childViewOptions: function (model, index) {
            var modeli = model.get('osebe');
            var coll = new Backbone.Collection(modeli);
            return{
                collection: coll
            };
        },
        triggers: {
            'click': 'selected'
        }
    });

    /**
     * namenjena izrisu uprizoritev
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var SelectVzporedniceView = Marionette.CollectionView.extend({
        className: 'vzporednice-uprizoritve',
        childView: UprizoritevView,
        childViewOptions: function (model, index) {
            var modeli = model.get('alterCountFunkcije');
            var coll = new Backbone.Collection(modeli);
            return{
                collection: coll
            };
        },
        onChildviewSelected: function (child) {
            this.trigger('selected', child.model);
        }
    });

    return SelectVzporedniceView;
});