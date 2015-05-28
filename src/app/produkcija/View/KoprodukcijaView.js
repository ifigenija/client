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
                label: i18next.t('produkcija.koprodukcija.koproducent'),
                name: 'koproducent',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.avtorski'),
                name: 'avtorski',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.tantieme'),
                name: 'tantieme',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.lastnaSredstva'),
                name: 'lastnaSredstva',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.skupniStrosek'),
                name: 'skupniStrosek',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')}
                ]
            }
        ]
    });

    return KoprodukcijaView;
});