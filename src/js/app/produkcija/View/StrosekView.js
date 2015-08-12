/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/strosek-form.tpl',
    'formSchema!strosekUprizoritve',
    'i18next',
    'app/Max/Module/Backgrid'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next,
        Backgrid
        ) {

    var StrosekView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        title: i18next.t('strupr.title'),
        detailName: 'stroski',
        formTitle: i18next.t('strupr.title'),
        gridMeta: [
            {
                headerCell: 'number',
                cell: 'integer',
                editable: false,
                label: i18next.t('strupr.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('strupr.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('tipstroska')
                }),
                editable: false,
                label: i18next.t('strupr.tipstroska'),
                name: 'tipstroska',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('strupr.vrednostDo'),
                name: 'vrednostDo',
                sortable: true,
                total: 'sum'
            },
            {
                headerCell: 'number',
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

    return StrosekView;
});