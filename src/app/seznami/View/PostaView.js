/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/posta-form.tpl',
    'formSchema!posta'
], function (
        SeznamiView,
        formTpl,
        schema
        ) {

    var PostaView = SeznamiView.extend({
        url: '/rest/posta',
        formTemplate: formTpl,
        schema: schema,
        name: 'Posta',
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

    return PostaView;
});