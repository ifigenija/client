
/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/Max/Model/RelationCollection',
    'app/Max/Module/Form',
    'app/bars',
    'i18next'
], function (
        Marionette,
        RelationColl,
        Form,
        Handlebars,
        i18next
        ) {



// relation view je vzorec za many to many relacije 


    var MemberView = Marionette.ItemView.extend({
        tagName: 'a',
        className: 'list-group-item',
        template: Handlebars.compile('<span class="badge"><span class="fa fa-trash"></span></span>{{ name }}'),
        triggers: {
            'click .fa-trash': 'delete'
        },
    });

    /**
     * 
     * 
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var MembersView = Marionette.CollectionView.extend({
        className: 'list-group',
        childView: MemberView,
        onChildviewDeleteVloge: function (view) {
            this.collection.dissociate(view.model);
        }
    });


    var RelationView = Marionette.LayoutView.extend({
        template: Handlebars.compile('<div class="izbor"></div>\n\
    <div class="seznam"></div>'),
        regions: {
            izborR: '.izbor',
            seznamR: '.seznam'
        },
        onRender: function () {
            this.renderIzbor();
            this.renderSeznam();
        }
    });
    /**
     * Nariše vloge lookup in gumb dodaj
     * @returns {undefined}
     */
    RelationView.prototype.renderIzbor = function () {
        var self = this;

        var dodaj = function () {
            self.dodaj(this.getValue());
        };

        this.formIzberi = new Form({
            template: Handlebars.compile('<div><form><div data-editors="id"></div></form>'),
            className: 'form-inline',
            schema: {
                id: {type: 'LookupSelect', targetEntity: this.options.lookup, editorAttrs: {class: 'btn'}}
            },
            events: {
                'click .dodaj': dodaj
            }
        });

        this.izborR.show(this.formIzberi);

    };

    RelationView.prototype.dodaj = function () {
        var val = this.formIzberi.getValue();
        if (val.id) {
            this.collection.associate(val.id);
        }
    }

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
            collection: c
        });

        c.fetch();
        this.seznamR.show(vloge);

    };

    return RelationView;

});