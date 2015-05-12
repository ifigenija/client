/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/telefonska-form.tpl',
    'formSchema!telefonska'
], function (
        PostavkeView,
        formTpl,
        schema
        ) {

    var TelefonskaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'telefonske',
        name: 'Telefonska',
        formTitle: 'Telefonska',
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: 'Vrsta',
                name: 'vrsta',
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
                label: 'Privzeta',
                name: 'privzeta',
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

    return TelefonskaView;
});