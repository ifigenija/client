/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    'template!../tpl/zaposlitev-form.tpl',
    'formSchema!zaposlitev',
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
        events:{
            'click .oseba-dodaj': 'novaOseba'
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
                label: i18next.t('zaposlitev.oseba'),
                name: 'oseba.label',
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
                headerCell: 'number',
                cell: 'integer',
                editable: false,
                label: i18next.t('zaposlitev.tip'),
                name: 'tip',
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

    ZaposlitevView.prototype.getTitle = function (model) {
        var text = i18next.t("zaposlitev.nova");

        if (model.get('id')) {
            text = model.get('oseba').label || "Oseba";
        }
        return text;
    };

    ZaposlitevView.prototype.onDodaj = function () {
        var model = new Zaposlitev.Model();
        this.onSelected(model);
    };
    
    ZaposlitevView.prototype.novaOseba = function () {
        var model = new OsebaModel.Model();
        var editor = this.formView.form.fields.oseba.editor;
        this.modal = OsebaModal(model, editor);
    };

    return ZaposlitevView;
});