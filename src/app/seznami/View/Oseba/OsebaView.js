/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './OsebaEditView',
    '../../Model/Oseba',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        OsebaEditView,
        Oseba,
        i18next,
        baseUrl
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
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')}
                ]
            }
        ],
    });

    OsebaView.prototype.getFormView = function (model) {
        return this.ObstojecVnos(model);
    };
    OsebaView.prototype.onDodaj = function () {
        var model = new Oseba.Model();
        var view = new OsebaEditView({model: model});
        this.listenTo(view, "save:success", this.dodajVcollection);
        this.formR.show(view);
    };

    OsebaView.prototype.ObstojecVnos = function (model) {
        var editModel = new Oseba.Model({id: model.get('id')});
        editModel.fetch();

        return new OsebaEditView(
                {
                    model: editModel,
                    pogled: this.options.pogled
                });
    };

    OsebaView.prototype.dodajVcollection = function (model) {
        this.collection.fetch();
        return this.ObstojecVnos(model);

//        if (this.options.pogled === 'kontaktnaOseba') {
//            $.ajax({
//                url:  '../rest/popa/'  + this.model.get('popa') + '/osebe/'  + this.model.get('oseba'),
//                method: 'PUT',
//                mimeType: 'application/json',
//                success: function (data, textStatus, jqXHR) {
//                    
//                },
//                error: function (jqXHR, textStatus, errorThrown) {
//                    console.log(errorThrown);
//                }
//            });
//        }
    };

    return OsebaView;
});