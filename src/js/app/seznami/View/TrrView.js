/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/trr-form.tpl',
    'formSchema!trr',
    'i18next'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next
        ) {

    var TrrView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'trrji',
        formTitle: i18next.t('trr.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('trr.banka'),
                name: 'banka',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.stevilka'),
                name: 'stevilka',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('trr.swift'),
                name: 'swift',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('trr.bic'),
                name: 'bic',
                sortable: false
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

    return TrrView;
});