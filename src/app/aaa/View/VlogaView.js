/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    'template!../tpl/vloga-form.tpl',
    './VlogaEditView',
    '../Model/Vloga'
], function (
        SeznamiView,
        formTpl,
        VlogaEditView,
        Vloga
        ) {

    var VlogaView = SeznamiView.extend({
        url: '/rest/role',
        formTemplate: formTpl,
        name: 'Vloga',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: 'Naziv',
                name: 'name',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Opis',
                name: 'description',
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
        ],
        getFormView: function (model) {

            var editModel = new Vloga.Model({id: model.get('id')});
            editModel.fetch();
            return new VlogaEditView({model: editModel});

        },
        onDodaj: function () {
            var model = new Vloga.Model();
            this.collection.add(model);
            this.formR.show(new VlogaEditView({model: model}));


        }
    });

    return VlogaView;
});