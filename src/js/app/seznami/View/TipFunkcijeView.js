/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/SeznamView',
    'template!../tpl/tipFunkcije-form.tpl',
    'formSchema!tipFunkcije?filter=1',
    'formSchema!tipFunkcije',
    '../Model/TipFunkcije',
    'i18next',
    'baseUrl'
], function (
        SeznamView,
        formTpl,
        filterSch,
        schema,
        TipFunkcije,
        i18next,
        baseUrl
        ) {

    var TipFunkcijeView = SeznamView.extend({
        url: baseUrl + '/rest/tipFunkcije',
        title: i18next.t('tipFunkcije.title'),
        zapirajFormo: true,
        skrivajTabelo: true,
        filterSchema: filterSch,
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tipFunkcije.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tipFunkcije.ime'),
                name: 'ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tipFunkcije.zenskoIme'),
                name: 'imeZenski',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tipFunkcije.podrocje'),
                name: 'podrocje',
                sortable: false
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
    
    TipFunkcijeView.prototype.getTitle = function (model) {
        var text = i18next.t("tipFunkcije.nova");

        if (model.get('id')) {
            text = model.get('ime') || "Ime";
        }
        return text;
    };
    
    TipFunkcijeView.prototype.onDodaj = function () {
        var model = new TipFunkcije.Model();
        this.onUredi(model);
    };

    return TipFunkcijeView;
});