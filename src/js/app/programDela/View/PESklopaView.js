/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/peSklopa-form.tpl',
    'formSchema!programskaEnotaSklopa'
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
        detailName: 'peSklopa',
        formTitle: i18next.t('drugiVir.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('drugiVir.naslovPE'),
                name: 'naslovPE',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('drugiVir.avtorPE'),
                name: 'avtorPE',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('drugiVir.obsegPE'),
                name: 'obsegPE',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'date',
                editable: false,
                label: i18next.t('drugiVir.mesecPE'),
                name: 'mesecPE',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('drugiVir.vrednostPE'),
                name: 'vrednostPE',
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