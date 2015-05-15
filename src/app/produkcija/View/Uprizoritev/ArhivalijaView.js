/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../../tpl/uprizoritev/arhivalija-form.tpl',
    'formSchema!arhivalija',
    'i18next'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next
        ) {

    var ArhivalijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: 'Arhivalija',
        detailName: 'arhivalije',
        dodaj: i18next.t('produkcija.view.arhivalija.dodaj'),
        formTitle: i18next.t('produkcija.view.arhivalija.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.arhivalija.naslov'),
                name: 'naslov',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.arhivalija.lokacijaOriginala'),
                name: 'lokacijaOriginala',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.arhivalija.objavljeno'),
                name: 'objavljeno',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.arhivalija.datum'),
                name: 'datum',
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

    return ArhivalijaView;
});