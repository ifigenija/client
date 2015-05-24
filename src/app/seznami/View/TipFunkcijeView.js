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
        title: i18next.t('seznami.view.tipFunkcije.title'),
        schema: schema,
        formTemplate: formTpl,
        dodaj: i18next.t('seznami.view.tipFunkcije.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.ime'),
                name: 'ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.opis'),
                name: 'opis',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.tipFunkcije.dovoliPrekrivanje'),
                name: 'dovoliPrekrivanje',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.tipFunkcije.nastopajoc'),
                name: 'nastopajoc',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')}
                ]
            }
        ]
    });
    
    TipFunkcijeView.prototype.getTitle = function (model) {
        var text = i18next.t("seznami.view.tipFunkcije.nova");

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