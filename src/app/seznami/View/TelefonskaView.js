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
        columns: [
            {
                cell: 'string',
                editable: false,
                label: 'Poslovni Partner',
                name: 'popa',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Oseba',
                name: 'oseba',
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