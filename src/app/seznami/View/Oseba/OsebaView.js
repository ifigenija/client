/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './OsebaEditView',
    '../../Model/Oseba',
    'i18next',
    'baseUrl',
    'radio'
], function (
        SeznamiView,
        OsebaEditView,
        Oseba,
        i18next,
        baseUrl,
        Radio
        ) {

    var OsebaView = SeznamiView.extend({
        url: baseUrl + '/rest/oseba',
        title: i18next.t('seznami.view.oseba.title'),
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
                label: i18next.t('seznami.view.oseba.funkcija'),
                name: 'funkcija',
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
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('seznami.view.brisi')}
                ]
            }
        ],
    });
    
//        var chLovro = Radio.channel('global');
//        var response = chLovro.request('isGranted', "halo");
//        console.log("Oseba "+ response);

    OsebaView.prototype.getFormView = function (model) {
        if (!model.get('id')) {
            var editModel = new Oseba.Model({id: model.get('id')});
            editModel.fetch();
        } else {
            editModel = model;
        }
        return new OsebaEditView({
            model: editModel,
            pogled: this.options.pogled
        });

    };

    OsebaView.prototype.onDodaj = function () {
        var model = new Oseba.Model();
        this.onSelected(model);
    };

    OsebaView.prototype.dodajVcollection = function (model) {

        this.collection.add(model);
        
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