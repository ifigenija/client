/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/koprodukcija-form.tpl',
    'formSchema!produkcijaDelitev',
    'jquery',
    'jquery.jsonrpc'
], function (
        Backgrid,
        i18next,
        PostavkeView,
        formTpl,
        schema,
        $
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });
    var KoprodukcijaView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'koprodukcije',
        formTitle: i18next.t('prodel.title'),
        gridMeta: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('prodel.koproducent'),
                name: 'naziv',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.zaproseno'),
                name: 'zaproseno',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('prodel.delez'),
                name: 'delez',
                total: 'sum',
                sortable: true
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

    KoprodukcijaView.prototype.onShrani = function () {
        var self = this;

        var success = function () {

        };

        var error = function () {

        };

        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/programDela/enotaPrograma'});
        rpc.call('novaMaticnaKoprodukcija', {
            'enotaProgramaId': self.model.id
        }, success
                , error);
        PostavkeView.prototype.onShrani.apply(this.argument);
    };

    return KoprodukcijaView;
});