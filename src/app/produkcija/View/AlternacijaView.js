/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/alternacija-form.tpl',
    'formSchema!alternacija',
    'i18next'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next
        ) {

    var AlternacijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        title: i18next.t('seznami.alternacija.title'),
        detailName: 'alternacije',
        formTitle: i18next.t('seznami.alternacija.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.alternacija.ime'),
                name: 'ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.alternacija.stPredstav'),
                name: 'stPredstav',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.alternacija.stKuponov'),
                name: 'stKuponov',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.alternacija.kapaciteta'),
                name: 'kapaciteta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.alternacija.opis'),
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

    return AlternacijaView;
});