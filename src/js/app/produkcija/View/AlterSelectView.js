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
    'template!../tpl/alter-item.tpl',
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
                        label: i18next.t('std.brisi'),
                        trigger: 'brisi'
                    },
                    {
                        type: '',
                        label: i18next.t('std.privzeto'),
                        trigger: 'privzeto'
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
        },
        onChildviewPrivzeto: function (view) {
            this.triggerMethod('privzeto', view.model);
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

        this.formIzberi.on('id:change', this.onIdChange, this);

        this.izborR.show(this.formIzberi);

    };

    AlterSelectView.prototype.onIdChange = function () {
        this.dodaj();
    };

    AlterSelectView.prototype.dodaj = function () {
        var val = this.formIzberi.getValue();
        var id;
        if (val.id) {
            id = val.id.id;
            this.triggerMethod('dodaj:alter', id);
        }
    };

    AlterSelectView.prototype.novaOseba = function () {
        var model = new OsebaModel.Model();
        var editor = this.formIzberi.fields.id.editor;
        OsebaModal({
            model: model,
            editor: editor,
            form: this.formIzberi,
            event: 'id:change'
        });
    };

    /**
     * Nariše vloge view in sproži nalaganje kolekcije
     * @returns {undefined}
     */
    AlterSelectView.prototype.renderSeznam = function () {
        var c = this.collection;

        var vloge = new AltersList({
            collection: c

        });

        vloge.on('brisi', function (model) {
            this.triggerMethod('brisi:alter', model.get('id'));
        }, this);
        vloge.on('privzeto', function (model) {
            this.triggerMethod('privzeto:alter', model.get('id'));
        }, this);

        c.fetch();
        this.seznamR.show(vloge);

    };

    return AlterSelectView;
});