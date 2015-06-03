/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'marionette',
    'app/bars',
    'app/Max/View/Toolbar',
    'underscore',
    'app/Max/Module/Form',
    'i18next',
    'template!../tpl/alter-select.tpl',
    'template!../tpl/alter-item.tpl'
], function (
        Radio,
        Marionette,
        Handlebars,
        Toolbar,
        _,
        Form,
        i18next,
        tpl,
        itemTpl                
        ) {

    /**
     * gumb za drop down menu na vsaki alternaciji posebej
     * @type Array
     */
    var alterItemButtons = [[
            {
                id: 'podrobno',
                label: '',
                title: 'podrobno',
                icon: 'fa fa-ellipsis-v',
                element: 'button-dropdown',
                dropdown: [
                    {
                        label: i18next.t('alter.brisi'),
                        trigger: 'brisi'
                    },
                    {
                        type: '',
                        label: i18next.t('alter.privzeto'),
                        trigger: 'dovoljenja'
                    },
                    {
                        label: i18next.t('alter.deaktiviraj'),
                        trigger: 'nalozi'
                    },
                    {
                        type: "divider"
                    },
                    {
                        label: i18next.t('alter.deaktiviraj'),
                        trigger: 'nalozi'
                    }
                ]
            }
        ]];
    var AlterItemView = Marionette.LayoutView.extend({
        tagName: 'div',
        className: 'media alter-listitem',
        template: itemTpl,
        regions: {
            regionButton: '.alter-toolbar'
        },
        onRender: function () {
            this.regionButton.show(new Toolbar({
                listener: this,
                buttonGroups: alterItemButtons,
                groupClass: 'btn-group btn-tripikice'
            }));
            
        }
    });

    /**
     * 
     * 
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var AltersList = Marionette.CollectionView.extend({
        className: 'alter-list',
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