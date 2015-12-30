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
        tagName: 'span',
        className: 'sodelujoci-oseba',
        template: Handlebars.compile('<span class="ime">{{oseba.label}}</span>, '),
        events: {
            'click': 'klikOseba'
        },
        klikOseba: function (e) {
            this.trigger('change', e);
        },
        initialize: function () {
            var privzeti = this.model.get('privzeti');
            if (privzeti) {
                this.model.set('izbran', true);
            }
        },
        onRender: function () {
            var izbran = this.model.get('izbran');
            if (izbran) {
                this.$el.addClass('active');
            }
        }
    });

    /**
     * Namenjena izroisu oseb v funkciji
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var OsebeView = Marionette.CompositeView.extend({
        className: 'sodelujoci-funkcija',
        template: Handlebars.compile('{{#if naziv}}{{naziv}}{{else}}{{t "funkcija.neimenovana"}}{{/if}}: <span class="sodelujoci-osebe"></span>'),
        childView: OsebaView,
        childViewContainer: '.sodelujoci-osebe',
        resetSelection: function () {
            var models = this.collection.models;
            for (var modelId in models) {
                models[modelId].set('izbran', false);
            }
        },
        onChildviewChange: function (child, e) {
            var model = child.model;
            var $el = child.$el;

            if (e.shiftKey) {
                //določimo in označimo trenutni model
                var trenutniModel = model;
                $el.addClass('active');
                model.set('izbran', true);

                var models = this.collection.models;
                var oznacuj = false;

                for (var id in models) {
                    //v kolikor so modeli med trenutnim in zadnje izbranim modelom se označujejo
                    if (models[id] === trenutniModel || models[id] === this.zadnjiOznacen) {
                        oznacuj = !oznacuj;
                    }
                    //v kolikor je označevanje true se poišče model in se označi
                    if (oznacuj) {
                        models[id].set('izbran', true);
                        var child = this.children.findByModel(models[id]);
                        if (child) {
                            var $e = child.$el;
                            if (!$e.hasClass('active')) {
                                $e.addClass('active');
                            }
                        }
                    }
                }
                this.zadnjiOznacen = trenutniModel;

            } else if (e.ctrlKey) {
                //če je pritisnjen ctrl se označujejo vsi modeli na katere kliknemo
                if (!$el.hasClass('active')) {
                    $el.addClass('active');
                    model.set('izbran', true);
                    this.zadnjiOznacen = model;
                    ;
                } else {
                    $el.removeClass('active');
                    model.set('izbran', false);
                }
            } else {
                //odstranimo vse prej označene modele
                this.resetSelection();

                //označimo kliknjen model
                if (!$el.hasClass('active')) {
                    this.$('.sodelujoci-oseba').removeClass('active');
                    $el.addClass('active');
                    model.set('izbran', true);
                    this.zadnjiOznacen = model;
                } else {
                    $el.removeClass('active');
                }
            }
            this.trigger('change', child.model.get('id'));
        },
        initialize: function (options) {
            this.funkcijeOsebe = [];

            this.collection.comparator = function (m1, m2) {
                var m1Privzeti = m1.get('privzeti');
                var m2Privzeti = m2.get('privzeti');

                if (m1Privzeti && !m2Privzeti) {
                    return -1;
                }
                else if (m1Privzeti === m2Privzeti) {
                    var m1Sort = m1.get('sort');
                    var m2Sort = m2.get('sort');

                    if (m1Sort < m2Sort) {
                        return -1;
                    }
                    else if (m1Sort === m2Sort) {
                        return 0;
                    }
                    else if (m1Sort > m2Sort) {
                        return 1;
                    }
                }
                else if (!m1Privzeti && m2Privzeti) {
                    return 1;
                }
            };

            this.collection.sort();
        }
    });

    /**
     * Namenjena izrisu funkcij v uprizoritvi
     * @type @exp;Marionette@pro;CompositeView@call;extend
     */
    var FunkcijeView = Marionette.CompositeView.extend({
        template: uprizoritevTpl,
        className: 'panel panel-default sodelujoci-uprizoritev',
        childView: OsebeView,
        childViewContainer: '.sodelujoci-funkcije',
        initialize: function (options) {
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
        },
        childViewOptions: function (model, index) {
            var modeli = model.get('alternacije');
            var coll = new Backbone.Collection(modeli);
            return{
                collection: coll
            };
        },
        onChildviewChange: function (item, osebaID) {
            var self = this;
            var funkcije = [];
            this.children.each(function (funkcija) {
                var osebe = [];
                var alternacije = funkcija.collection;
                alternacije.each(function (alternacija) {
                    if (alternacija.get('izbran')) {
                        osebe.push(alternacija.get('oseba').id);
                    }
                });
                var funk = {};
                funk[funkcija.model.get('id')] = osebe;
                funkcije.push(funk);
            });
            this.trigger('change', funkcije);
        },
        triggers: {
            'click .uprizoritev-odstrani': 'odstrani'
        }
    });
    
    var EmptyView = Marionette.ItemView.extend({
        template: Handlebars.compile('<div>Uprizoritev nima določene nobene funkcije.</div>')
    });

    /**
     * namenjena izrisu uprizoritev
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var ZasedbaView = Marionette.CompositeView.extend({
        template: uprizoritveTpl,
        emptyView: EmptyView,
        childView: FunkcijeView,
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
        onChildviewChange: function (item, funkcije) {
            this.trigger('change', funkcije);
        },
        onChildviewOdstrani: function (child) {
            this.collection.remove(child.model);
        }
    });

    return ZasedbaView;
});