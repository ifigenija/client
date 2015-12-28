/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'template!../tpl/select-sodelujoci-uprizoritve.tpl',
    'template!../tpl/select-sodelujoci-uprizoritev.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        uprizoritveTpl,
        uprizoritevTpl
        ) {

    /**
     * Namenjena izrisu osebe
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var OsebaView = Marionette.ItemView.extend({
        className: 'sodelujoci-oseba',
        template: Handlebars.compile('<div>{{label}}</div>'),
        triggers: {
            'click': 'change'
        }
    });

    /**
     * Namenjena izroisu oseb v funkciji
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var FunkcijeView = Marionette.CollectionView.extend({
        childView: OsebaView,
        onChildviewChange: function (item) {
            this.trigger('change', item.model);
        }
    });

    /**
     * Namenjena izrisu funkcij v uprizoritvi
     * @type @exp;Marionette@pro;CompositeView@call;extend
     */
    var UprizoritevView = Marionette.CompositeView.extend({
        template: uprizoritevTpl,
        childView: FunkcijeView,
        childViewContainer: '.sodelujoci-funkcije',
        initialize: function (options) {
            this.funkcijeOsebe = [];
        },
        childViewOptions: function (model, index) {
            var modeli = model.get('osebe');
            var coll = new Backbone.Collection(modeli);
            return{
                collection: coll
            };
        },
        onChildviewChange: function (item, osebaM) {
            this.funkcijeOsebe[item.model.get('id')] = osebaM.get('id');
            this.trigger('change', this.funkcijeOsebe);
        }
    });

    /**
     * namenjena izrisu uprizoritev
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var SelectSodelujociView = Marionette.CompositeView.extend({
        template: uprizoritveTpl,
        childView: UprizoritevView,
        childViewContainer: '.sodelujoci-uprizoritve',
        initialize: function () {
            this.izbraneOsebe = [];
        },
        childViewOptions: function (model, index) {
            var modeli = model.get('funkcije');
            var coll = new Backbone.Collection(modeli);
            return{
                collection: coll
            };
        },
        onChildviewChange: function (item, funkcijaOseba) {
            this.izbraneOsebe.concat(funkcijaOseba);
            this.trigger('change', this.izbraneOsebe);
        }
    });

    return SelectSodelujociView;
});