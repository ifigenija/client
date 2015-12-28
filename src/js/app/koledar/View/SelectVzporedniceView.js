/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'template!../tpl/select-vzporednice.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        vzporedniceTpl
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
    var OsebeView = Marionette.CollectionView.extend({
        className: 'vzporednice-osebe',
        childView: OsebaView
    });

    var FunkcijeView = Marionette.LayoutView.extend({
        tagName: 'li',
        className: 'vzporednice-funkcije',
        template: Handlebars.compile('<div>{{label}}</div><div>{{t "std.zasedeneOsebe"}}</div><ul class="zasedene-osebe"></ul><div>{{t "std.nezasedeneOsebe"}}</div><ul class="nezasedene-osebe"></ul>'),
        regions: {
            zasedeneR: '.zasedene-osebe',
            nezasedeneR: '.nezasedene-osebe'
        },
        onRender: function () {
            var zasedeneView = new OsebeView({
                collection: this.options.zasedene
            });
            var nezasedeneView = new OsebeView({
                collection: this.options.nezasedene
            });

            this.zasedeneR.show(zasedeneView);
            this.nezasedeneR.show(nezasedeneView);
        }
    });

    //potrebno bo pretvoriti v layout view z dvema regijama in collectionview za zasedene in nezasedene
    /**
     * Namenjena izrisu funkcij v uprizoritvi
     * @type @exp;Marionette@pro;CompositeView@call;extend
     */
    var UprizoritevView = Marionette.CompositeView.extend({
        tagName: 'li',
        className: 'vzporednice-uprizoritev',
        template: Handlebars.compile('<div>{{label}}</div><ul class="funkcije-container"></ul>'),
        childView: FunkcijeView,
        childViewContainer: '.funkcije-container',
        childViewOptions: function (model, index) {
            var modeli = model.get('zasedeneOsebe');
            var collZ = new Backbone.Collection(modeli);
            var modeli = model.get('nezasedeneOsebe');
            var collNZ = new Backbone.Collection(modeli);
            return{
                zasedene: collZ,
                nezasedene: collNZ
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
    var SelectVzporedniceView = Marionette.CompositeView.extend({
        template: vzporedniceTpl,
        childView: UprizoritevView,
        childViewContainer: '.vzporednice-uprizoritve',
        childViewOptions: function (model, index) {
            var modeli = model.get('konfliktneFunkcije');
            var coll = new Backbone.Collection(modeli);
            return{
                collection: coll
            };
        },
        onChildviewSelected: function (child) {
            this.trigger('selected', child.model);
        },
        serializeData: function(){
            return{
                title: this.options.title || i18next.t('vzporednice.title')
            };
        }
    });

    return SelectVzporedniceView;
});