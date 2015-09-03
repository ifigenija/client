/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/drzava-form.tpl',
    'formSchema!drzava',
    '../Model/Drzava',
    'i18next',
    'baseUrl'
], function (
        SeznamView,
        formTpl,
        schema,
        Drzava,
        i18next,
        baseUrl
        ) {

    var DrzavaView = SeznamView.extend({
        url: baseUrl + '/rest/drzava',
        title: i18next.t('drzava.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('drzava.isoNum'),
                name: 'isoNum',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('drzava.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('drzava.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('drzava.isoNaziv'),
                name: 'isoNaziv',
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
    
    DrzavaView.prototype.getTitle = function (model) {
        var text = i18next.t("drzava.nova");

        if (model.get('id')) {
            text = model.get('naziv') || "Naziv";
        }
        return text;
    };

    DrzavaView.prototype.onDodaj = function () {
        var model = new Drzava.Model();
        this.onUredi(model);
    };

    return DrzavaView;
});