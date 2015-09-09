/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'i18next',
    'formSchema!predstava',
    'template!../tpl/predstava-form.tpl'
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
    var PredstavaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'predstave',
        formTitle: i18next.t('predstava.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('vaja.dogodek'),
                name: 'dogodek',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('vaja.gostovanje'),
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
    
    return PredstavaView;
});
