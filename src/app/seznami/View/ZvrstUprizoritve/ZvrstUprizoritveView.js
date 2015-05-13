/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './ZvrstUprizoritveEditView',
    '../../Model/ZvrstUprizoritve',
    'i18next'
], function (
        SeznamiView,
        ZvrstUprizoritveEditView,
        ZvrstUprizoritve,
        i18next
        ) {

    var ZvrstUprizoritveView = SeznamiView.extend({
        url: '/rest/zvrstUprizoritve',
        name: 'ZvrstUprizoritve',
        dodaj: i18next.t('seznami.view.zvrstUprizoritve.dodaj'),
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
    
    ZvrstUprizoritveView.prototype.getFormView = function (model) {
        var editModel = new ZvrstUprizoritve.Model({id: model.get('id')});
        editModel.fetch();
        return new ZvrstUprizoritveEditView({model: editModel});

    };    
    
    ZvrstUprizoritveView.prototype.onDodaj = function () {
        var model = new ZvrstUprizoritve.Model();
        //this.collection.add(model);
        this.formR.show(new ZvrstUprizoritveEditView({model: model}));
    };

    return ZvrstUprizoritveView;
});