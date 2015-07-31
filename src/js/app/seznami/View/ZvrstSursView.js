/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/zvrstSurs-form.tpl',
    'formSchema!zvrstSurs',
    '../Model/ZvrstSurs',
    'i18next',
    'baseUrl'
], function (
        SeznamView,
        formTpl,
        schema,
        ZvrstSurs,
        i18next,
        baseUrl
        ) {

    var ZvrstSursView = SeznamView.extend({
        url: baseUrl + '/rest/zvrstSurs',
        title: i18next.t('zvrstSurs.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('zvrstSurs.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('zvrstSurs.naziv'),
                name: 'naziv',
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
    
    ZvrstSursView.prototype.getTitle = function (model) {
        var text = i18next.t("zvrstSurs.nova");

        if (model.get('id')) {
            text = model.get('ime') || "Ime";
        }
        return text;
    };
    
    ZvrstSursView.prototype.onDodaj = function () {
        var model = new ZvrstSurs.Model();
        this.onSelected(model);
    };


    return ZvrstSursView;
});