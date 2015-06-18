/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    './PopaEditView',
    '../Model/Popa',
    'i18next',
    'baseUrl'
], function (
        SeznamView,
        PopaEditView,
        Popa,
        i18next,
        baseUrl
        ) {

    var PopaView = SeznamView.extend({
        url: baseUrl + '/rest/popa',
        title: i18next.t('popa.title'),
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
                label: i18next.t('entiteta.naziv'),
                name: 'naziv',
                sortable: true
            },            
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.email'),
                name: 'email',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('popa.url'),
                name: 'url',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('popa.panoga'),
                name: 'panoga',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('entiteta.brisi')}
                ]
            }
        ]
    });

    /**
     * 
     */
    PopaView.prototype.getFormView = function (model) {
        var editModel = model;
        
        if (model.get('id')) {
            editModel = new Popa.Model({id: model.get('id')});
            editModel.fetch();
        }
        return new PopaEditView({
            model: editModel,
            pogled: this.options.pogled
        });

    };

    PopaView.prototype.onDodaj = function () {
        var model = new Popa.Model();
        this.onSelected(model);
    };


    PopaView.prototype.dodajVcollection = function (model) {

        this.collection.add(model);

    };

    return PopaView;
});