define([
    'underscore',
    'backgrid',
    //'app/Max/Model/IzbirneModel',
    'app/Dokument/View/PostavkeView',
    'text!../tpl/trr-form.tpl'
], function (
        _,
        Backgrid,
        //izbirne,
        PostavkeView,
        formTpl
        ) {

    var dec3Cell = Backgrid.NumberCell.extend({
        decimals: 4
    });



    var OsebaTrrView = PostavkeView.extend({
        formTemplate: _.template(formTpl),
        formTitle: 'Trr',
        detailName: 'trr',
        gridMeta: [

            {
                cell: 'string',
                editable: false,
                label: 'Banka',
                name: 'banka',
                sortable: false
            },

            {
                cell: 'string',
                editable: false,
                label: 'Številka',
                name: 'stevilka',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: 'Briši'},
                    {event: 'uredi', title: 'Uredi'}
                ]
            }
        ]
    });

    return OsebaTrrView;
});