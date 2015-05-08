/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/BaseView',
    'template!../tpl/popa-form.tpl',
    'formSchema!popa'
], function (
        BaseView,
        formTpl,
        schema
        ) {

    var PopaView = BaseView.extend({
        url: '/rest/popa',
        formTemplate: formTpl,
        schema: schema,
        name: 'Popa',
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
                label: 'Panoga',
                name: 'panoga',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'E-pošta',
                name: 'email',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Spletna stran',
                name: 'url',
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

    return PopaView;
});