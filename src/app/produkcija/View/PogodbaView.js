/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/PostavkeView',
    'template!../tpl/pogodba-form.tpl',
    'formSchema!pogodba',
    'i18next',
    'app/Max/Module/Backgrid',
    'radio',
    'baseUrl',
    'backbone'
], function (
        PostavkeView,
        formTpl,
        schema,
        i18next,
        Backgrid,
        Radio,
        baseUrl,
        Backbone
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });

    var PogodbaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        title: i18next.t('pogodba.title'),
        detailName: 'pogodbe',
        formTitle: i18next.t('pogodba.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.stevilka'),
                name: 'sifra',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('pogodba.popa'),
                name: 'popa.label',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.oseba'),
                name: 'oseba.label',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('pogodba.vrednostPredstave'),
                name: 'vrednostPredstave',
                sortable: true,
                total: 'sum'

            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('pogodba.vrednostUre'),
                name: 'vrednostUre',
                sortable: true,
                total: 'sum'

            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.opis'),
                name: 'opis',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')}
                ]
            }
        ]
    });

    PogodbaView.prototype.prepareToolbar = function () {
        return  this.model ?
                [[this.buttons.shrani, this.buttons.preklici, this.buttons.nasvet]] : [[]];

    };

    PostavkeView.prototype.onDodaj = function () {
        this.model = this.dokument.dodajPogodbo();
        this.triggerMethod('get:defaults', this.model);
        this.renderFormAndToolbar();
    };

    PogodbaView.prototype.initialize = function () {
        var self = this;
        Radio.channel('layout').comply('odpriModel', function (id) {
            var PogodbaModel = Backbone.Model.extend({
                urlRoot: baseUrl + '/rest/pogodba'
            });

            var model = new PogodbaModel({id: id});
            model.once('sync', function () {
                self.triggerMethod('uredi', model);
            });
            model.fetch();
        });
    };

    return PogodbaView;
});