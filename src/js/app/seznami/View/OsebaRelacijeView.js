/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    '../Model/RelationCollection',
    'i18next',
    'template!../tpl/oseba-relacije.tpl',
    'radio'
], function (
        Marionette,
        RelationColl,
        i18next,
        relationTpl,
        Radio
        ) {
    var ModelView = Marionette.ItemView.extend({
        tagName: 'li',
        template: null,
        initialize: function (options) {
            this.template = options.itemTpl;
            this.serializeData = options.serializeData;
        }
    });

    var CollView = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'row',
        childView: ModelView,
        initialize: function (options) {
            this.childView = ModelView.extend({options: options.options});
        }
    });
    /**
     * 
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var OsebaRelacijeView = Marionette.LayoutView.extend({
        template: relationTpl,
        regions: {
            seznamR: '.relation-seznam'
        }
    });
    /**
     * 
     */
    OsebaRelacijeView.prototype.onRender = function () {
        this.renderSeznam();
        this.$('.relation-title').text(this.options.title);
    };
    /**
     * 
     */
    OsebaRelacijeView.prototype.renderSeznam = function () {
        var self = this;
        var c = this.collection = new RelationColl([], {
            owner: this.options.owner,
            ownerId: this.options.ownerId,
            relation: this.options.relation
        });

        var collView = new CollView({
            collection: this.collection,
            options: this.options
        });

        c.fetch({
            success: function () {
                self.seznamR.show(collView);
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    return OsebaRelacijeView;
});