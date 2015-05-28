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
        name: 'Trr',
        detailName: 'trrji',
        formTitle: i18next.t('seznami.trr.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.trr.banka'),
                name: 'banka',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.trr.stevilka'),
                name: 'stevilka',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.trr.swift'),
                name: 'swift',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.trr.bic'),
                name: 'bic',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.uredi')}
                ]
            }
        ]
    });

    return TrrView;
});