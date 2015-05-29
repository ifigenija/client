/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/zaposlitev-form.tpl',
    'formSchema!zaposlitev',
    '../Model/Zaposlitev',
    'i18next',
    'baseUrl',
    'app/Max/Module/Backgrid'
], function (
        SeznamiView,
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

    var ZaposlitevView = SeznamiView.extend({
        url: baseUrl + '/rest/zaposlitev/vse',
        title: i18next.t('produkcija.zaposlitev.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.zaposlitev.oseba'),
                name: 'oseba.label',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.zaposlitev.status'),
                name: 'status',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'date',
                editable: false,
                label: i18next.t('produkcija.zaposlitev.zacetek'),
                name: 'zacetek',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'date',
                editable: false,
                label: i18next.t('produkcija.zaposlitev.konec'),
                name: 'konec',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('produkcija.zaposlitev.tip'),
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
        var text = i18next.t("produkcija.zaposlitev.nova");

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