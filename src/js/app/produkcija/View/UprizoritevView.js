
/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    './UprizoritevEditView',
    '../Model/Uprizoritev',
    'i18next',
    'baseUrl',
    'app/Max/Module/Backgrid',
    'formSchema!uprizoritev',
    'radio'
], function (
        SeznamView,
        UprizoritevEditView,
        Uprizoritev,
        i18next,
        baseUrl,
        Backgrid,
        schema,
        Radio
        ) {

    var UprizoritevView = SeznamView.extend({
        url: baseUrl + '/rest/uprizoritev/vse',
        title: i18next.t('uprizoritev.title'),
        columns: [
            {
                cell: 'string',
                class: 'hidden-sm',
                editable: false,
                label: i18next.t('uprizoritev.t.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('faza')
                }),
                editable: false,
                label: i18next.t('uprizoritev.faza'),
                name: 'faza',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('uprizoritev.naslov'),
                name: 'naslov',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('uprizoritev.avtor'),
                name: 'avtor',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('zvrstUprizoritve')
                }),
                editable: false,
                label: i18next.t('uprizoritev.zvrst'),
                name: 'zvrstUprizoritve',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('maticniOder')
                }),
                editable: false,
                label: i18next.t('uprizoritev.maticniOder'),
                name: 'maticniOder',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'date',
                editable: false,
                label: i18next.t('uprizoritev.t.datumPremiere'),
                name: 'datumPremiere',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('uprizoritev.gostujoca'),
                name: 'gostujoca',
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

    UprizoritevView.prototype.getFormView = function (model) {
        var editModel = model;

        if (model.get('id')) {
            editModel = new Uprizoritev.Model({id: model.get('id')});
            editModel.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }

        return new UprizoritevEditView({
            model: editModel
        });
    };

    UprizoritevView.prototype.onDodaj = function () {
        var model = new Uprizoritev.Model();
        this.onUredi(model);
    };

    return UprizoritevView;
});
