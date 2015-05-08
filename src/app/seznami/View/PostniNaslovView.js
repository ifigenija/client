/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/BaseView',
    'template!../tpl/postniNaslov-form.tpl',
    'formSchema!postniNaslov'
], function (
        BaseView,
        formTpl,
        schema
        ) {

    var PostniNaslovView = BaseView.extend({
        url: '/rest/postniNaslov',
        formTemplate: formTpl,
        schema: schema,
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
                cell: 'string',
                editable: false,
                label: 'Oseba',
                name: 'oseba',
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