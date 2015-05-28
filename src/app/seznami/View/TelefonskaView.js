/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/telefonska-form.tpl',
    'formSchema!telefonska',
    'i18next'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next
        ) {

    var TelefonskaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'telefonske',
        name: i18next.t('uprizoritve.telefonska'),
        formTitle: i18next.t('seznami.telefonska.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.telefonska.vrsta'),
                name: 'vrsta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.telefonska.stevilka'),
                name: 'stevilka',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.telefonska.privzeta'),
                name: 'privzeta',
                sortable: true
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

    return TelefonskaView;
});