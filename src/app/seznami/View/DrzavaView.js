/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/BaseView',
    'template!../tpl/drzava-form.tpl',
    'formSchema!drzava'
], function (
        BaseView,
        formTpl,
        shema
        ) {

    var DrzavaView = BaseView.extend({
        url: '/rest/drzava',
        formTemplate: formTpl,
        shema: shema,
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