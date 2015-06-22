/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'radio',
    'i18next',
    'app/Dokument/View/FormView',
    'app/Max/View/PaginatedGrid',
    'app/Max/Module/Backgrid',
    'template!../tpl/seznam.html',
    'app/Max/Model/MaxPageableCollection',
    'backbone',
    'app/Max/View/Toolbar'
], function (
        Marionette,
        Radio,
        i18next,
        FormView,
        PaginatedGrid,
        Backgrid,
        seznamTpl,
        Coll,
        Backbone,
        Toolbar
        ) {

    var SeznamView = Marionette.LayoutView.extend({
        template: seznamTpl,
        url: null,
        columns: null,
        formTemplate: null,
        schema: null,
        title: null,
        regions: {
            formR: '.seznam-forma',
            gridR: '.seznam-tabela',
            toolbarR: '.seznam-toolbar'
        },
        defaultButtons: {
            shrani: {
                id: 'doc-shrani',
                label: 'Shrani',
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'doc-preklici',
                label: 'Prekliči',
                element: 'button-trigger',
                trigger: 'preklici'
            },
            nasvet: {
                id: 'doc-nasvet',
                label: '<i class="fa fa-info"></i>',
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        }
    });

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

    SeznamView.prototype.getCollection = function () {
        var C = Coll.extend({model: Backbone.DeepModel});
        var coll = new C();
        coll.url = this.url;
        return coll;
    };

    SeznamView.prototype.onRender = function () {

        this.$('.seznam-naslov').text(this.title);

        var fv = new Backgrid.Extension.ServerSideFilter({
            collection: this.collection
        });
        this.grid = new PaginatedGrid({
            collection: this.collection,
            row: Backgrid.ClickableRow,
            columns: this.columns,
            filterView: fv
        });

        this.renderToolbar();


        this.gridR.show(this.grid);
        this.collection.fetch();
    };

    SeznamView.prototype.renderToolbar = function () {
        var tool = [[
                {
                    id: 'doc-dodaj',
                    label: i18next.t('entiteta.dodaj'),
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
     * 
     * @param {type} model
     * @returns {undefined}
     */
    SeznamView.prototype.onBrisi = function (model) {

        if (window.confirm(i18next.t('std.potrdiIzbris'))) {
            model.destroy({
                success: function () {
                    Radio.channel('error').command('flash', {
                        message: i18next.t('std.messages.success'),
                        severity: 'success'
                    });
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
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
     * 
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

        this.$('.glava-title').text(this.getTitle(model));

        this.toolbarR.empty();
        this.listenTo(form, 'preklici', this.preklici);
        this.listenTo(form, 'save:success', this.saveSuccess);
        this.listenTo(form, 'skrij', this.preklici);
        this.listenTo(form, 'dodaj', this.onDodaj);
    };

    /**
     * 
     * 
     * @param {type} model
     * @returns {undefined}
     */
    SeznamView.prototype.saveSuccess = function (model) {
        this.$('.glava-title').text(this.getTitle(model));
        this.zamenjajUrl(model);
        this.collection.fetch();
    };

    /** 
     * kaj se zgodi, ko pritisnemo skrij/preklici
     * 
     */
    SeznamView.prototype.preklici = function () {
        this.formR.empty();
        this.renderToolbar();
        this.zamenjajUrl();
        console.log("test");
    };

    SeznamView.prototype.getTitle = function (model) {
        var text = model.get('naziv') || "Naziv";
        return text;
    };
    
    SeznamView.prototype.onDodaj = function () {
        console.log("Potrebno je overridat funkcijo onDodaj");
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

    return SeznamView;
});