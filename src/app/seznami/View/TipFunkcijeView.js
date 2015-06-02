/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/tipFunkcije-form.tpl',
    'formSchema!tipFunkcije',
    '../Model/TipFunkcije',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        formTpl,
        schema,
        TipFunkcije,
        i18next,
        baseUrl
        ) {

    var TipFunkcijeView = SeznamiView.extend({
        url: baseUrl + '/rest/tipFunkcije',
        title: i18next.t('seznami.tipFunkcije.title'),
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
                cell: 'string',
                editable: false,
                label: i18next.t('tipFunkcije.zenskoIme'),
                name: 'imeZenski',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.opis'),
                name: 'opis',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.podrocje'),
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
        var text = i18next.t("seznami.tipFunkcije.nova");

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