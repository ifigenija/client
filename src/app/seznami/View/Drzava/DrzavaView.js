/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './DrzavaEditView',
    '../../Model/Drzava',
    'i18next'
], function (
        SeznamiView,
        DrzavaEditView,
        Drzava,
        i18next
        ) {

    var DrzavaView = SeznamiView.extend({
        url: '/rest/drzava',
        name: 'Drzava',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.drzava.isoNum'),
                name: 'isoNum',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.drzava.isoNaziv'),
                name: 'isoNaziv',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')},
                    {event: 'uredi', title: i18next.t('seznami.view.uredi')},
                ]
            }
        ]
    });
    
    DrzavaView.prototype.getFormView = function (model) {
        var editModel = new Drzava.Model({id: model.get('id')});
        editModel.fetch();
        return new DrzavaEditView({model: editModel});

    };    
    
    DrzavaView.prototype.onDodaj = function () {
        var model = new Drzava.Model();
        //this.collection.add(model);
        this.formR.show(new DrzavaEditView({model: model}));
    };

    return DrzavaView;
});