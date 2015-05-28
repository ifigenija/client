/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/pogodba-form.tpl',
    'formSchema!pogodba',
    'i18next'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next
        ) {

    var PogodbaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        title: i18next.t('seznami.pogodba.title'),
        detailName: 'alternacije',
        formTitle: i18next.t('seznami.pogodba.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.pogodba.ime'),
                name: 'ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.pogodba.stPredstav'),
                name: 'stPredstav',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.pogodba.stKuponov'),
                name: 'stKuponov',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.pogodba.kapaciteta'),
                name: 'kapaciteta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.pogodba.opis'),
                name: 'opis',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.brisi')}
                ]
            }
        ]
    });

    return PogodbaView;
});