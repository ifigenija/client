
/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './UprizoritevEditView',
    '../Model/Uprizoritev',
    'i18next',
    'baseUrl',
    'app/Max/Module/Backgrid',
    'formSchema!uprizoritev'
], function (
        SeznamiView,
        UprizoritevEditView,
        Uprizoritev,
        i18next,
        baseUrl,
        Backgrid,
        schema
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });

    var UprizoritevView = SeznamiView.extend({
        url: baseUrl + '/rest/uprizoritev/vse',
        title: i18next.t('produkcija.uprizoritev.title'),
        columns: [
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('faza')
                }),
                editable: false,
                label: i18next.t('produkcija.uprizoritev.faza'),
                name: 'faza',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.uprizoritev.naslov'),
                name: 'naslov',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('pro.avtor'),
                name: 'avtor',
                sortable: true
            },            
            {
                cell:  Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('zvrstUprizoritve')
                }),
                editable: false,
                label: i18next.t('produkcija.uprizoritev.zvrst'),
                name: 'zvrstUprizoritve',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'date',
                editable: false,
                label: i18next.t('produkcija.uprizoritev.datumPremiere'),
                name: 'datumPremiere',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('pro.gostujoca'),
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
        if (model.get('id')) {
            var editModel = new Uprizoritev.Model({id: model.get('id')});
            editModel.fetch();
        } else {
            editModel = model;
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
