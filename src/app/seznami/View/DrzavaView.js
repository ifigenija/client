/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/drzava-form.tpl',
    'formSchema!drzava',
    '../Model/Drzava',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        formTpl,
        schema,
        Drzava,
        i18next,
        baseUrl
        ) {

    var DrzavaView = SeznamiView.extend({
        url: baseUrl + '/rest/drzava',
        title: i18next.t('seznami.drzava.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.std.sifra'),
                name: 'sifra',
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
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.drzava.isoNum'),
                name: 'isoNum',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.drzava.isoNaziv'),
                name: 'isoNaziv',
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
    
    DrzavaView.prototype.getTitle = function (model) {
        var text = i18next.t("seznami.drzava.nova");

        if (model.get('id')) {
            text = model.get('naziv') || "Naziv";
        }
        return text;
    };

    DrzavaView.prototype.onDodaj = function () {
        var model = new Drzava.Model();
        this.onSelected(model);
    };

    return DrzavaView;
});