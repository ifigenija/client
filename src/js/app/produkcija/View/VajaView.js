/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'i18next',
    'formSchema!vaja',
    'template!../tpl/vaja-form.tpl'
], function (
        PostavkeView,
        i18next,
        schema,
        formTpl
        ) {

    /**
     * 
     * 
     * @type @exp;PostavkeView@call;extend
     */
    var VajaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'vaje',
        formTitle: i18next.t('vaja.title'),
        gridMeta: [
            {
                headerCell: 'number',
                cell: 'integer',
                editable: false,
                label: i18next.t('vaja.zaporedna'),
                name: 'zaporedna',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('vaja.dogodek'),
                name: 'dogodek.title',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('vaja.porocilo'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'premakniGor', title: i18next.t('std.premakniGor')},
                    {event: 'premakniDol', title: i18next.t('std.premakniDol')},
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });

    return VajaView;
});
