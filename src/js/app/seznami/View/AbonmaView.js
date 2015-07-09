/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/abonma-form.tpl',
    'formSchema!abonma',
    '../Model/Abonma',
    'i18next',
    'baseUrl',
    'app/Max/Module/Backgrid'
], function (
        SeznamView,
        formTpl,
        schema,
        Abonma,
        i18next,
        baseUrl,
        Backgrid
        ) {
    
    var hc = Backgrid.HeaderCell.extend({
            className: 'backgrid-kolona-stevilk'
        });

    var AbonmaView = SeznamView.extend({
        url: baseUrl + '/rest/abonma',
        title: i18next.t('abonma.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.ime'),
                name: 'ime',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('abonma.stPredstav'),
                name: 'stPredstav',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('abonma.stKuponov'),
                name: 'stKuponov',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('entiteta.kapaciteta'),
                name: 'kapaciteta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.opis'),
                name: 'opis',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });
    
    AbonmaView.prototype.getTitle = function (model) {
        var text = i18next.t("abonma.nova");

        if (model.get('id')) {
            text = model.get('ime') || "Ime";
        }
        return text;
    };

    AbonmaView.prototype.onDodaj = function () {
        var model = new Abonma.Model();
        this.onSelected(model);
    };

    return AbonmaView;
});