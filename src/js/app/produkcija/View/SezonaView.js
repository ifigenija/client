/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/SeznamView',
    'template!../tpl/sezona-form.tpl',
    'formSchema!sezona?filter=1',
    'formSchema!sezona',
    '../Model/Sezona',
    'i18next',
    'baseUrl'
], function (
        SeznamView,
        formTpl,
        filterSch,
        schema,
        Sezona,
        i18next,
        baseUrl
        ) {

    var SezonaView = SeznamView.extend({
        url: baseUrl + '/rest/sezona',
        title: i18next.t('sezona.title'),
        zapirajFormo: false,
        skrivajTabelo: true,
        filterSchema: filterSch,
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('sezona.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('sezona.ime'),
                name: 'ime',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('sezona.zacetek'),
                name: 'zacetek',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('sezona.konec'),
                name: 'konec',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('sezona.aktivna'),
                name: 'aktivna',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'brisi', title: i18next.t('std.brisi')}
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
        this.onUredi(model);
    };

    return SezonaView;
});