/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/koprodukcija-form.tpl',
    'formSchema!produkcijaDelitev',
    'i18next',
    'app/Max/Module/Backgrid'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next,
        Backgrid
        ) {
    
    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });

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
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.skupniStrosek'),
                name: 'skupniStrosek',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.zaproseno'),
                name: 'zaproseno',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.zaprosenProcent'),
                name: 'zaprosenProcent',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.lastnaSredstva'),
                name: 'lastnaSredstva',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.drugiJavni'),
                name: 'drugijavni',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.avtorski'),
                name: 'avtorski',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('produkcija.koprodukcija.tantieme'),
                name: 'tantieme',
                sortable: true,
                total: 'sum'
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