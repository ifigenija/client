/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/bars',
    'i18next',
    'radio',
    'backbone',
    'underscore',
    'template!../tpl/podobnaOseba-item.tpl',
    'template!../tpl/podobneOsebe.tpl'
], function (
        Marionette,
        Handlebars,
        i18next,
        Radio,
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
            seznamR: '.seznam-podobnih-oseb'
        },
        triggers: {
            'click .shrani-podobno-osebo': 'shrani',
            'click .preklici-podobno-osebo': 'preklici'
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