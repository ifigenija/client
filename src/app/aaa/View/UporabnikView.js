/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/BaseView',
    'template!../tpl/uporabnik-form.tpl',
    './UporabnikEditView',
    '../Model/Uporabnik',
    'i18next'
], function (
        BaseView,
        formTpl,
        UporabnikEditView,
        Uporabnik,
        i18next
        ) {

    var UporabnikView = BaseView.extend({
        url: '/rest/user',
        formTemplate: formTpl,
        name: 'Uporabnik',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.naziv'),
                name: 'name',
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
                label: i18next.t('seznami.view.uporabnik.veljavnost'),
                name: 'expires',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.uporabnik.privzetaStran'),
                name: 'defaultRoute',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title:  i18next.t('seznami.view.brisi')},
                    {event: 'uredi', title:  i18next.t('seznami.view.uredi')},
                ]
            }
        ],
        getFormView: function (model) {

            var editModel = new Uporabnik.Model({id: model.get('id')});
            editModel.fetch();
            return new UporabnikEditView({model: editModel});

        },
        onDodaj: function () {
            var model = new Uporabnik.Model();
            this.collection.add(model);
            this.formR.show(new UporabnikEditView({model: model}));


        }
    });

    return UporabnikView;
});