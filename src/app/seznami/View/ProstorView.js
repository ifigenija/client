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
        title: i18next.t('seznami.view.prostor.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.prostor.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.prostor.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('seznami.view.prostor.jePrizorisce'),
                name: 'jePrizorisce',
                sortable: true
            },
            {
                cell: 'number',
                editable: false,
                label: i18next.t('seznami.view.prostor.kapaciteta'),
                name: 'kapaciteta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.prostor.opis'),
                name: 'opis',
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

    ProstorView.prototype.onDodaj = function () {
        var model = new Prostor.Model();
        this.onSelected(model);
    };

    return ProstorView;
});