/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './ZvrstSursEditView',
    '../../Model/ZvrstSurs',
    'i18next'
], function (
        SeznamiView,
        ZvrstSursEditView,
        ZvrstSurs,
        i18next
        ) {

    var ZvrstSursView = SeznamiView.extend({
        url: '/rest/zvrstSurs',
        name: 'ZvrstSurs',
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
                label: i18next.t('seznami.view.naziv'),
                name: 'naziv',
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
    
    ZvrstSursView.prototype.getFormView = function (model) {
        var editModel = new ZvrstSurs.Model({id: model.get('id')});
        editModel.fetch();
        return new ZvrstSursEditView({model: editModel});

    };    
    
    ZvrstSursView.prototype.onDodaj = function () {
        var model = new ZvrstSurs.Model();
        //this.collection.add(model);
        this.formR.show(new ZvrstSursEditView({model: model}));
    };

    return ZvrstSursView;
});