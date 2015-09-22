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
    'radio',
    './BesediloDokView'
], function (
        SeznamView,
        formTpl,
        filterSch,
        schema,
        Model,
        i18next,
        baseUrl,
        Radio,
        BesediloDokView
        ) {

    var BesediloView = SeznamView.extend({
        url: baseUrl + '/rest/besedilo',
        title: i18next.t('besedilo.title'),
        zapirajFormo: false,
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
                label: i18next.t('besedilo.avtorji'),
                name: 'imena',
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
    
    BesediloView.prototype.getFormView = function (model) {
        var editModel = model;

        if (model.get('id')) {
            editModel = new Model.Model({id: model.get('id')});
            editModel.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }

        return new BesediloDokView({
            model: editModel
        });
    };

    BesediloView.prototype.onDodaj = function () {
        var model = new Model.Model();
        this.onUredi(model);
    };

    return BesediloView;
});