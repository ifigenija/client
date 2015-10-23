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
        tagName: 'li',
        className: 'col-sm-6',
        template: itemTpl,
        serializeData: function () {
            return _.extend(this.model.toJSON(), {
                href: '#oseba/' + this.model.id
            });
        }
    });

    var OsebeView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'row',
        childView: OsebaView
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
        initialize: function (options) {
            this.formTitle = options.formTitle;
        },
        serializeData: function () {
            return  {
                formTitle: this.formTitle
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