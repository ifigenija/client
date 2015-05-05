/* 
 * Licenca GPLv3
 */
define([
    'backbone',
    'marionette',
    'app/Dokument/View/FormView',
    'app/Max/View/PaginatedGrid',
    'app/Max/Module/Backgrid',
    'template!../tpl/seznam.html',
    'app/Max/Model/MaxPageableCollection',
    'template!../tpl/drzava-form.tpl',
    'formSchema!drzava'
], function (
        Backbone,
        Marionette,
        FormView,
        PaginatedGrid,
        Backgrid,
        seznamTpl,
        Coll,
        drzavaFormTpl,
        shema
        ) {

    var DrzaveView = Marionette.LayoutView.extend({
        template: seznamTpl,
        triggers: {
            'click': 'da'
        },
        regions: {
            formR: '.seznam-forma',
            gridR: '.seznam-tabela'
        },
        onRender: function () {


            var coll = new Coll();
            coll.url = '/rest/drzava';

            this.grid = new PaginatedGrid({
                collection: coll,
                row: Backgrid.ClickableRow,
                columns: [
                    {
                        cell: 'string',
                        editable: false,
                        label: 'Šifra',
                        name: 'sifra',
                        sortable: false
                    },
                    {
                        cell: 'string',
                        editable: false,
                        label: 'Naziv ',
                        name: 'naziv',
                        sortable: false
                    },
                    {
                        cell: 'string',
                        editable: false,
                        label: 'Iso Šifra',
                        name: 'isoNum',
                        sortable: false
                    },
                    {
                        cell: 'string',
                        editable: false,
                        label: 'Iso Naziv',
                        name: 'naziv',
                        sortable: false
                    },
                    {
                        cell: 'action',
                        name: '...',
                        sortable: false,
                        actions: [
                            {event: 'brisi', title: 'Briši'},
                            {event: 'uredi', title: 'Uredi'},
                        ]
                    }
                ]});
            this.gridR.show(this.grid);
            coll.fetch();
            coll.on('selectValue', this.onSelected, this);
            coll.on('deselect', this.onSelected, this);
        },
        onSelected: function (model) {


            var Fv = FormView.extend({
                formTitle: 'Država ' + model.get('naziv'),
                buttons: {
                    shrani: {
                        id: 'doc-postavka-shrani',
                        label: 'Shrani',
                        element: 'button-trigger',
                        trigger: 'shrani',
                        disabled: true
                    },
                    preklici: {
                        id: 'docedit-skrij-postavko',
                        label: 'Prekliči',
                        element: 'button-trigger',
                        trigger: 'preklici'
                    }
                },
                schema: shema.toFormSchema().schema,
                formTemplate: drzavaFormTpl,
            });

            var form = new Fv({
                model: model
            });
            this.formR.show(form);
            form.on('preklici', this.preklici,this);
        },
        preklici: function(){
            this.formR.empty();
        }
    });

    return DrzaveView;
});