/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/sezona-form.tpl',
    'formSchema!sezona',
    '../Model/Sezona',
    'i18next',
    'baseUrl',
    'app/Max/Module/Backgrid'
], function (
        SeznamView,
        formTpl,
        schema,
        Sezona,
        i18next,
        baseUrl,
        Backgrid
        ) {
    
    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });

    var SezonaView = SeznamView.extend({
        url: baseUrl + '/rest/sezona',
        title: i18next.t('sezona.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('sezona.imeSezone'),
                name: 'imeSezone',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'date',
                editable: false,
                label: i18next.t('entiteta.zacetek'),
                name: 'zacetek',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'date',
                editable: false,
                label: i18next.t('entiteta.konec'),
                name: 'konec',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('entiteta.aktivna'),
                name: 'aktivna',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('entiteta.brisi')}
                ]
            }
        ]
    });
    
    SezonaView.prototype.getTitle = function (model) {
        var text = i18next.t("sezona.nova");

        if (model.get('id')) {
            text = model.get('naziv') || "Naziv";
        }
        return text;
    };

    SezonaView.prototype.onDodaj = function () {
        var model = new Sezona.Model();
        this.onSelected(model);
    };

    return SezonaView;
});