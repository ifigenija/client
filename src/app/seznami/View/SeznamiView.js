/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/Dokument/View/FormView',
    'app/Max/View/PaginatedGrid',
    'app/Max/Module/Backgrid',
    'template!../tpl/seznam.html',
    'app/Max/Model/MaxPageableCollection',
    'app/Max/View/Toolbar'
], function (
        Marionette,
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
        if (!this.collection) {
            this.collection = this.getCollection();
        }
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
        
        var tool = [[
           {
                id: 'doc-dodaj',
                label: 'Dodaj' + ' ' + this.name,
                element: 'button-trigger',
                trigger: 'dodaj'
            }
        ]];

        var tb = new Toolbar({
            buttonGroups: tool,
            listener: this
        });
        
        this.toolbarR.show(tb);
        
        this.gridR.show(this.grid);
        this.collection.fetch();
        this.listenTo(this.collection, 'selectValue', this.onSelected);
        this.listenTo(this.collection, 'deselect', this.onSelected);
        this.listenTo(this.collection, 'backgrid:action', this.onGridAction);
    };

    SeznamiView.prototype.onGridAction = function (model, action) {
        this.triggerMethod(action, model);
    };
    SeznamiView.prototype.onBrisi = function (model) {
        console.log('Brisi');
    };
    SeznamiView.prototype.onUredi = function (model) {
        this.onSelected(model);
    };
    SeznamiView.prototype.onSelected = function (model) {
        var form = this.getFormView(model);
        this.formR.show(form);
        this.listenTo(form, 'preklici', this.preklici);
    };
    SeznamiView.prototype.preklici = function () {
        this.formR.empty();
    };

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

    }

    return SeznamiView;
});