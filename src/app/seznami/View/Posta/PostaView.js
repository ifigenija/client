/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './PostaEditView',
    '../../Model/Posta',
    'i18next'
], function (
        SeznamiView,
        PostaEditView,
        Posta,
        i18next
        ) {

    var PostaView = SeznamiView.extend({
        url: '/rest/posta',
        name: 'Posta',
        dodaj: i18next.t('seznami.view.posta.dodaj'),
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
                label: i18next.t('seznami.view.oseba.naziv'),
                name: 'naziv',
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

    PostaView.prototype.getFormView = function (model) {
        var editModel = new Posta.Model({id: model.get('id')});
        editModel.fetch();
        return new PostaEditView({model: editModel});

    };

    PostaView.prototype.onDodaj = function () {
        var model = new Posta.Model();
        //this.collection.add(model);
        this.formR.show(new PostaEditView({model: model}));
    };

    return PostaView;
});