/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/drzava-form.tpl',
    'formSchema!drzava',
    '../Model/Drzava',
    'i18next'
], function (
        SeznamiView,
        formTpl,
        schema,
        Drzava,
        i18next
        ) {

    var DrzavaView = SeznamiView.extend({
        url: '/rest/drzava',
        name: 'Drzava',
        schema: schema,
        formTemplate: formTpl,
        dodaj: i18next.t('seznami.view.drzava.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.drzava.isoNum'),
                name: 'isoNum',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.drzava.isoNaziv'),
                name: 'isoNaziv',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.view.uredi')},
                ]
            }
        ]
    });

    DrzavaView.prototype.onDodaj = function () {
        var model = new Drzava.Model();
        this.onSelected(model);
    };

    return DrzavaView;
});