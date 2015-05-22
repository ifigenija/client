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
        Toolbar
        ) {

    var SeznamiView = Marionette.LayoutView.extend({
        template: seznamTpl,
        url: null,
        columns: null,
        formTemplate: null,
        schema: null,
        name: null,
        regions: {
            formR: '.seznam-forma',
            gridR: '.seznam-tabela',
            toolbarR: '.seznam-toolbar'
        }
    });

    SeznamiView.prototype.initialize = function (options) {

        this.url = options.url || this.url;

        if (!this.collection) {
            this.collection = this.getCollection();
        }

        this.listenTo(this.collection, 'selectValue', this.onSelected);
        this.listenTo(this.collection, 'deselect', this.onSelected);
        this.listenTo(this.collection, 'backgrid:action', this.onGridAction);
    };

    SeznamiView.prototype.getCollection = function () {
        var coll = new Coll();
        coll.url = this.url;
        return coll;
    };

    SeznamiView.prototype.onRender = function () {

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

    SeznamiView.prototype.renderToolbar = function () {
         var tool = [[
                {
                    id: 'doc-dodaj',
                    label: 'Dodaj' + ' ' + this.dodaj,
                    element: 'button-trigger',
                    trigger: 'dodaj'
                }
            ]];

        var tb = new Toolbar({
            buttonGroups: tool,
            listener: this
        });

        this.toolbarR.show(tb);
    }
    /**
     * Proxy za trigger metode 
     * 
     */
    SeznamiView.prototype.onGridAction = function (model, action) {
        this.triggerMethod(action, model);
    };


    /**
     * 
     * @param {type} model
     * @returns {undefined}
     */
    SeznamiView.prototype.onBrisi = function (model) {

        if (confirm(i18next.t('confirm.delete'))) {
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
    SeznamiView.prototype.onUredi = function (model) {

        this.onSelected(model);
      
        
    };

    /**
     * Kaj se zgodi, ko izberemo model v tabeli 
     * @param {type} model
     * @returns {undefined}
     */
    SeznamiView.prototype.onSelected = function (model) {
        
       
        var form = this.getFormView(model);
        this.formR.show(form);
        this.toolbarR.empty();
        this.listenTo(form, 'preklici', this.preklici);
        this.listenTo(form, 'save:success', this.osveziSeznam);
        this.listenTo(form, 'skrij', this.preklici);
    };

    /**
     * 
     * 
     * @param {type} model
     * @returns {undefined}
     */
    SeznamiView.prototype.osveziSeznam = function (model) {
        this.collection.fetch();
    };

    /** 
     * kaj se zgodi, ko 
     * 
     */
    SeznamiView.prototype.preklici = function () {
        this.formR.empty();
        this.renderToolbar();
    };

    /**
     * Privzrti pogled na formo za urejanje 
     * 
     */
    SeznamiView.prototype.getFormView = function (model) {
        var Fv = FormView.extend({
            formTitle: this.name + model.get('naziv'),
            buttons: {
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
                }
            },
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

    return SeznamiView;
});