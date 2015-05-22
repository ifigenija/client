/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../../tpl/uprizoritev/strosek-form.tpl',
    'formSchema!planStrosek',
    'i18next'
], function (
        i18next,
        PostavkeView,
        formTpl,
        schema,
        i18next
        ) {

    /**
     * 
     * @type @exp;PostavkeView@call;extend
     */
    var StroskovnikView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: i18next.t('uprizoritve.view.stroskovnik'),
        detailName: 'stroski',
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

    return StroskovnikView;
});