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
        formTitle: i18next.t('tel.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tel.vrsta'),
                name: 'vrsta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ent.stevilka'),
                name: 'stevilka',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tel.privzeta'),
                name: 'privzeta',
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

    return TelefonskaView;
});