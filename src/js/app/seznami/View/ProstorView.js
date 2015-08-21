/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/prostor-form.tpl',
    'formSchema!prostor',
    '../Model/Prostor',
    'i18next',
    'baseUrl',
    'app/Max/Module/Backgrid'
], function (
        SeznamView,
        formTpl,
        schema,
        Prostor,
        i18next,
        baseUrl,
        Backgrid
        ) {
    
    var ProstorView = SeznamView.extend({
        url: baseUrl + '/rest/prostor',
        title: i18next.t('prostor.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('prostor.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('prostor.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('prostor.jePrizorisce'),
                name: 'jePrizorisce',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('prostor.kapaciteta'),
                name: 'kapaciteta',
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

    ProstorView.prototype.getTitle = function (model) {
        var text = i18next.t("prostor.nova");

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