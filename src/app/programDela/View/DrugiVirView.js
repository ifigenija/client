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
        name: 'DrugiVir',
        detailName: 'drugiViri',
        formTitle: i18next.t('drugiVir.title'),
        gridMeta: [
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('drugiVir.znesek'),
                name: 'znesek',
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
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.opis'),
                name: 'opis',
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
    return DrugiVirView;
});