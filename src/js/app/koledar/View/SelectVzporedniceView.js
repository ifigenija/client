/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'app/bars',
    'underscore',
    'marionette',
    'template!../tpl/select-vzporednice.tpl'
], function (
        i18next,
        Handlebars,
        _,
        Marionette,
        vzporedniceTpl
        ) {

    /**
     * Namenjena izrisu osebe
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var OsebaView = Marionette.ItemView.extend({
        className: function () {
            if (this.model.get('zasedena')) {
                return 'oseba zasedena';
            }
            return 'oseba nezasedena';
        },
        tagName: 'span',
        template: Handlebars.compile('{{label}} ')
    });

    var OsebeView = Marionette.CollectionView.extend({
        className: 'osebe',
        tagName: 'span',
        childView: OsebaView
    });

    var FunkcijaView = Marionette.LayoutView.extend({
        tagName: 'li',
        className: 'funkcija',
        template: Handlebars.compile('{{#if label }}{{label}}{{else}}{{t "funkcija.neimenovana"}}{{/if}}: <span class="region-osebe"></span>'),
        regions: {
            alternacijeR: '.region-osebe'
        },
        onRender: function () {
            var view = new OsebeView({
                collection: this.model.get('osebe')
            });

            this.alternacijeR.show(view);
        }
    });

    var FunkcijeView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'funkcije',
        childView: FunkcijaView,
        initiallize: function (options) {
            this.funkcijeOsebe = [];

            this.collection.comparator = function (m1, m2) {
                var m1Count = m1.get('alterCount');
                var m2Count = m2.get('alterCount');

                if (m1Count > m2Count) {
                    return -1;
                }
                else if (m1Count === m2Count) {
                    return 0;
                }
                else if (m1Count < m2Count) {
                    return 1;
                }
            };

            this.collection.sort();
        }
    });

    var UprizoritevView = Marionette.LayoutView.extend({
        className: 'uprizoritev',
        template: Handlebars.compile('<a href="{{href}}" class="uprizoritev-link">{{label}}</a><div class="region-funkcije"></div'),
        regions: {
            funkcijeR: '.region-funkcije'
        },
        triggers: {
            'click .uprizoritev-link': 'selected'
        },
        serializeData: function () {
            var href = this.model.get('href');
            return _.extend(this.model.toJSON(), {
                href: href ? href : 'javascript:void(0)'
            });
        },
        onRender: function () {
            var view = new FunkcijeView({
                collection: this.model.get('konfliktneFunkcije')
            });

            this.funkcijeR.show(view);
        }
    });

    var EmptyView = Marionette.ItemView.extend({
        template: Handlebars.compile('Vzporednice ne obstajajo.')
    });
/**
 * Funkcija odgovorna za prikaz uprizoritev
 * uprizoritve:[
 *                  [
 *                      id,
 *                      ident,
 *                      label,
 *                      konfliktneFunkcije:[
 *                                              [
 *                                                  id
 *                                                  ident
 *                                                  podrocje
 *                                                  zasedeneOsebe:[
 *                                                                  id
 *                                                                  ident
 *                                                                  label
 *                                                                  priimek
 *                                                                  ime
 *                                                                  psevdonim
 *                                                                ]
 *                                              nezasedeneOsebe:[enako kot pri zasedenih]
 *                                              ]
 *                                          ]
 *                   ]
 *              ]

 * @type @exp;Marionette@pro;CompositeView@call;extend
 */
    var UprizoritveView = Marionette.CompositeView.extend({
        emptyView: EmptyView,
        template: vzporedniceTpl,
        childView: UprizoritevView,
        className: 'panel panel-default vzporednice-panel',
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

    return UprizoritveView;
});