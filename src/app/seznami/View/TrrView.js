/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/trr-form.tpl',
    'formSchema!trr'
], function (
        PostavkeView,
        formTpl,
        schema
        ) {

    var TrrView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: 'Trr',
        detailName: 'trrji',
        formTitle: 'TRR',
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
                label: 'Stevilka',
                name: 'stevilka',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Swift',
                name: 'swift',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Bic',
                name: 'bic',
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
        ]
    });

    return TrrView;
});