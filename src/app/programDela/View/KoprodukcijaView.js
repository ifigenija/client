/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/koprodukcija-form.tpl',
    'formSchema!produkcijaDelitev'
], function (
        Backgrid,
        i18next,
        PostavkeView,
        formTpl,
        schema
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });
    var KoprodukcijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: 'Koprodukcije',
        detailName: 'koprodukcije',
        formTitle: i18next.t('prodel.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.koproducent'),
                name: 'naziv',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.zaprosenProcent'),
                name: 'zaprosenProcent',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.odstotekFinanciranja'),
                name: 'odstotekFinanciranja',
                total: 'sum',
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