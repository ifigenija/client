/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamiView',
    './PopaEditView',
    '../Model/Popa',
    'i18next',
    'baseUrl'
], function (
        SeznamiView,
        PopaEditView,
        Popa,
        i18next,
        baseUrl
        ) {

    var PopaView = SeznamiView.extend({
        url: baseUrl + '/rest/popa',
        title: i18next.t('seznami.view.popa.title'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.sifra'),
                name: 'sifra',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.naziv'),
                name: 'naziv',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('seznami.view.popa.panoga'),
                name: 'panoga',
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
                label: i18next.t('seznami.view.popa.url'),
                name: 'url',
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
        ]
    });

    /**
     * 
     */
    PopaView.prototype.getFormView = function (model) {
        if (model.get('id')) {
            var editModel = new Popa.Model({id: model.get('id')});
            editModel.fetch();
        } else {
            editModel = model;
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