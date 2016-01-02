/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'template!../tpl/select-zasedba-uprizoritve.tpl',
    'template!../tpl/select-zasedba-uprizoritev.tpl'
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
    var AlternacijaView = Marionette.ItemView.extend({
        tagName: 'span',
        className: 'zasedba-alternacija',
        template: Handlebars.compile('{{oseba.label}} '),
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

    var AlternacijeView = Marionette.CollectionView.extend({
        tagName: "span",
        childView: AlternacijaView,
        className: 'zasedba-alternacije',
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
                    this.$('.zasedba-oseba').removeClass('active');
                    $el.addClass('active');
                    model.set('izbran', true);
                    this.zadnjiOznacen = model;
                } else {
                    $el.removeClass('active');
                }
            }
            this.trigger('change');
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

    var FunkcijaView = Marionette.LayoutView.extend({
        className: 'funkcija',
        template: Handlebars.compile('<span class="funkcija-naslov">{{naziv}}: </span><span class="zasedba-region-alternacije"></span>'),
        regions: {
            alternacijeR: '.zasedba-region-alternacije'
        },
        onRender: function () {
            var view = new AlternacijeView({
                collection: this.model.get('alternacije')
            });

            view.on('change', function () {
                this.trigger('change');
            }, this);

            this.alternacijeR.show(view);
        }
    });

    var FunkcijeView = Marionette.CollectionView.extend({
        className: 'funkcije',
        childView: FunkcijaView,
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
        onChildviewChange: function () {
            this.trigger('change');
        }
    });

    var UprizoritevView = Marionette.LayoutView.extend({
        className: 'uprizoritev',
        template: uprizoritevTpl,
        triggers: {
            'click .uprizoritev-odstrani': 'odstrani'
        },
        regions: {
            funkcijeR: '.zasedba-region-funkcije'
        },
        onRender: function () {
            var view = new FunkcijeView({
                collection: this.model.get('funkcije')
            });

            view.on('change', function () {
                this.trigger('change');
            }, this);

            this.funkcijeR.show(view);
        }
    });

    var UprizoritveView = Marionette.CollectionView.extend({
        className: 'uprizoritve',
        childView: UprizoritevView,
        onChildviewChange: function () {
            this.trigger('change');
        },
        onChildviewOdstrani: function (child) {
            this.collection.remove(child.model);
        }
    });

    var ZasedbaView = Marionette.LayoutView.extend({
        className: 'zasedba',
        template: uprizoritveTpl,
        regions: {
            uprizoritveR: '.zasedba-region-uprizoritve'
        },
        onRender: function () {
            var view = new UprizoritveView({
                collection: this.options.collection
            });

            view.on('change', this.onChange, this);

            this.uprizoritveR.show(view);
        },
        onChange: function () {
            this.trigger('change');
        }
    });

    return ZasedbaView;
});