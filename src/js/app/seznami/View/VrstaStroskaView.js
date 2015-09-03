/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/vrstaStroska-form.tpl',
    'formSchema!vrstaStroska',
    '../Model/VrstaStroska',
    'i18next',
    'baseUrl'
], function (
        SeznamView,
        formTpl,
        schema,
        VrstaStroska,
        i18next,
        baseUrl
        ) {
    
    var VrstaStroskaView = SeznamView.extend({
        url: baseUrl + '/rest/vrstaStroska',
        title: i18next.t('vrstaStroska.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('vrstaStroska.t.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'integer',
                editable: false,
                label: i18next.t('vrstaStroska.t.skupina'),
                name: 'skupina',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'integer',
                editable: false,
                label: i18next.t('vrstaStroska.t.podskupina'),
                name: 'podskupina',
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
    
    VrstaStroskaView.prototype.getTitle = function (model) {
        var text = i18next.t("vrstaStroska.nova");

        if (model.get('id')) {
            text = model.get('naziv') || "naziv";
        }
        return text;
    };

    VrstaStroskaView.prototype.onDodaj = function () {
        var model = new VrstaStroska.Model();
        this.onUredi(model);
    };

    return VrstaStroskaView;
});