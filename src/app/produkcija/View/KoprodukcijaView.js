/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/koprodukcija-form.tpl',
    'formSchema!produkcijaDelitev',
    'i18next'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next
        ) {

    /**
     * 
     * @type @exp;PostavkeView@call;extend
     */
    var KoprodukcijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: i18next.t('uprizoritve.koprodukcija'),
        detailName: 'koprodukcije',
        formTitle: i18next.t('produkcija.koprodukcija.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.podrocje'),
                name: 'podrocje',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.naziv'),
                name: 'naziv',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.velikost'),
                name: 'velikost',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.pomembna'),
                name: 'pomembna',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.uredi')}
                ]
            }
        ]
    });

    return KoprodukcijaView;
});