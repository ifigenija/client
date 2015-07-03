/* 
 * Licenca GPLv3
 */
define([
    'app/programDela/View/IfiPostavkaView',
    'template!../tpl/strosek-form.tpl',
    'formSchema!strosekUprizoritve',
    'i18next',
    'app/Max/Module/Backgrid'
], function (
        IfiPostavkaView,
        formTpl,
        schema,
        i18next,
        Backgrid
        ) {
    
    var hc = Backgrid.HeaderCell.extend({
            className: 'backgrid-kolona-stevilk'
        });

    var StrosekView = IfiPostavkaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        title: i18next.t('strupr.title'),
        detailName: 'stroski',
        formTitle: i18next.t('strupr.title'),
        gridMeta: [
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('entiteta.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('strupr.vrednostDo'),
                name: 'vrednostDo',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('strupr.vrednostNa'),
                name: 'vrednostNa',
                sortable: true,
                total: 'sum'
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('strupr.popa'),
                name: 'popa.naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.opis'),
                name: 'opis',
                sortable: false
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

    return StrosekView;
});