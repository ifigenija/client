/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/SeznamView',
    'template!../tpl/besedilo-form.tpl',
    'formSchema!besedilo?filter=1',
    'formSchema!besedilo',
    '../Model/Besedilo',
    'i18next',
    'baseUrl',
    'app/Zapisi/View/ZapisiLayout'
], function (
        SeznamView,
        formTpl,
        filterSch,
        schema,
        Model,
        i18next,
        baseUrl,
        ZapisiLayout
        ) {

    var BesediloView = SeznamView.extend({
        url: baseUrl + '/rest/besedilo',
        title: i18next.t('besedilo.title'),
        zapirajFormo: true,
        skrivajTabelo: true,
        filterSchema: filterSch,
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
                label: i18next.t('besedilo.naslov'),
                name: 'naslov',
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
                label: i18next.t('besedilo.interNaslov'),
                name: 'internacionalniNaslov',
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
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('besedilo.letoIzida'),
                name: 'letoIzida',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('besedilo.zaloznik'),
                name: 'zaloznik',
                sortable: true
            },
            {
                headerCell: 'number',
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
                    {event: 'uredi', title: i18next.t('std.uredi')},
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
        this.onUredi(model);
    };
    
    /**
     * Render priloga, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    BesediloView.prototype.renderPriloge = function (model) {
        var view = new ZapisiLayout({
            lastnik: model.get('id'),
            classLastnika: 'Besedilo'
        });
        this.prilogeR.show(view);
    };

    return BesediloView;
});