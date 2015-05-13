/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './TipFunkcijeEditView',
    '../../Model/TipFunkcije',
    'i18next'
], function (
        SeznamiView,
        TipFunkcijeEditView,
        TipFunkcije,
        i18next
        ) {

    var TipFunkcijeView = SeznamiView.extend({
        url: '/rest/tipFunkcije',
        name: 'TipFunkcije',
        dodaj: i18next.t('seznami.view.tipFunkcije.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.ime'),
                name: 'ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.opis'),
                name: 'opis',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.tipFunkcije.dovoliPrekrivanje'),
                name: 'dovoliPrekrivanje',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.tipFunkcije.nastopajoc'),
                name: 'nastopajoc',
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
    
    TipFunkcijeView.prototype.getFormView = function (model) {
        var editModel = new TipFunkcije.Model({id: model.get('id')});
        editModel.fetch();
        return new TipFunkcijeEditView({model: editModel});

    };    
    
    TipFunkcijeView.prototype.onDodaj = function () {
        var model = new TipFunkcije.Model();
        //this.collection.add(model);
        this.formR.show(new TipFunkcijeEditView({model: model}));
    };

    return TipFunkcijeView;
});