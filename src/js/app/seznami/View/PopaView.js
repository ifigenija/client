/* 
 * Licenca GPLv3
 */
define([
    'app/seznami/View/SeznamView',
    './PopaEditView',
    '../Model/Popa',
    'i18next',
    'baseUrl',
    'radio',
    'formSchema!popa',
    'app/Max/Module/Backgrid'
], function (
        SeznamView,
        PopaEditView,
        Model,
        i18next,
        baseUrl,
        Radio,
        schema,
        Backgrid
        ) {

    var PopaView = SeznamView.extend({
        url: baseUrl + '/rest/popa',
        title: i18next.t('popa.title'),
        odprtaForma: true,
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
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('stakli')
                }),
                editable: false,
                label: i18next.t('popa.stakli'),
                name: 'stakli',
                sortable: false
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
                label: i18next.t('popa.idddv'),
                name: 'idddv',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'uredi', title: i18next.t('std.uredi')},
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
                error: Radio.channel('error').request('handler', 'xhr')
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