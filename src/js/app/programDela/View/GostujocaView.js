/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'template!../tpl/gostujoca-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programGostujoca'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        formTpl,
        ZapisiLayout,
        schema
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });
    var GostujocaView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'gostujoci',
        formTitle: i18next.t('gostujoca.title'),
        gridMeta: [
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('ep.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ep.uprizoritev'),
                name: 'uprizoritev.label',
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
                label: i18next.t('ep.t.lastnaSredstva'),
                name: 'lastnaSredstva',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.t.avtorskiHonorarji'),
                name: 'avtorskiHonorarji',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.tantieme'),
                name: 'tantieme',
                total: 'sum',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'premakniGor', title: i18next.t('std.premakniGor')},
                    {event: 'premakniDol', title: i18next.t('std.premakniDol')}
                ]
            }
        ]
    });
    
    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    GostujocaView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramGostujoca'
        });
        this.prilogeR.show(view);
    };
    
    return GostujocaView;
});