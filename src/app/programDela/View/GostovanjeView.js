/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/gostovanje-form.tpl',
    'formSchema!programGostovanje'
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
    var GostovanjeView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: 'Gostovanje',
        detailName: 'gostovanja',
        formTitle: i18next.t('gostovanje.title'),
        gridMeta: [
            {
                editable: false,
                label: i18next.t('programDela.gostitelj'),
                name: 'gostitelj',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('programDela.transportniStroski'),
                name: 'transportniStroski',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('programDela.odkup'),
                name: 'odkup',
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
    return GostovanjeView;
});