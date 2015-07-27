/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/drugiVir-form.tpl',
    'formSchema!DrugiVir'
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
    var DrugiVirView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'drugiViri',
        formTitle: i18next.t('drugiVir.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('drugiVir.opis'),
                name: 'opis',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('drugiVir.znesek'),
                name: 'znesek',
                total: 'sum',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('drugiVir.mednarodni'),
                name: 'mednarodni',
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
    return DrugiVirView;
});