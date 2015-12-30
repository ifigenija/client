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
        className: function(){
            if(this.model.get('zasedena')){
                return 'oseba zasedena';
            }
            return 'oseba';
        },
        tagName: 'span',
        template: Handlebars.compile('{{label}} ')
    });
    
    var OsebeView = Marionette.CompositeView.extend({
        className: 'funkcija',
        tagName: 'span',
        template: Handlebars.compile('{{#if label }}{{label}}{{else}}{{t "funkcija.neimenovana"}}{{/if}}: <div class="osebe"></div>'),
        childView: OsebaView,
        childViewContainer: '.osebe'
    });

    //potrebno bo pretvoriti v layout view z dvema regijama in collectionview za zasedene in nezasedene
    /**
     * Namenjena izrisu funkcij v uprizoritvi
     * @type @exp;Marionette@pro;CompositeView@call;extend
     */
    var FunkcijeView = Marionette.CompositeView.extend({
        className: 'uprizoritev',
        template: Handlebars.compile('{{label}} <ul class="funkcije"></ul>'),
        childView: OsebeView,
        childViewContainer: '.funkcije',
        childViewOptions: function (model) {
            return{
                collection: model.get('osebe')
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
        childView: FunkcijeView,
        className: 'vzporednice-panel',
        childViewContainer: '.uprizoritve',
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
            return{
                collection: model.get('konfliktneFunkcije')
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