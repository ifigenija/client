/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './UprizoritevStrosekEditView',
    '../Model/UprizoritevStrosek',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        UprizoritevStrosekEditView,
        UprizoritevStrosek,
        i18next,
        baseUrl
        ) {

    var UprizoritevStrosekView = SeznamiView.extend({
        url: baseUrl + '/rest/uprizoritev/vse',
        title: i18next.t('produkcija.view.uprizoritev.title'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.uprizoritev.faza'),
                name: 'faza',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.uprizoritev.naslov'),
                name: 'naslov',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('produkcija.view.uprizoritev.delovniNaslov'),
                name: 'delovniNaslov',
                sortable: true
            },
            {
                cell: 'date',
                editable: false,
                label: i18next.t('produkcija.view.uprizoritev.datumPremiere'),
                name: 'datumPremiere',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.view.uredi')}
                ]
            }
        ]
    });
    
    UprizoritevStrosekView.prototype.getFormView = function (model) {
        if (model.get('id')) {
            var editModel = new UprizoritevStrosek.Model({id: model.get('id')});
            editModel.fetch();
        } else {
            editModel = model;
        }

        return new UprizoritevStrosekEditView({
            model: editModel
        });
    };
    
    UprizoritevStrosekView.prototype.onDodaj = function () {
        var model = new UprizoritevStrosek.Model();
        this.onSelected(model);
    };

    return UprizoritevStrosekView;
});