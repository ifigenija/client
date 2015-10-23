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
    'app/seznami/View/OsebaModal',
    './AlterUrediView'
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
        OsebaModal,
        AlterUrediView
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
                        label: i18next.t('std.uredi'),
                        trigger: 'uredi'
                    },
                    {
                        type: '',
                        label: i18next.t('std.privzeto'),
                        trigger: 'privzeto'
                    },
                    {
                        label: i18next.t('std.brisi'),
                        trigger: 'brisi'
                    }
                ]
            }
        ]];
    var AlterItemView = Marionette.LayoutView.extend({
        tagName: 'div',
        className: 'media alter-listitem',
        template: itemTpl,
        regions: {
            buttonR: '.alter-toolbar',
            detailR: '.alter-detail'
        },
        onRender: function () {
            this.buttonR.show(new Toolbar({
                listener: this,
                buttonGroups: alterItemButtons,
                groupClass: 'btn-group btn-tripikice'
            }));
        },
        onUredi: function () {
            var view = new AlterUrediView({
                model: this.model
            });


            view.on('save:success', this.onSaveSuccess, this);
            view.on('preklici', this.onPreklici, this);

            this.detailR.show(view);
        },
        onSaveSuccess: function () {
            this.trigger('shranjeno');
            //this.detailR.empty();
        },
        onPreklici: function () {
            this.detailR.empty();
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
        },
        onChildviewUredi: function (view) {
            this.triggerMethod('uredi', view.model);
        },
        onChildviewShranjeno: function (view) {
            this.triggerMethod('shranjeno', view.model);
        }
    });

    /**
     * 
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var AlterSelectView = Marionette.LayoutView.extend({
        className: 'alternacija-select',
        template: tpl,
        regions: {
            izborR: '.polje-z-gumbom .izbor',
            seznamR: '.alter-seznam'
        },
        events: {
            'click .dodaj-osebo': 'novaOseba'
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
        sch = {
            type: 'Toone',
            targetEntity: this.options.lookup,
            editorAttrs: {class: 'form-control relation-select'},
            help: i18next.t('funkcija.d.alternacije'),
            title: i18next.t('funkcija.alternacije'),
            name: 'id'
        };

        this.formIzberi = new Form({
            template: Handlebars.compile('<div data-editors="id"></div>'),
            schema: {
                id: sch
            }
        });

        this.formIzberi.on('dodaj:osebo', this.dodaj, this);
        this.formIzberi.on('id:change', this.dodaj, this);

        this.izborR.show(this.formIzberi);

    };

    AlterSelectView.prototype.dodaj = function () {
        var val = this.formIzberi.getValue();
        var id;
        if (val.id) {
            id = val.id.id;
            this.triggerMethod('dodaj:alter', id);
        }
        this.formIzberi.fields.id.editor.setValue(null);
    };

    AlterSelectView.prototype.novaOseba = function () {
        var model = new OsebaModel.Model();
        var editor = this.formIzberi.fields.id.editor;
        OsebaModal({
            model: model,
            editor: editor,
            form: this.formIzberi,
            event: 'dodaj:osebo',
            title: i18next.t('oseba.nova')
        });
    };

    /**
     * Nariše vloge view in sproži nalaganje kolekcije
     * @returns {undefined}
     */
    AlterSelectView.prototype.renderSeznam = function () {
        this.collection.comparator = function (a, b) {
            var as = a.get('sort');
            var bs = b.get('sort');            
            return (as < bs) ? -1 : 1;
        };

        var c = this.collection;

        var vloge = new AltersList({
            collection: c

        });
        var self = this;

        vloge.on('brisi', function (model) {
            this.triggerMethod('brisi:alter', model.get('id'));
        }, this);
        vloge.on('privzeto', function (model) {
            this.triggerMethod('privzeto:alter', model.get('id'));
        }, this);
        vloge.on('uredi', function (model) {
            this.triggerMethod('uredi:alter', model.get('id'));
        }, this);
        vloge.on('shranjeno', function (model) {
            this.triggerMethod('shranjeno:alter', model.get('id'));
        }, this);

        c.fetch({
            success: function () {
                self.seznamR.show(vloge);
            }
        });

    };

    return AlterSelectView;
});