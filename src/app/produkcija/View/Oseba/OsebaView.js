/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './OsebaEditView',
    '../../Model/Oseba',
    'i18next'
], function (
        SeznamiView,
        OsebaEditView,
        Oseba,
        i18next
        ) {

    var OsebaView = SeznamiView.extend({
        url: '/rest/oseba',
        name: 'Oseba',
        dodaj: i18next.t('seznami.view.oseba.dodaj'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.oseba.ime'),
                name: 'ime',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.oseba.priimek'),
                name: 'priimek',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.oseba.psevdonim'),
                name: 'psevdonim',
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
                label: i18next.t('seznami.view.oseba.uporabnik'),
                name: 'user',
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
        ],
    });

    OsebaView.prototype.getFormView = function (model) {
        var editModel = new Oseba.Model({id: model.get('id')});
        editModel.fetch();
        return new OsebaEditView({model: editModel});

    };
    OsebaView.prototype.onDodaj = function () {
        var model = new Oseba.Model();
        //this.collection.add(model);
        this.formR.show(new OsebaEditView({model: model}));
    };

    return OsebaView;
});