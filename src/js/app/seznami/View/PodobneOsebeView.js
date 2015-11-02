/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'i18next',
    'backbone',
    'underscore',
    'template!../tpl/podobnaOseba-item.tpl',
    'template!../tpl/podobneOsebe.tpl'
], function (
        Marionette,
        i18next,
        Backbone,
        _,
        itemTpl,
        tpl
        ) {

    var OsebaView = Marionette.ItemView.extend({
        tagName: 'label',
        template: itemTpl,
        serializeData: function () {
            return _.extend(this.model.toJSON(), {
                href: '#oseba/' + this.model.id,
                index: this.options.itemIndex
            });
        }
    });

    var OsebeView = Marionette.CollectionView.extend({
        childView: OsebaView,
        childViewOptions: function (model, index) {
            return {
                itemIndex: index
            };
        }
    });

    var PodobneOsebeView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            seznamR: '.podobne-osebe-seznam'
        },
        triggers: {
            'click .podobne-osebe-shrani': 'shrani',
            'click .podobne-osebe-preklici': 'preklici'
        },
        onRender: function () {
            this.renderSeznam();
        },
        serializeData: function () {
            return  {
                formTitle: i18next.t("std.opozorilo.podobneOsebe")
            };
        }
    });

    PodobneOsebeView.prototype.onShrani = function () {
        this.trigger('shraniOsebo');
    };

    PodobneOsebeView.prototype.onPreklici = function () {
        this.trigger('preklici');
    };

    PodobneOsebeView.prototype.renderSeznam = function () {
        this.collection = new Backbone.Collection(this.options.osebe);

        var osebe = new OsebeView({
            collection: this.collection
        });

        this.seznamR.show(osebe);

    };

    return PodobneOsebeView;
});