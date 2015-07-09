/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/zaposlitev-form.tpl',
    'formSchema!zaposlitev',
    '../Model/Zaposlitev',
    'i18next',
    'baseUrl',
    'app/Max/Module/Backgrid'
], function (
        SeznamView,
        formTpl,
        schema,
        Zaposlitev,
        i18next,
        baseUrl,
        Backgrid
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });

    var ZaposlitevView = SeznamView.extend({
        url: baseUrl + '/rest/zaposlitev/vse',
        title: i18next.t('zaposlitev.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.oseba'),
                name: 'oseba.label',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.status'),
                name: 'status',
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
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('zaposlitev.tip'),
                name: 'tip',
                sortable: true
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

    ZaposlitevView.prototype.getTitle = function (model) {
        var text = i18next.t("zaposlitev.nova");

        if (model.get('id')) {
            text = model.get('oseba').label || "Oseba";
        }
        return text;
    };

    ZaposlitevView.prototype.onDodaj = function () {
        var model = new Zaposlitev.Model();
        this.onSelected(model);
    };

    return ZaposlitevView;
});