/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/alternacija-form.tpl',
    'formSchema!alternacija',
    '../Model/Alternacija',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        formTpl,
        schema,
        Alternacija,
        i18next,
        baseUrl
        ) {

    var AlternacijaView = SeznamiView.extend({
        url: baseUrl + '/rest/alternacija',
        name: 'Alternacija',
        schema: schema,
        formTemplate: formTpl,
        dodaj: i18next.t('seznami.view.alternacija.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.alternacija.ime'),
                name: 'ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.alternacija.stPredstav'),
                name: 'stPredstav',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.alternacija.stKuponov'),
                name: 'stKuponov',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.alternacija.kapaciteta'),
                name: 'kapaciteta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.alternacija.opis'),
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

    AlternacijaView.prototype.onDodaj = function () {
        var model = new Alternacija.Model();
        this.onSelected(model);
    };

    return AlternacijaView;
});