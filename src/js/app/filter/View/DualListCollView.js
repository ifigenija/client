/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhodni podatki:
 *      - vrsta filtra
 *      - collection
 *
 * Izbira kriterijev filtra
 *
 * Izhodni podatki:
 *      - collection izbranih kriterijev
 *      
 * Api Collection View
 *  metode:
 *      - getSelectedModels
 *      - getAllModels
 *      - onChildviewSelect
 *      - resetSelection
 *      - search
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'underscore'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        _
        ) {
    /**
     * V kolikor želimo overridat ItemView, mora itemView imeti
     * event, na klick da poberemo event podatke za shift in control
     * prožit more select s event podatki kot parametrom
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var DualListItemView = Marionette.ItemView.extend({
        template: Handlebars.compile('{{label}}'),
        tagName: 'li',
        className: 'duallist-item list-group-item',
        events: {
            'click': 'klikVrstica'
        },
        klikVrstica: function (e) {
            this.trigger('select', e);
        }
    });

    var EmptyView = Marionette.ItemView.extend({
        template: Handlebars.compile('{{t "std.prazenSeznam"}}')
    });

    /**
     * Collection view skrbi za iznačevanje modelov
     *  methode, ki jih mora vsebovati onChildviewSelect skrbi za označevanje modelov
     *      - getSelectedModels : vrne označene modele v collectionu
     *      - getAllModels : vrne vse modele iz collectiona
     *      - resetselection : vse označene modele odznači
     *      - search : nastavi filter collectiona, kateri filtri se naj pokažejo kateri pa ne
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var DualListCollView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'duallist-seznam list-group',
        emptyView: EmptyView
    });

    /**
     * 
     * @param Array options
     *      - ItemView je View, ki se bo uporabil za pogled
     *      - template za itemViewja
     * @returns {undefined}
     */
    DualListCollView.prototype.initialize = function (options) {
        this.ItemView = options.ItemView || DualListItemView;
        this.itemTemplate = options.itemTemplate || null;

        //izvedemo samo v primeru da imamo zunanji template brez podanega ItemView-ja
        if (options.itemTemplate && !options.ItemView) {
            this.ItemView = this.ItemView.extend({
                template: this.itemTemplate
            });
        }
    };

    /**
     * Vrne View, ki se bo uporabil kot ChildView za collectionView
     * @returns {DualListCollView_L21.DualListCollView.options.ItemView}
     */
    DualListCollView.prototype.getChildView = function () {
        return this.ItemView;
    };

    /**
     * V polje shranemo id modela.
     * V kolikor je že bil izbran se ga odstrani iz polja
     * @param {type} item
     * @returns {undefined}
     */
    DualListCollView.prototype.onChildviewSelect = function (item, e) {
        var model = item.model;
        var $el = item.$el;

        if (e.shiftKey && this.getSelectedModels().length > 0) {
            //določimo in označimo trenutni model
            var trenutniModel = model;
            $el.addClass('active');
            model.set('selected', true);

            var models = this.collection.models;
            var oznacuj = false;

            for (var id in models) {
                //v kolikor so modeli med trenutnim in zadnje izbranim modelom se označujejo
                if (models[id] === trenutniModel || models[id] === this.zadnjiOznacen) {
                    oznacuj = !oznacuj;
                }
                //v kolikor je označevanje true se poišče model in se označi
                if (oznacuj) {
                    models[id].set('selected', true);
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
                model.set('selected', true);
                this.zadnjiOznacen = model;
                ;
            } else {
                $el.removeClass('active');
                model.set('selected', false);
            }
        } else {
            //odstranimo vse prej označene modele
            this.$('.duallist-item').removeClass('active');
            this.resetSelection();

            //označimo kliknjen model
            if (!$el.hasClass('active')) {
                $el.addClass('active');
                model.set('selected', true);
                this.zadnjiOznacen = model;
            }
        }

    };
    /**
     * Vrne polje modelov, ki jih želimo izbrati
     * @returns {Marionette.CollectionView@call;extend.prototype.getSelectedModels.result|Array}
     */
    DualListCollView.prototype.getSelectedModels = function () {
        var result = [];
        var models = this.collection.models;
        for (var modelId in models) {
            if (models[modelId].get('selected')) {
                result.push(models[modelId]);
            }
        }
        return result;
    };
    /**
     * Vrne polje vseh modelov iz collectiona
     * @returns {DualListCollView_L21.DualListCollView.collection.models}
     */
    DualListCollView.prototype.getAllModels = function () {
        return _.clone(this.collection.models);
    };
    /**
     * resetiramo polje modelov
     * @returns {DualListCollView_L21.DualListCollView.collection.models}
     */
    DualListCollView.prototype.resetSelection = function () {
        var models = this.collection.models;
        for (var modelId in models) {
            models[modelId].set('selected', false);
        }
    };

    /**
     * 
     * @param Collection collPrimerjava
     *      collPrimerjava vsebuje seznam modelov, ki jih v tem collectionu ne smemo prikazati.
     * @returns {undefined}
     */
    DualListCollView.prototype.search = function (collPrimerjava) {
        this.filter = function (child, index, collection) {
            var models = collPrimerjava.models;
            for (var index in models) {
                if (child.get('id') === models[index].get('id')) {
                    return false;
                }
            }
            return true;
        };
        this.render();
    };

    return DualListCollView;
});