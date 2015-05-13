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
        columns: [
            {
                cell: 'string',
                editable: false,
                label: 'Šifra',
                name: 'sifra',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Naziv ',
                name: 'naziv',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: 'Briši'},
                    {event: 'uredi', title: 'Uredi'},
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