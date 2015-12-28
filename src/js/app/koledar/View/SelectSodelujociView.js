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
        tagName: 'li',
        className: 'sodelujoci-oseba',
        template: Handlebars.compile('<div>{{oseba.label}}</div>'),
        triggers: {
            'click': 'change'
        },
        initialize: function(){
            var privzeti = this.model.get('privzeti');
            if(privzeti){
                this.model.set('izbran', true);
            }
        },
        onRender: function(){
            var izbran = this.model.get('izbran');
            if(izbran){
                this.$el.addClass('active');
            }
        }
    });

    /**
     * Namenjena izroisu oseb v funkciji
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var FunkcijeView = Marionette.CompositeView.extend({
        template: Handlebars.compile('{{naziv}}<ul class="sodelujoci-osebe"></ul>'),
        childView: OsebaView,
        childViewContainer: '.sodelujoci-osebe',
        onChildviewChange: function (child) {
            var izbran = child.model.get('izbran');
            if(izbran){
                this.$('.sodelujoci-oseba').removeClass('active');
                child.$el.addClass('active');
            }
            this.trigger('change', child.model.get('id'));
        }
    });

    /**
     * Namenjena izrisu funkcij v uprizoritvi
     * @type @exp;Marionette@pro;CompositeView@call;extend
     */
    var UprizoritevView = Marionette.CompositeView.extend({
        template: uprizoritevTpl,
        className: 'panel panel-default sodelujoci-uprizoritev',
        childView: FunkcijeView,
        childViewContainer: '.sodelujoci-funkcije',
        initialize: function (options) {
            this.funkcijeOsebe = [];
        },
        childViewOptions: function (model, index) {
            var modeli = model.get('alternacije');
            var coll = new Backbone.Collection(modeli);
            return{
                collection: coll
            };
        },
        onChildviewChange: function (item, osebaID) {
            var funkcijaID = item.model.get('id');
            this.trigger('change', funkcijaID, osebaID);
        },
        triggers:{
            'click .uprizoritev-odstrani' : 'odstrani'
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
            this.izbraneOsebe = {};
        },
        childViewOptions: function (model, index) {
            var modeli = model.get('funkcije');
            var coll = new Backbone.Collection(modeli);
            return{
                collection: coll
            };
        },
        onChildviewChange: function (item, funkcijaID, osebaID) {
            this.izbraneOsebe[funkcijaID] = osebaID;
            this.trigger('change', this.izbraneOsebe);
        },
        onChildviewOdstrani: function (child) {
            this.collection.remove(child.model);
        }
    });

    return SelectSodelujociView;
});