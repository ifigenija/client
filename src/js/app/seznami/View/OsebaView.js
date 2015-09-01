/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    './OsebaEditView',
    '../Model/Oseba',
    'i18next',
    'baseUrl',
    'radio'
], function (
        SeznamView,
        OsebaEditView,
        Model,
        i18next,
        baseUrl,
        Radio
        ) {

    var OsebaView = SeznamView.extend({
        url: baseUrl + '/rest/oseba',
        title: i18next.t('oseba.title'),
        odprtaForma: true,
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('oseba.ime'),
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
                label: i18next.t('oseba.email'),
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
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });

    var chPermission = Radio.channel('global');
    var dovoljeno = chPermission.request('isGranted', "oseba-read");
    console.log("Oseba-read:" + dovoljeno);

    /**
     * Overridana funkcija iz seznamaView
     * @param {type} model
     * @returns {OsebaView_L11.OsebaEditView}
     */
    OsebaView.prototype.getFormView = function (model) {
        var editModel = model;

        if (model.get('id')) {
            editModel = new Model.Model({id: model.get('id')});
            editModel.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
        return new OsebaEditView({
            model: editModel,
            pogled: this.options.pogled
        });

    };

    OsebaView.prototype.onDodaj = function () {
            var model = new Model.Model();
            this.onSelected(model);
            this.zapSortSt(this.collection, 'sort');
    };

    return OsebaView;
});