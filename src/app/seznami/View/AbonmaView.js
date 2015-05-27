/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/abonma-form.tpl',
    'formSchema!abonma',
    '../Model/Abonma',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        formTpl,
        schema,
        Abonma,
        i18next,
        baseUrl
        ) {

    var AbonmaView = SeznamiView.extend({
        url: baseUrl + '/rest/abonma',
        title: i18next.t('seznami.view.abonma.title'),
        schema: schema,
        formTemplate: formTpl,
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
                sortable: false
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
    
    AbonmaView.prototype.getTitle = function (model) {
        var text = i18next.t("seznami.view.abonma.nova");

        if (model.get('id')) {
            text = model.get('ime') || "Ime";
        }
        return text;
    };

    AbonmaView.prototype.onDodaj = function () {
        var model = new Abonma.Model();
        this.onSelected(model);
    };

    return AbonmaView;
});