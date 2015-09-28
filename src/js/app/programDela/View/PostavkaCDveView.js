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
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrPremiere'),
                name: 'vrPremiere',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrPonovitvePremier'),
                name: 'vrPonovitvePremier',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrPonovitvePrejsnjih'),
                name: 'vrPonovitvePrejsnjih',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrGostovanjaZamejstvo'),
                name: 'vrGostovanjaZamejstvo',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrFestivali'),
                name: 'vrFestivali',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrGostovanjaInt'),
                name: 'vrGostovanjaInt',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: true,
                label: i18next.t('postavkaCdve.t.vrOstalo'),
                name: 'vrOstalo',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('postavkaCdve.t.vrSkupaj'),
                name: 'skupaj',
                total: 'sum',
                sortable: true
            }
        ]
    });

    PostavkaCDveView.prototype.prepareToolbar = function () {
        return  this.model ?
                [
                    [
                        this.buttons.shrani,
                        this.buttons.preklici,
                        this.buttons.nasvet
                    ]
                ] : null;
    };

    PostavkaCDveView.prototype.initialize = function () {
        var success = function () {
        };

        var error = function () {
            Radio.channel('error').command('flash', {
                message: i18next.t("std.neka.napaka"),
                code: '9000700',
                severity: 'error'
            });
        };

        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/programDela/programDela'});
        rpc.call('osveziTabeloC2', {
            'programDelaId': this.dokument.get('id')
        },
        success, error);

        this.listenTo(this.collection, "backgrid:edited", function (model, schema, command) {
            if (!command.cancel()) {
                if (model.changedAttributes() || _.isObject(schema.get('optionValues'))) {
                    model.save({}, {
                        error: Radio.channel('error').request('handler', 'xhr')
                    });
                }
            }

        });
    };
    
    PostavkaCDveView.prototype.onUredi = function () {
        
    };
    
    PostavkaCDveView.prototype.onSelected = function () {
        
    };

    return PostavkaCDveView;
});