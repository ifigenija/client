/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    './PopaEditView',
    '../Model/Popa',
    'i18next',
    'baseUrl',
    'radio'
], function (
        SeznamView,
        PopaEditView,
        Model,
        i18next,
        baseUrl,
        Radio
        ) {

    var PopaView = SeznamView.extend({
        url: baseUrl + '/rest/popa',
        title: i18next.t('popa.title'),
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('popa.sifra'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('popa.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('popa.email'),
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
                    {event: 'brisi', title: i18next.t('std.brisi')}
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
            editModel = new Model.Model({id: model.get('id')});
            editModel.fetch({
                error: function () {
                    Radio.channel('error').command('flash', {
                        message: i18next.t("napaka.fetch") + ' (Popa)',
                        code: '9000204',
                        severity: 'error'
                    });
                }
            });
        }
        return new PopaEditView({
            model: editModel,
            pogled: this.options.pogled
        });

    };

    PopaView.prototype.onDodaj = function () {
        var model = new Model.Model();
        this.onSelected(model);
    };

    return PopaView;
});