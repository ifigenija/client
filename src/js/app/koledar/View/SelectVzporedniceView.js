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
            return _.extend(this.model.toJSON(), {
                href: this.options.href || 'javascript:void(0)'
            });
        },
        onRender: function () {
            var view = new FunkcijeView({
                collection: this.model.get('konfliktneFunkcije')
            });

            this.funkcijeR.show(view);
        }
    });

    var UprizoritveView = Marionette.CollectionView.extend({
        emptyView: EmptyView,
        childView: UprizoritevView,
        className: 'uprizoritve',
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
        }
    });

    var EmptyView = Marionette.ItemView.extend({
        template: Handlebars.compile('<div>Vzporednice ne obstajajo.</div>')
    });

    var SelectVzporedniceView = Marionette.LayoutView.extend({
        template: vzporedniceTpl,
        className: 'vzporednice-panel',
        regions: {
            uprizoritveR: '.uprizoritve'
        },
        onRender: function () {
            var view = new UprizoritveView({
                collection: this.options.collection
            });

            var self = this;
            view.on('selected', function (model) {
                self.trigger('selected', model);
            }, this);

            this.uprizoritveR.show(view);
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