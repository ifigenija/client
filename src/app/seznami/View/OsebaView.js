/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './OsebaEditView',
    '../Model/Oseba',
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
        title: i18next.t('seznami.oseba.title'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.ime'),
                name: 'ime',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.priimek'),
                name: 'priimek',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.email'),
                name: 'email',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.psevdonim'),
                name: 'psevdonim',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.funkcija'),
                name: 'funkcija',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });
    
//        var chLovro = Radio.channel('global');
//        var response = chLovro.request('isGranted', "halo");
//        console.log("Oseba "+ response);

    OsebaView.prototype.getFormView = function (model) {
        if (model.get('id')) {
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
    };

    return OsebaView;
});