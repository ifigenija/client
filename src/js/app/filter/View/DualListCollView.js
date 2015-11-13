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
    var DualListItemView = Marionette.ItemView.extend({
        template: Handlebars.compile('<div class="item">{{label}}</div>'),
        className: 'duallist-item',
        triggers: {
            'click .item': 'select'
        }
    });
    var DualListCollView = Marionette.CollectionView.extend({
        template: Handlebars.compile('<div>cv</div>'),
        className: 'duallist-seznam'
    });

    DualListCollView.prototype.initialize = function () {
        this.selectedModels = {};
    };
    /**
     * Vrne View, ki se bo uporabil kot ChildView za collectionView
     * @returns {DualListCollView_L21.DualListCollView.options.ItemView}
     */
    DualListCollView.prototype.getChildView = function () {
        return this.options.ItemView || DualListItemView;
    };

    /**
     * V polje shranemo id modela.
     * V kolikor je že bil izbran se ga odstrani iz polja
     * @param {type} item
     * @returns {undefined}
     */
    DualListCollView.prototype.onChildviewSelect = function (item) {
        var selected = false;
        if (!item.$el.hasClass('active')) {
            item.$el.addClass('active');
            selected = true;
        } else {
            item.$el.removeClass('active');
        }

        var model = item.model;

        if (selected)
            this.selectedModels[model.id] = 1;
        else {
            delete this.selectedModels[model.id];
        }
    };

    /**
     * Vrne polje modelov, ki jih želimo izbrati
     * @returns {Marionette.CollectionView@call;extend.prototype.getSelectedModels.result|Array}
     */
    DualListCollView.prototype.getSelectedModels = function () {
        var result = [];
        for (var modelId in this.selectedModels) {
            result.push(this.collection.get(modelId));
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
        this.selectedModels = {};
    };

    DualListCollView.prototype.search = function (options) {
        var search = options.search;
        var coll = options.coll;

        this.filter = function (child, index, collection) {
            var models = coll.models;
            for (var index in models) {
                if (child.get('id') === models[index].get('id')) {
                    return false;
                } else {
                    for (var attr in models.attributes) {
                        if (!_.isArray(attr) && attr.toLowerCase().indexOf(search) < 0) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };

        this.render();
    };

    return DualListCollView;
});