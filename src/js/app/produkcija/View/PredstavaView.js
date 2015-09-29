/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'i18next',
    'formSchema!predstava',
    'template!../tpl/predstava-form.tpl',
    'app/Max/Module/Backgrid'
], function (
        PostavkeView,
        i18next,
        schema,
        formTpl,
        Backgrid
        ) {

    var dt = Backgrid.DateTimeCell.extend({
        displayFormat: 'DD.MM.YYYY HH:mm'
    });
    var dk = Backgrid.DateTimeCell.extend({
        displayFormat: 'HH:mm'
    });

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
                label: i18next.t('predstava.gostovanje'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('dogodek.title'),
                name: 'title',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: dt,
                editable: false,
                label: i18next.t('dogodek.zacetek'),
                name: 'zacetek',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: dk,
                editable: false,
                label: i18next.t('dogodek.konec'),
                name: 'konec',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('dogodek.prostor'),
                name: 'prostor',
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
