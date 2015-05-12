/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/drzava-form.tpl',
    'formSchema!drzava'
], function (
        SeznamiView,
        formTpl,
        schema
        ) {

    var DrzavaView = SeznamiView.extend({
        url: '/rest/drzava',
        formTemplate: formTpl,
        schema: schema,
        name: 'Drzava',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: 'Šifra',
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: 'Naziv ',
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: 'Iso Šifra',
                name: 'isoNum',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: 'Iso Naziv',
                name: 'isoNaziv',
                sortable: true
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

    return DrzavaView;
});