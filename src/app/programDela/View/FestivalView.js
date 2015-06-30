/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'marionette',
    'radio',
    'app/bars',
    'app/programDela/View/EnotaProgramaView',
    'template!../tpl/festival-form.tpl',
    'formSchema!programFestival',
    'underscore'
], function (
        Backgrid,
        i18next,
        Marionette,
        Radio,
        Handlebars,
        EnotaProgramaView,
        formTpl,
        schema,
        _
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });
    var FestivalView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: 'Festival',
        detailName: 'festivali',
        formTitle: i18next.t('festival.title'),
        gridMeta: [
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('entiteta.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.celotnaVrednost'),
                name: 'celotnaVrednost',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.zaproseno'),
                name: 'zaproseno',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.lastnaSredstva'),
                name: 'lastnaSredstva',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.vlozekKoproducenta'),
                name: 'vlozekKoproducenta',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.drugiJavni'),
                name: 'drugiJavni',
                total: 'sum',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('entiteta.brisi')},
                    {event: 'uredi', title: i18next.t('entiteta.uredi')}
                ]
            }
        ]
    });
    return FestivalView;
});