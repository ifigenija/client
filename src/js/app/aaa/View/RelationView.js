/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/Max/Model/RelationCollection',
    'app/Max/Module/Form',
    'template!../tpl/relation.tpl',
    'app/bars',
    'i18next'
], function (
        Marionette,
        RelationColl,
        Form,
        relationTpl,
        Handlebars,
        i18next
        ) {



// relation view je vzorec za many to many relacije 


    var MemberView = Marionette.ItemView.extend({
        tagName: 'a',
        className: 'list-group-item col-sm-6',
        template: Handlebars.compile('{{ name }}<span class="badge"><span class="fa fa-trash"></span></span>'),
        triggers: {
            'click .fa-trash': 'delete'
        }
    });

    /**
     * 
     * 
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var MembersView = Marionette.CollectionView.extend({
        className: 'list-group',
        initialize: function (options) {
            this.childView = options.ItemView || MemberView;
        },
        onChildviewDelete: function (view) {
            this.collection.dissociate(view.model);
        }
    });


    var RelationView = Marionette.LayoutView.extend({
        template: relationTpl,
        regions: {
            izborR: '.polje-z-gumbom .izbor',
            seznamR: '.relation-seznam'
        },
        events: {
            'click .polje-z-gumbom .dodaj': 'dodaj'
        },
        onRender: function () {
            this.renderIzbor();
            this.renderSeznam();
        }
    });

    RelationView.prototype.initialize = function (options) {
        this.ItemView = options.ItemView;
    };

    /**
     * Nariše vloge lookup in gumb dodaj
     * @returns {undefined}
     */
    RelationView.prototype.renderIzbor = function () {

        var sch;

        if (!this.options.type) {
            sch = {type: 'LookupSelect', targetEntity: this.options.lookup, editorAttrs: {class: 'form-control'}};
        } else if (this.options.type === 'lookup') {
            sch = {type: 'Toone', targetEntity: this.options.lookup, editorAttrs: {class: 'form-control'}};
        }

        this.formIzberi = new Form({
            template: Handlebars.compile('<div data-editors="id"></div>'),
            schema: {
                id: sch
            }
        });
        this.$('.relation-title').text(this.options.title);

        this.izborR.show(this.formIzberi);

    };

    RelationView.prototype.dodaj = function () {
        var val = this.formIzberi.getValue();
        var id;
        if (val.id) {

            if (!this.options.type) {
                id = val.id;
            } else if (this.options.type === 'lookup') {
                id = val.id.id;
            }
            this.collection.associate(id);
        }
    };

    /**
     * Nariše vloge view in sproži nalaganje kolekcije
     * @returns {undefined}
     */
    RelationView.prototype.renderSeznam = function () {
        var c = this.collection = new RelationColl([], {
            owner: this.options.owner,
            ownerId: this.options.ownerId,
            relation: this.options.relation
        });

        var vloge = new MembersView({
            collection: c,
            ItemView: this.ItemView
        });

        c.fetch();
        this.seznamR.show(vloge);

    };

    return RelationView;
});