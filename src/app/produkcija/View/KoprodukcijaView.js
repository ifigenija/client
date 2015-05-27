/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/koprodukcija-form.tpl',
    'formSchema!produkcijadelitev',
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
        name: i18next.t('uprizoritve.view.koprodukcija'),
        detailName: 'koprodukcije',
        formTitle: i18next.t('produkcija.view.koprodukcija.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.koprodukcija.podrocje'),
                name: 'podrocje',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.koprodukcija.naziv'),
                name: 'naziv',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.koprodukcija.velikost'),
                name: 'velikost',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.koprodukcija.pomembna'),
                name: 'pomembna',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.view.uredi')}
                ]
            }
        ]
    });

    return KoprodukcijaView;
});