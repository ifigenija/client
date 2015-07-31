/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/tipFunkcije-form.tpl',
    'formSchema!tipFunkcije',
    '../Model/TipFunkcije',
    'i18next',
    'baseUrl'
], function (
        SeznamView,
        formTpl,
        schema,
        TipFunkcije,
        i18next,
        baseUrl
        ) {

    var TipFunkcijeView = SeznamView.extend({
        url: baseUrl + '/rest/tipFunkcije',
        title: i18next.t('tipFunkcije.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
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
        this.onSelected(model);
    };

    return TipFunkcijeView;
});