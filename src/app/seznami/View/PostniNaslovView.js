/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/postniNaslov-form.tpl',
    'formSchema!postniNaslov'
], function (
        PostavkeView,
        formTpl,
        schema
        ) {

    var PostniNaslovView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema,
        detailName: 'naslovi',
        name: 'PostniNaslov',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: 'Naziv',
                name: 'naziv',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Ulica',
                name: 'ulica',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Pošta',
                name: 'posta',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Država',
                name: 'drzava',
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

    return PostniNaslovView;
});