/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/SeznamView',
    'template!../tpl/tipVaje-form.tpl',
    'formSchema!tipVaje',
    '../Model/TipVaje',
    'i18next',
    'baseUrl',
    'formSchema!tipVaje?filter=1'
], function (
        SeznamView,
        formTpl,
        schema,
        TipVaje,
        i18next,
        baseUrl,
        filterSch
        ) {
    
    var TipVajeView = SeznamView.extend({
        url: baseUrl + '/rest/tipVaje',
        title: i18next.t('tipVaje.title'),
        zapirajFormo: true,
        skrivajTabelo: true,
        filterSchema: filterSch,
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tipVaje.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('tipVaje.ime'),
                name: 'ime',
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
    
    TipVajeView.prototype.getTitle = function (model) {
        var text = i18next.t("tipVaje.nova");

        if (model.get('id')) {
            text = model.get('ime') || "Ime";
        }
        return text;
    };

    TipVajeView.prototype.onDodaj = function () {
        var model = new TipVaje.Model();
        this.onUredi(model);
    };

    return TipVajeView;
});