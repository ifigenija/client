/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/prostor-form.tpl',
    'formSchema!prostor',
    '../Model/Prostor',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        formTpl,
        schema,
        Prostor,
        i18next,
        baseUrl
        ) {

    var ProstorView = SeznamiView.extend({
        url: baseUrl + '/rest/prostor',
        title: i18next.t('seznami.prostor.title'),
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
                cell: 'boolean',
                editable: false,
                label: i18next.t('seznami.prostor.jePrizorisce'),
                name: 'jePrizorisce',
                sortable: true
            },
            {
                cell: 'number',
                editable: false,
                label: i18next.t('seznami.prostor.kapaciteta'),
                name: 'kapaciteta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.std.opis'),
                name: 'opis',
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
    
    ProstorView.prototype.getTitle = function (model) {
        var text = i18next.t("seznami.prostor.nova");

        if (model.get('id')) {
            text = model.get('naziv') || "Naziv";
        }
        return text;
    };

    ProstorView.prototype.onDodaj = function () {
        var model = new Prostor.Model();
        this.onSelected(model);
    };

    return ProstorView;
});