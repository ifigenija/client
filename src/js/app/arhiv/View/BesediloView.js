/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/besedilo-form.tpl',
    'formSchema!besedilo',
    '../Model/Besedilo',
    'i18next',
    'baseUrl',
    'app/Max/Module/Backgrid'
], function (
        SeznamView,
        formTpl,
        schema,
        Model,
        i18next,
        baseUrl,
        Backgrid
        ) {
    
    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });

    var BesediloView = SeznamView.extend({
        url: baseUrl + '/rest/besedilo',
        title: i18next.t('besedilo.title'),
        schema: schema,
        formTemplate: formTpl,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('besedilo.stevilka'),
                name: 'stevilka',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('besedilo.avtor'),
                name: 'avtor',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('besedilo.naslovIzvirnika'),
                name: 'naslovIzvirnika',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('besedilo.prevajalec'),
                name: 'prevajalec',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'date',
                editable: false,
                label: i18next.t('besedilo.letoIzida'),
                name: 'letoIzida',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'date',
                editable: false,
                label: i18next.t('besedilo.datumPrejema'),
                name: 'datumPrejema',
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
    
    BesediloView.prototype.getTitle = function (model) {
        var text = i18next.t("besedilo.nova");

        if (model.get('id')) {
            text = model.get('naslov') || "Naslov";
        }
        return text;
    };

    BesediloView.prototype.onDodaj = function () {
        var model = new Model.Model();
        this.onSelected(model);
    };

    return BesediloView;
});