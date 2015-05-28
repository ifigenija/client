/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/zvrstSurs-form.tpl',
    'formSchema!zvrstSurs',
    '../Model/ZvrstSurs',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        formTpl,
        schema,
        ZvrstSurs,
        i18next,
        baseUrl
        ) {

    var ZvrstSursView = SeznamiView.extend({
        url: baseUrl + '/rest/zvrstSurs',
        title: i18next.t('seznami.zvrstSurs.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.std.ime'),
                name: 'ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.std.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.brisi')}
                ]
            }
        ]
    });
    
    ZvrstSursView.prototype.getTitle = function (model) {
        var text = i18next.t("seznami.zvrstSurs.nova");

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