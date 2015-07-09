
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

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });

    var UprizoritevView = SeznamView.extend({
        url: baseUrl + '/rest/uprizoritev/vse',
        title: i18next.t('uprizoritev.title'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.sifra'),
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
                label: i18next.t('entiteta.naslov'),
                name: 'naslov',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.avtor'),
                name: 'avtor',
                sortable: true
            },            
            {
                cell:  Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('zvrstUprizoritve')
                }),
                editable: false,
                label: i18next.t('uprizoritev.zvrst'),
                name: 'zvrstUprizoritve',
                sortable: true
            },
            {
                headerCell: hc,
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
                error: function () {
                    Radio.channel('error').command('flash', {
                        message: i18next.t("napaka.fetch") + ' ' + '(Uprizoritev)',
                        code:'9000011',
                        severity: 'error'
                    });
                }
            });
        }

        return new UprizoritevEditView({
            model: editModel
        });
    };

    UprizoritevView.prototype.onDodaj = function () {
        var model = new Uprizoritev.Model();
        this.onSelected(model);
    };

    return UprizoritevView;
});
