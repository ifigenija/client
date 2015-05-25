/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/besedilo-form.tpl',
    'formSchema!besedilo',
    '../Model/Besedilo',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        formTpl,
        schema,
        Besedilo,
        i18next,
        baseUrl
        ) {

    var BesediloView = SeznamiView.extend({
        url: baseUrl + '/rest/besedilo',
        name: 'Besedilo',
        schema: schema,
        formTemplate: formTpl,
        dodaj: i18next.t('seznami.view.besedilo.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.besedilo.naslov'),
                name: 'naslov',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.besedilo.avtor'),
                name: 'avtor',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.besedilo.naslovIzvirnika'),
                name: 'naslovIzvirnika',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.besedilo.prevajalec'),
                name: 'prevajalec',
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
    
    BesediloView.prototype.getTitle = function (model) {
        var text = i18next.t("seznami.view.besedilo.nova");

        if (model.get('id')) {
            text = model.get('naslov') || "Naslov";
        }
        return text;
    };

    BesediloView.prototype.onDodaj = function () {
        var model = new Besedilo.Model();
        this.onSelected(model);
    };

    return BesediloView;
});