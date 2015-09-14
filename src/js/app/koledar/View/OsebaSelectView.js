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
    'template!../tpl/oseba-select.tpl',
    'template!../tpl/oseba-item.tpl',
    'app/seznami/Model/Oseba',
    'app/seznami/View/OsebaModal'
], function (
        Radio,
        Marionette,
        Handlebars,
        Toolbar,
        _,
        Form,
        i18next,
        tpl,
        itemTpl,
        OsebaModel,
        OsebaModal
        ) {

    /**
     * gumb za drop down menu na vsaki osebanaciji posebej
     * @type Array
     */
    var osebaItemButtons = [[
            {
                id: 'podrobno',
                label: '',
                title: 'podrobno',
                icon: 'fa fa-ellipsis-v',
                element: 'button-dropdown',
                dropdown: [
                    {
                        label: i18next.t('std.brisi'),
                        trigger: 'brisi'
                    }
                ]
            }
        ]];
    var OsebaItemView = Marionette.LayoutView.extend({
        tagName: 'div',
        className: 'media oseba-listitem',
        template: itemTpl,
        regions: {
            regionButton: '.oseba-toolbar'
        },
        onRender: function () {
            this.regionButton.show(new Toolbar({
                listener: this,
                buttonGroups: osebaItemButtons,
                groupClass: 'btn-group btn-tripikice'
            }));

        }
    });

    /**
     * 
     * 
     * @type @exp;Marionette@pro;CollectionView@call;extend
     */
    var OsebasList = Marionette.CollectionView.extend({
        className: 'oseba-list',
        childView: OsebaItemView,
        onChildviewBrisi: function (view) {
            this.triggerMethod('brisi', view.model);
        },
        onChildviewPrivzeto: function (view) {
            this.triggerMethod('privzeto', view.model);
        }
    });



    /**
     * 
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var OsebaSelectView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            izborR: '.oseba-izbor',
            seznamR: '.oseba-seznam'
        },
        events: {
            'click .oseba-nova': 'novaOseba'
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
    OsebaSelectView.prototype.renderIzbor = function () {

        var sch;
        sch = {
            type: 'Toone',
            targetEntity: this.options.lookup,
            editorAttrs: {class: 'form-control relation-select'},
            help: i18next.t('dogodek.d.oseba'),
            title: i18next.t('dogodek.oseba'),
            name: 'id'
        };

        this.formIzberi = new Form({
            template: Handlebars.compile('<form><div data-editors="id"></div></form>'),
            className: 'form-inline',
            schema: {
                id: sch
            }
        });

        this.formIzberi.on('dodaj:osebo', this.dodaj, this);
        this.formIzberi.on('id:change', this.dodaj, this);

        this.izborR.show(this.formIzberi);

    };

    OsebaSelectView.prototype.dodaj = function () {
        var val = this.formIzberi.getValue();
        var id;
        if (val.id) {
            id = val.id.id;
            this.triggerMethod('dodaj:oseba', id);
        }
        this.formIzberi.fields.id.editor.setValue(null);
    };

    OsebaSelectView.prototype.novaOseba = function () {
        var model = new OsebaModel.Model();
        var editor = this.formIzberi.fields.id.editor;
        OsebaModal({
            model: model,
            editor: editor,
            form: this.formIzberi,
            event: 'dodaj:osebo'
        });
    };

    /**
     * Nariše vloge view in sproži nalaganje kolekcije
     * @returns {undefined}
     */
    OsebaSelectView.prototype.renderSeznam = function () {
        var c = this.collection;

        var vloge = new OsebasList({
            collection: c

        });

        vloge.on('brisi', function (model) {
            this.triggerMethod('brisi:oseba', model.get('id'));
        }, this);
        vloge.on('privzeto', function (model) {
            this.triggerMethod('privzeto:oseba', model.get('id'));
        }, this);

        c.fetch();
        this.seznamR.show(vloge);

    };

    return OsebaSelectView;
});