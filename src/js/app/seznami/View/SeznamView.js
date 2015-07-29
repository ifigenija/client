/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'radio',
    'i18next',
    'app/Max/View/Confirm',
    'app/Dokument/View/FormView',
    'app/Max/View/PaginatedGrid',
    'app/Max/Module/Backgrid',
    'template!../tpl/seznam.html',
    'template!../tpl/seznam-grid.tpl',
    'app/Max/Model/MaxPageableCollection',
    'backbone',
    'app/Max/View/Toolbar',
    'underscore',
    'app/Max/View/BackgridFooter'
], function (
        Marionette,
        Radio,
        i18next,
        confirm,
        FormView,
        PaginatedGrid,
        Backgrid,
        seznamTpl,
        gridTpl,
        Coll,
        Backbone,
        Toolbar,
        _,
        BackgridFooter
        ) {
    /**
     * Ko uporabimo SeznamView, ga je potrebno extendat in overridat 
     * vse atribute z vrednostjo null.
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var SeznamView = Marionette.LayoutView.extend({
        template: seznamTpl,
        potrdiBrisanje: true,
        url: null,
        columns: null,
        formTemplate: null,
        schema: null,
        title: null,
        regions: {
            formR: '.seznam-forma',
            gridR: '.seznam-tabela',
            toolbarR: '.seznam-toolbar',
            prilogeR: '.region-priloge'
        },
        defaultButtons: {
            shrani: {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'doc-preklici',
                label: i18next.t('std.preklici'),
                element: 'button-trigger',
                trigger: 'preklici'
            },
            nasvet: {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        }
    });

    /**
     * Inicializacija seznamaView
     * @param {type} options
     * @returns {undefined}
     */
    SeznamView.prototype.initialize = function (options) {

        this.url = options.url || this.url;
        this.formTemplate = options.formTemplate || this.formTemplate;
        this.schema = options.schema || this.schema;
        this.title = options.title || this.title;
        this.columns = options.columns || this.columns;

        if (!this.collection) {
            this.collection = this.getCollection();
        }

        this.listenTo(this.collection, 'selectValue', this.onSelected);
        this.listenTo(this.collection, 'backgrid:action', this.onGridAction);
    };

    /**
     * Pridobimo kolekcijo
     * @returns {Marionette.LayoutView@call;extend.prototype.getCollection.coll|SeznamView_L16.SeznamView.prototype.getCollection.coll}
     */
    SeznamView.prototype.getCollection = function () {
        var C = Coll.extend({model: Backbone.DeepModel});
        var coll = new C();
        coll.url = this.url;
        return coll;
    };
    
    /**
     * Izris prilog - privzeto se ne izriše nič. 
     * Overrirde funkcionalnosti v izvedenih objektih
     * 
     * @returns {undefined}
     */
    SeznamView.prototype.renderPriloge = function () {

    };
    
    /**
     * Izris seznamaView
     * @returns {undefined}
     */
    SeznamView.prototype.onRender = function () {

        this.$('.seznam-naslov').text(this.title);

        var fv = new Backgrid.Extension.ServerSideFilter({
            collection: this.collection
        });
        this.grid = new PaginatedGrid({
            template: gridTpl,
            gridContainerClass: 'seznam-grid',
            collection: this.collection,
            row: Backgrid.ClickableRow,
            columns: this.columns,
            footer: BackgridFooter.extend({columns: this.columns}),
            filterView: fv
        });

        this.renderToolbar();


        this.gridR.show(this.grid);
        this.collection.fetch({
            error: function () {
                Radio.channel('error').command('flash', {
                    message: i18next.t("napaka.fetch") + ' (Seznam)',
                    code: '9000205',
                    severity: 'error'
                });
            }
        });
    };
    /**
     * Izris toolbara
     * @returns {undefined}
     */
    SeznamView.prototype.renderToolbar = function () {
        var tool = [[
                {
                    id: 'doc-dodaj',
                    label: i18next.t('std.dodaj'),
                    element: 'button-trigger',
                    trigger: 'dodaj'
                }
            ]];

        var tb = new Toolbar({
            buttonGroups: tool,
            listener: this
        });

        this.toolbarR.show(tb);
    };
    /**
     * Proxy za trigger metode 
     * @param {type} model
     * @param {type} action
     * @returns {undefined}
     */
    SeznamView.prototype.onGridAction = function (model, action) {
        this.triggerMethod(action, model);
    };


    /**
     * Ob kliku briši
     * @param {type} model
     * @returns {undefined}
     */
    SeznamView.prototype.onBrisi = function (model) {

        var brisi = function () {
            model.destroy({
                wait: true,
                success: function () {
                    Radio.channel('error').command('flash', {
                        message: i18next.t('std.messages.success'),
                        severity: 'success'
                    });
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        };
        if (this.potrdiBrisanje) {
            confirm({
                text: i18next.t('std.potrdiIzbris'),
                modalOptions: {
                    title: i18next.t("std.brisi"),
                    okText: i18next.t("std.brisi")
                },
                ok: brisi
            });
        } else {
            brisi();
        }


    };

    /**
     * Kaj se zgodi, ko kliknemo uredi 
     * @param {type} model
     * @returns {undefined}
     */
    SeznamView.prototype.onUredi = function (model) {
        this.onSelected(model);
    };

    /**
     * Ko preklapljamo med modeli v določenem Seznamu view se sestavi nov url,
     * ki bo zamenjal starega
     * @param {type} model
     * @returns {undefined}
     */
    SeznamView.prototype.zamenjajUrl = function (model) {
        var fragment = Backbone.history.getFragment();

        fragment = fragment.replace(/\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/, '');

        var newUrl = fragment;
        if (model) {
            newUrl = fragment + '/' + model.get('id');
        }

        Radio.channel('layout').command('replaceUrl', newUrl);
    };

    /**
     * Kaj se zgodi, ko izberemo model v tabeli 
     * @param {type} model
     * @returns {undefined}
     */
    SeznamView.prototype.onSelected = function (model) {

        if (model.get('id')) {
            this.zamenjajUrl(model);
        }

        var form = this.getFormView(model);

        this.formR.show(form);
        this.renderPriloge();

        this.$('.glava-title').text(this.getTitle(model));

        this.toolbarR.empty();
        this.listenTo(form, 'preklici', this.preklici);
        this.listenTo(form, 'save:success', this.saveSuccess);
        this.listenTo(form, 'skrij', this.preklici);
        this.listenTo(form, 'dodaj', this.onDodaj);
    };

    /**
     * Ob uspečno shranjenem modelu se izvede ta funkcija 
     * @param {type} model
     * @returns {undefined}
     */
    SeznamView.prototype.saveSuccess = function (model) {
        this.$('.glava-title').text(this.getTitle(model));
        this.zamenjajUrl(model);
        this.collection.fetch();
    };

    /**
     * Ob kliku prekliči
     * @returns {undefined}
     */
    SeznamView.prototype.preklici = function () {
        this.formR.empty();
        this.renderToolbar();
        this.zamenjajUrl();
    };
    /**
     * Pridobi naslov forme
     * @param {type} model
     * @returns {Marionette.LayoutView@call;extend.prototype.getTitle.text|String}
     */
    SeznamView.prototype.getTitle = function (model) {
        var text = model.get('naziv') || "Naziv";
        return text;
    };
    /**
     * Ob kliku dodaj
     * @returns {undefined}
     */
    SeznamView.prototype.onDodaj = function () {
        this.zapSortSt(this.collection, 'sort');
    };


    /**
     * Privzrti pogled na formo za urejanje 
     * @param {type} model
     * @returns {SeznamView_L15.SeznamView.prototype.getFormView.Fv}
     */
    SeznamView.prototype.getFormView = function (model) {
        var Fv = FormView.extend({
            formTitle: this.getTitle(model),
            buttons: this.defaultButtons,
            schema: this.schema.toFormSchema().schema,
            formTemplate: this.formTemplate,
            onFormChange: function (form) {
                var tb = this.getToolbarModel();
                var but = tb.getButton('doc-shrani');
                if (but.get('disabled')) {
                    but.set({
                        disabled: false
                    });
                }
            }
        });

        return  new Fv({
            model: model
        });

    };
    /**
     * Funkcija pridobi vrednost za atribut, ki smo ga izbrali
     * @param {type} collection
     * @param {type} attrSort
     * @returns {undefined}
     */
    SeznamView.prototype.zapSortSt = function (collection, attrSort) {
        var min = -100;
        _.each(collection.models, function (e) {
            var sort = e.get(attrSort);
            if (sort >= min) {
                min = sort;
            }
        });

        if (min >= 0) {
            this.model.set({sort: min + 1});
            this.form.fields.sort.editor.setValue(min + 1);
        }
    };

    return SeznamView;
});