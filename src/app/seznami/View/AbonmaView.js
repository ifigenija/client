/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/abonma-form.tpl',
    'formSchema!abonma',
    '../Model/Abonma',
    'i18next'
], function (
        SeznamiView,
        formTpl,
        schema,
        Abonma,
        i18next
        ) {

    var AbonmaView = SeznamiView.extend({
        url: '/rest/abonma',
        name: 'Abonma',
        schema: schema,
        formTemplate: formTpl,
        dodaj: i18next.t('seznami.view.abonma.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.abonma.ime'),
                name: 'ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.abonma.stPredstav'),
                name: 'stPredstav',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.abonma.stKuponov'),
                name: 'stKuponov',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.abonma.kapaciteta'),
                name: 'kapaciteta',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.abonma.opis'),
                name: 'opis',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.view.uredi')},
                ]
            }
        ]
    });

    AbonmaView.prototype.onDodaj = function () {
        var model = new Abonma.Model();
        this.onSelected(model);
    };

    return AbonmaView;
});