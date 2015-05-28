/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/alternacija-form.tpl',
    'formSchema!alternacija',
    'i18next'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next
        ) {

    var AlternacijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        title: i18next.t('produkcija.alternacija.title'),
        detailName: 'alternacije',
        formTitle: i18next.t('produkcija.alternacija.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.alternacija.oseba'),
                name: 'oseba',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.alternacija.funkcija'),
                name: 'funkcija',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('produkcija.alternacija.zaposlen'),
                name: 'zaposlen',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.alternacija.pogodba'),
                name: 'pogodba',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('produkcija.brisi')}
                ]
            }
        ]
    });

    return AlternacijaView;
});