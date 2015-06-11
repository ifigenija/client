/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/gostujoca-form.tpl',
    'formSchema!programGostujoca'
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
    var GostujocaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: 'Gostujoca',
        detailName: 'gostujoci',
        formTitle: i18next.t('gostujoca.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ep.uprizoritev'),
                name: 'uprizoritev.label',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.celotnaVrednost'),
                name: 'celotnaVrednost',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.zaproseno'),
                name: 'zaproseno',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.lastnaSredstva'),
                name: 'lastnaSredstva',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.avtorskiHonorarji'),
                name: 'avtorskiHonorarji',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.tantieme'),
                name: 'tantieme',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.drugiViri'),
                name: 'drugiViri',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.drugiJavni'),
                name: 'drugiJavni',
                total: 'sum',
                sortable: true
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
    return GostujocaView;
});