/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'app/programDela/View/DrugiVirView',
    'template!../tpl/premiera-form.tpl',
    'formSchema!programPremiera',
    'app/programDela/Model/DrugiVir'
], function (
        Backgrid,
        i18next,
        PostavkeView,
        DrugiVirView,
        formTpl,
        schema,
        DrugiVir
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });
    var PremieraView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: 'Premiera',
        detailName: 'premiere',
        formTitle: i18next.t('premiera.title'),
        regions: {
            drugiViriR: '.region-drugiViri'
        },
        gridMeta: [
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('entiteta.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.uprizoritev'),
                name: 'uprizoritev.label',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('tipProgramskeEnote')
                }),
                editable: false,
                label: i18next.t('ep.t.tipProgramskeEnote'),
                name: 'tipProgramskeEnote',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.t.celotnaVrednost'),
                name: 'celotnaVrednost',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.zaproseno'),
                name: 'zaproseno',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.t.lastnaSredstva'),
                name: 'lastnaSredstva',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.t.avtorskiHonorarji'),
                name: 'avtorskiHonorarji',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.tantieme'),
                name: 'tantieme',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.t.drugiJavni'),
                name: 'drugiJavni',
                total: 'sum',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('entiteta.brisi')},
                    {event: 'uredi', title: i18next.t('entiteta.uredi')}
                ]
            }
        ]
    });

    PremieraView.prototype.onRenderForm = function (form) {
        if (!this.isNew()) {
            this.renderDrugiViri();
        }
    };

    PremieraView.prototype.renderDrugiViri = function () {

//        var coll = new DrugiVir.Collection();
//        var self = this;
//        coll.fetch({
//            success: function () {
//                var drugiVirView = new DrugiVirView({
//                    collection: coll,
//                    dokument: self.model
//                });
//                self.drugiViriR.show(drugiVirView);
//            }
//        });
        var drugiVirView = new DrugiVirView({
            collection: this.drugiViriCollection,
            dokument: this
        });
        this.drugiViriR.show(drugiVirView);
    };

    return PremieraView;
});