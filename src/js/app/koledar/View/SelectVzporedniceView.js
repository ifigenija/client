/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'underscore',
    'marionette',
    'template!../tpl/select-vzporednice.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette,
        vzporedniceTpl
        ) {

    /**
     * Namenjena izrisu osebe
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var OsebaView = Marionette.ItemView.extend({
        className: 'oseba',
        tagName: 'span',
        template: Handlebars.compile('<span class="ime">{{label}}</span>, ')
    });

    /**
     * Namenjena izroisu oseb v funkciji
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var OsebeView = Marionette.CollectionView.extend({
        className: 'osebe',
        tagName: 'span',
        childView: OsebaView
    });

    var FunkcijeView = Marionette.LayoutView.extend({
        tagName: 'li',
        className: 'funkcije',
        template: Handlebars.compile('{{#if label}}{{label}}{{else}}{{t "funkcija.neimenovana"}}{{/if}}: <span class="zasedene-osebe"></span><span class="nezasedene-osebe"></span>'),
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
        className: 'uprizoritev',
        template: Handlebars.compile('{{label}}<ul class="funkcije"></ul>'),
        childView: FunkcijeView,
        childViewContainer: '.funkcije',
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
        },
        initiallize: function (options) {
            this.template = options.template || this.tempalte;
        }
    });

    var EmptyView = Marionette.ItemView.extend({
        template: Handlebars.compile('<div>Vzporednice ne obstajajo.</div>')
    });

    /**
     * namenjena izrisu uprizoritev
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var SelectVzporedniceView = Marionette.CompositeView.extend({
        template: vzporedniceTpl,
        emptyView: EmptyView,
        childView: UprizoritevView,
        childViewContainer: function () {
            return '.' + this.class + '-uprizoritve';
        },
        initialize: function (options) {
            this.collection.comparator = function (m1, m2) {
                var m1konf = m1.get('konfliktneFunkcije');
                var m2konf = m2.get('konfliktneFunkcije');

                if (_.isEmpty(m1konf) && !_.isEmpty(m2konf)) {
                    return -1;
                }
                else if (_.isEmpty(m1konf) === _.isEmpty(m2konf)) {
                    return 0;
                }
                else if (!_.isEmpty(m1konf) && _.isEmpty(m2konf)) {
                    return 1;
                }
            };

            this.class = options.class;

            this.collection.sort();
        },
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
        serializeData: function () {
            return {
                class: this.options.class,
                title: this.options.title || i18next.t('vzporednice.title')
            };
        }
    });

    return SelectVzporedniceView;
});