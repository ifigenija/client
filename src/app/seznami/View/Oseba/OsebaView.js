/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './OsebaEditView',
    './OsebaKontaktnaEditView',
    '../../Model/Oseba',
    'i18next'
], function (
        SeznamiView,
        OsebaEditView,
        OsebaKontaktnaEditView,
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
        
        if (this.options.pogled === 'kontaktnaOseba') {
            return new OsebaKontaktnaEditView({model: editModel});
        } else {
            return new OsebaEditView({model: editModel});
        }
        
        return new OsebaEditView({model: editModel});

    };
    OsebaView.prototype.onDodaj = function () {
        var model = new Oseba.Model();
        var view = new OsebaEditView({model: model});
        this.listenTo(view, "save:success", this.dodajVcollection);
        this.formR.show(view);
    };

    OsebaView.prototype.dodajVcollection = function () {
        this.collection.fetch();
    };

    return OsebaView;
});