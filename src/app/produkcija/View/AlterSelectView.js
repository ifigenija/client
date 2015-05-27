/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'marionette',
    'app/bars',
    'underscore',
    'app/Max/Module/Form',
    'template!../tpl/alter-select.tpl',
    'template!../tpl/alter-item.tpl'
], function (
        Radio,
        Marionette,
        Handlebars,
        _,
        Form,
        tpl,
        itemTpl                
        ) {


    var AlterItemView = Marionette.ItemView.extend({
        tagName: 'div',
        className: 'media',
        template: itemTpl,
        triggers: {
            'click .fa-trash': 'brisi'
        }
    });

    /**
     * 
     * 
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var AltersList = Marionette.CollectionView.extend({
        className: 'list-group',
        childView: AlterItemView,
        onChildviewBrisi: function (view) {
            this.triggerMethod('brisi', view.model);
        }
    });



    /**
     * 
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var AlterSelectView = Marionette.LayoutView.extend({        
        template: tpl,
       regions: {
            izborR: '.alter-izbor',
            seznamR: '.alter-seznam'
        },
        events: {
            'click .alter-gumb': 'dodaj'
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
    AlterSelectView.prototype.renderIzbor = function () {


        var sch;
        sch = {type: 'Toone', targetEntity: this.options.lookup, editorAttrs: {class: 'form-control relation-select'}};

        this.formIzberi = new Form({
            template: Handlebars.compile('<form><div data-editors="id"></div></form>'),
            className: 'form-inline',
            schema: {
                id: sch
            }
        });


        this.izborR.show(this.formIzberi);

    };

    AlterSelectView.prototype.dodaj = function () {
        var val = this.formIzberi.getValue();
        var id;
        if (val.id) {
            id = val.id.id;
            this.triggerMethod('dodaj:alter', id);
        }
    };

    /**
     * Nariše vloge view in sproži nalaganje kolekcije
     * @returns {undefined}
     */
    AlterSelectView.prototype.renderSeznam = function () {
        var c = this.collection 

        var vloge = new AltersList({
            collection: c,
            
        });
        
        vloge.on('brisi', function (model) {
            this.triggerMethod('brisi:alter', model.get('id'));
        }, this);

        c.fetch();
        this.seznamR.show(vloge);

    };

    return AlterSelectView;
});