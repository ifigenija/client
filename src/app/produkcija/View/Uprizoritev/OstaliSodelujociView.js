/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../../tpl/uprizoritev/ostaliSodelujoci-form.tpl',
    'formSchema!funkcija',
    'i18next'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next
        ) {

    var FunkcijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: 'Funkcija',
        detailName: 'ostaliSodelujoci',
        dodaj: i18next.t('produkcija.view.funkcija.dodaj'),
        formTitle: i18next.t('produkcija.view.funkcija.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.funkcija.podrocje'),
                name: 'podrocje',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.funkcija.naziv'),
                name: 'naziv',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.funkcija.velikost'),
                name: 'velikost',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.funkcija.pomembna'),
                name: 'pomembna',
                sortable: false
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

    return FunkcijaView;
});