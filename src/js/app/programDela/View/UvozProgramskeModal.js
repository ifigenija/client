/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone-modal',
    'app/Max/Module/Backgrid',
    'underscore',
    'jquery',
    'jquery.jsonrpc',
    'backgrid-select-all'
], function (
        Radio,
        i18next,
        Modal,
        Backgrid,
        _,
        $
        ) {

    /**
     * @param {type} options.model
     * @returns {unresolved}
     */
    return function (options) {

        var gridView = new Backgrid.Grid({
            columns: options.columns,
            collection: options.collection
        });

        var modal = new Modal({
            title: i18next.t('std.uvoz'),
            content: gridView,
            animate: true,
            okText: i18next.t('std.potrdi'),
            cancelText: i18next.t("std.preklici")
        });

        var uvozi = function () {
            var models = gridView.getSelectedModels();
            var ids = [];
            _.each(models, function (x) {
                ids.push(x.get('id'));
            });
                
            var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/programDela/programDela'});
            rpc.call('uvozi', {
                'programDelaId': options.programDelaId,
                'srcIds': ids
            },
            function () {
                Radio.channel('error').command('flash', {
                    'code': '3000999',
                    'message': 'Uvoz uspešen',
                    'severity': 'success',
                });
                modal.close();
            },
            Radio.channel('error').request('handler', 'xhr'));
        };

        return modal.open(uvozi);
    };
});


