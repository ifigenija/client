/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/zvrstUprizoritve-form.tpl',
    'formSchema!zvrstUprizoritve',
    '../Model/ZvrstUprizoritve',
    'i18next',
    'baseUrl'
], function (
        SeznamView,
        formTpl,
        schema,
        ZvrstUprizoritve,
        i18next,
        baseUrl
        ) {

    var ZvrstUprizoritveView = SeznamView.extend({
        url: baseUrl + '/rest/zvrstUprizoritve',
        title: i18next.t('zvrstUprizoritve.title'),
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
                label: i18next.t('entiteta.naziv'),
                name: 'naziv',
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
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });
    
    ZvrstUprizoritveView.prototype.getTitle = function (model) {
        var text = i18next.t("zvrstUprizoritve.nova");

        if (model.get('id')) {
            text = model.get('ime') || "Ime";
        }
        return text;
    };
    
    ZvrstUprizoritveView.prototype.onDodaj = function () {
        var model = new ZvrstUprizoritve.Model();
        this.onSelected(model);
    };

    return ZvrstUprizoritveView;
});