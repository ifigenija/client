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
    'app/seznami/View/OsebaTabView'
], function (
        Marionette,
        FormView,
        PaginatedGrid,
        Backgrid,
        seznamTpl,
        Coll,
        OsebaTabView
        ) {

    var BaseView = Marionette.LayoutView.extend({
        template: seznamTpl,
        url: null,
        columns: null,
        formTemplate: null,
        schema: null,
        name: null,
        regions: {
            formR: '.seznam-forma',
            tabR: '.seznam-tab',
            gridR: '.seznam-tabela'
        }
    });

    BaseView.prototype.onRender = function () {
        var coll = new Coll();
        coll.url = this.url;

        var fv = new Backgrid.Extension.ServerSideFilter({
            collection: coll
        });
        this.grid = new PaginatedGrid({
            collection: coll,
            row: Backgrid.ClickableRow,
            columns: this.columns,
            filterView: fv
        });

        this.gridR.show(this.grid);
        coll.fetch();
        this.listenTo(coll, 'selectValue', this.onSelected);
        this.listenTo(coll, 'deselect', this.onSelected);
        this.listenTo(coll, 'backgrid:action', this.onGridAction);
    };

    BaseView.prototype.onGridAction = function (model, action) {
        this.triggerMethod(action, model);
    };
    BaseView.prototype.onBrisi = function (model) {
        console.log('Brisi');
    };
    BaseView.prototype.onUredi = function (model) {
        this.onSelected(model);
    };
    BaseView.prototype.onSelected = function (model) {

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

        var form = new Fv({
            model: model
        });
        this.formR.show(form);
        this.listenTo(form, 'preklici', this.preklici);
    };
    BaseView.prototype.preklici = function () {
        this.formR.empty();
    };

    return BaseView;
});