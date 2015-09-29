/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/postavkaCDve-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!postavkaCDve',
    'radio',
    'jquery',
    'jquery.jsonrpc'
], function (
        Backgrid,
        i18next,
        PostavkeView,
        formTpl,
        ZapisiLayout,
        schema,
        Radio,
        $
        ) {

    var PostavkaCDveView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'postavkeC2',
        formTitle: i18next.t('postavkaCdve.title'),
        disabled: false,
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('postavkaCdve.t.naziv'),
                name: 'naziv',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrPremiere'),
                name: 'vrPremiere',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrPonovitvePremier'),
                name: 'vrPonovitvePremier',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrPonovitvePrejsnjih'),
                name: 'vrPonovitvePrejsnjih',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: true,
                label: i18next.t('postavkaCdve.t.vrFestivali'),
                name: 'vrFestivali',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrGostovanjaZamejstvo'),
                name: 'vrGostovanjaZamejstvo',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: true,
                label: i18next.t('postavkaCdve.t.vrGostovanjaInt'),
                name: 'vrGostovanjaInt',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: true,
                label: i18next.t('postavkaCdve.t.vrOstalo'),
                name: 'vrOstalo',
                total: 'sum',
                sortable: false
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrSkupaj'),
                name: 'skupaj',
                total: 'sum',
                sortable: false
            }
        ]
    });

    PostavkaCDveView.prototype.initialize = function () {

        this.collection.comparator = function (a, b) {
            var sa = a.get('skupina');
            var sb = b.get('skupina');
            var psa = a.get('podskupina');
            var psb = b.get('podskupina');

            if (sa === sb) {
                return (psa < psb) ? -1 : (psa > psb) ? 1 : 0;
            } else {
                return (sa < sb) ? -1 : 1;
            }
        };

        if (this.collection.length === 0) {
            var self = this;
            var success = function () {
                self.collection.fetch({
                    success: self.collection.sort,
                    error: Radio.channel('error').request('handler', 'xhr')
                });
            };

            var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/programDela/programDela'});
            rpc.call('osveziTabeloC2', {
                'programDelaId': this.dokument.get('id')
            },
            success,
            Radio.channel('error').request('handler', 'xhr'));
        }
        
        this.collection.sort();

        this.listenTo(this.collection, "backgrid:edited", function (model, schema, command) {
            var self = this;
            if (!command.cancel()) {
                if (model.changedAttributes() || _.isObject(schema.get('optionValues'))) {
                    model.preracunajSkupaj();
                    model.save({}, {
                        success: function (model) {
                            self.triggerMethod('save:success', model);
                            Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                        },
                        error: Radio.channel('error').request('handler', 'xhr')
                    });
                }
            }

        });
    };

    PostavkaCDveView.prototype.renderList = function () {
        var Povdarjena = Backgrid.Row.extend({
            /**
             Renders a row of cells for this row's model.
             */
            render: function () {
                Backgrid.Row.prototype.render.apply(this, arguments);

                if (this.model.get('podskupina') === 0) {
                    this.$el.addClass('povdarjena-vrstica');
                }

                return this;
            }
        });

        var grid = new Backgrid.Grid({
            collection: this.collection,
            row: Povdarjena,
            columns: this.gridMeta
        });
        this.regionList.show(grid);
        return grid;
    };


    PostavkaCDveView.prototype.prepareToolbar = function () {
        return null;
    };

    PostavkaCDveView.prototype.onUredi = function () {

    };

    PostavkaCDveView.prototype.onSelected = function () {

    };

    return PostavkaCDveView;
});