/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    '../Model/RelationCollection',
    'app/bars',
    'i18next',
    'app/Max/Module/Backgrid',
    'underscore',
    'template!../tpl/oseba-relacije.tpl',
    'radio',
    'backbone'
], function (
        Marionette,
        RelationColl,
        Handlebars,
        i18next,
        Backgrid,
        _,
        relationTpl,
        Radio,
        Backbone
        ) {

    /**
     * 
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var RelacijaView = Marionette.ItemView.extend({
        tagName: 'a',
        className: 'list-group-item col-sm-6',
        template: Handlebars.compile('{{ itemNaslov }}')
    });
    RelacijaView.prototype.serializeData = function () {
        var self = this;

        return _.extend(this.model.toJSON(), {
            itemNaslov: function () {
                return self.model.get('id');
            }
        });
    };
    /**
     * 
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var RelacijeView = Marionette.CollectionView.extend({
        className: 'list-group',
        childView: RelacijaView
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

        var grid = new Backgrid.Grid({
            collection: c,
            row: Backgrid.ClickableRow,
            columns: this.options.columns
        });

        this.listenTo(c, 'selectValue', this.onUredi);
//        var vloge = new RelacijeView({
//            collection: c
//        });
        c.fetch({
            success: function () {
                self.seznamR.show(grid);
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
//        this.seznamR.show(vloge);
    };
    /**
     * 
     * @returns {undefined}
     */
    OsebaRelacijeView.prototype.onUredi = function (model) {
        this.trigger('uredi',model);
    };

    return OsebaRelacijeView;
});