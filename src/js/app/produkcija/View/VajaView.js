/* 
 * Licenca GPLv3
 */
define([
    'baseUrl',
    'app/Dokument/View/PostavkeView',
    'app/Max/Module/Backgrid',
    'i18next',
    'formSchema!funkcija',
    'template!../tpl/vaja-form.tpl',
    'radio'
], function (
        baseUrl,
        PostavkeView,
        Backgrid,
        i18next,
        schema,
        formTpl
        ) {

    /**
     * 
     * 
     * @type @exp;PostavkeView@call;extend
     */
    var FunkcijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema,
        detailName: 'vaje',
        formTitle: i18next.t('funkcija.title'),
        gridMeta: [
            {
                cell: 'integer',
                headerCell: Backgrid.HeaderCell.extend({
                    className: 'backgrid-kolona-stevilk'
                }),
                editable: false,
                label: i18next.t('vaja.zaporedna'),
                name: 'zaporedna',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('vaja.vrsta'),
                name: 'dogodek',
                sortable: true
            },
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
    
    return FunkcijaView;
});
