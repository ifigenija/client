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
        formTitle: i18next.t('prodel.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('prodel.koproducent'),
                name: 'koproducent.label',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.skupniStrosek'),
                name: 'skupniStrosek',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.odstotekFinanciranja'),
                name: 'odstotekFinanciranja',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.zaproseno'),
                name: 'zaproseno',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.zaprosenProcent'),
                name: 'zaprosenProcent',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.t.lastnaSredstva'),
                name: 'lastnaSredstva',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.t.drugiJavni'),
                name: 'drugiJavni',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.t.avtorskih'),
                name: 'avtorskih',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.tantiemi'),
                name: 'tantiemi',
                sortable: true,
                total: 'sum'
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('entiteta.brisi')},
                    {event: 'uredi', title: i18next.t('entiteta.uredi')}
                ]
            }
        ]
    });

    return KoprodukcijaView;
});