/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/Ep-form.tpl',
    'formSchema!programPonovitev'
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
    var PonovitevView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: 'Ponovitev',
        detailName: 'ponovitve',
        formTitle: i18next.t('ponovitev.title'),
        gridMeta: [
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('programDela.celotnaVrednost'),
                name: 'banka',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('programDela.zaproseno'),
                name: 'zaproseno',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('programDela.lastnaSredstva'),
                name: 'lastnaSredstva',
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
    return PonovitevView;
});