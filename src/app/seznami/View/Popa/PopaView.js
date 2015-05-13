/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './PopaEditView',
    '../../Model/Popa',
    'i18next'
], function (
        SeznamiView,
        PopaEditView,
        Popa,
        i18next
        ) {

    var PopaView = SeznamiView.extend({
        url: '/rest/popa',
        name: 'Poslovni partner',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.sifra'),
                name: 'sifra',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.naziv'),
                name: 'naziv',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.popa.panoga'),
                name: 'panoga',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.ePosta'),
                name: 'email',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.popa.url'),
                name: 'url',
                sortable: false
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
    
    PopaView.prototype.getFormView = function (model) {
        var editModel = new Popa.Model({id: model.get('id')});
        editModel.fetch();
        return new PopaEditView({model: editModel});

    };
    PopaView.prototype.onDodaj = function () {
        var model = new Popa.Model();
        this.collection.add(model);
        this.formR.show(new PopaEditView({model: model}));
    };

    return PopaView;
});