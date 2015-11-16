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
     * trigger, ki sproči "select"
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var DualListItemView = Marionette.ItemView.extend({
        template: Handlebars.compile('{{label}}'),
        tagName: 'li',
        className: 'duallist-item list-group-item',
        triggers: {
            'click': 'select'
        }
    });

    var DualListCollView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'duallist-seznam list-group'
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
    DualListCollView.prototype.onChildviewSelect = function (item) {
        var model = item.model;
        var $el = item.$el;

        if (!$el.hasClass('active')) {
            $el.addClass('active');
            model.set('selected', true);
        } else {
            $el.removeClass('active');
            model.set('selected', false);
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