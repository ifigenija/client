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
        title: i18next.t('produkcija.uprizoritev.title'),
        columns: [
            {
                cell: 'string',
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
                label: i18next.t('produkcija.uprizoritev.delovniNaslov'),
                name: 'delovniNaslov',
                sortable: true
            },
            {
                cell: 'date',
                editable: false,
                label: i18next.t('produkcija.uprizoritev.datumPremiere'),
                name: 'datumPremiere',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.uredi')}
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