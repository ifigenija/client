/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './UprizoritevEditView',
    '../Model/Uprizoritev',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        UprizoritevEditView,
        Uprizoritev,
        i18next,
        baseUrl
        ) {

    var UprizoritevView = SeznamiView.extend({
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
        ],
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