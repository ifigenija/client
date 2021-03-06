/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/SeznamView',
    'template!../tpl/zaposlitev-form.tpl',
    'formSchema!zaposlitev/vse',
    'formSchema!zaposlitev/vse?filter=1',
    '../Model/Zaposlitev',
    'i18next',
    'baseUrl',
    'app/Max/Module/Backgrid',
    'app/seznami/Model/Oseba',
    'app/seznami/View/OsebaModal'
], function (
        SeznamView,
        formTpl,
        schema,
        filterSchema,
        Zaposlitev,
        i18next,
        baseUrl,
        Backgrid,
        OsebaModel,
        OsebaModal
        ) {

    var ZaposlitevView = SeznamView.extend({
        url: baseUrl + '/rest/zaposlitev/vse',
        title: i18next.t('zaposlitev.title'),
        schema: schema,
        formTemplate: formTpl,
        filterSchema: filterSchema,
        events: {
            'click .dodaj-osebo': 'novaOseba'
        },
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('zaposlitev.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.priimek'),
                name: 'oseba.priimek',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.ime'),
                name: 'oseba.ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.psevdonim'),
                name: 'oseba.psevdonim',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('zaposlitev.delovnoMesto'),
                name: 'delovnoMesto',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('status')
                }),
                editable: false,
                label: i18next.t('zaposlitev.status'),
                name: 'status',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('zaposlitev.zacetek'),
                name: 'zacetek',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('zaposlitev.konec'),
                name: 'konec',
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

    ZaposlitevView.prototype.getTitle = function (model) {
        var text = i18next.t("zaposlitev.nova");

        if (model.get('id')) {
            text = model.get('oseba').label || "Zaposlitev";
        }
        return text;
    };

    ZaposlitevView.prototype.onDodaj = function () {
        var model = new Zaposlitev.Model();
        this.onUredi(model);
    };

    ZaposlitevView.prototype.novaOseba = function () {
        var model = new OsebaModel.Model();
        var editor = this.formView.form.fields.oseba.editor;
        this.modal = OsebaModal({
            model: model,
            editor: editor,
            form: this.formView.form,
            title: i18next.t('oseba.nova')
        });
    };

    return ZaposlitevView;
});