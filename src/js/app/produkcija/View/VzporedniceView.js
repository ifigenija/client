/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'baseUrl',
    'i18next',
    'backbone',
    'marionette',
    'underscore',
    'app/koledar/View/SelectVzporedniceView',
    'app/koledar/View/SelectSodelujociView',
    './VzpUprView',
    'jquery',
    'jquery.jsonrpc'
], function (
        Radio,
        baseUrl,
        i18next,
        Backbone,
        Marionette,
        _,
        SelectVzporedniceView,
        SelectSodelujociView,
        VzpUprView,
        $
        ) {
    var VzporedniceView = Marionette.LayoutView.extend({
        className: 'vzporednice',
        template: '',
        regions: {
            uprizoritveR: 'region-uprizoritve',
            vzporedniceR: 'region-vzporednice',
            osebeR: 'region-osebe',
            prekrivanjeR: 'region-prekrivanja'
        }
    });
    
    VzporedniceView.prototype.initialize = function (options) {
        this.vzpUprColl = new Backbone.Collection();
    };
    VzporedniceView.prototype.render = function () {
        this.renderUprizoritve();
        this.renderVzporednice();
        this.renderOsebe();
        this.renderprekrivanja();
    };
    VzporedniceView.prototype.renderUprizoritve = function () {
        var view = this.uprizoritveView = new VzpUprView({
            collection: this.vzpUprColl
        });
        this.uprizoritver.show(view);
    };
    
    VzporedniceView.prototype.rpcVzporednice = function (options) {
        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/uprizoritev'});
        rpc.call('vzporednice', {
            'uprizoritve': options.uprizoritve,
            'funkcije': options.funkcije
        }, this.rpcSuccess, this.rpcError);
    };
    
    VzporedniceView.prototype.posodobiVzporednice = function () {
        
    };
    
    VzporedniceView.prototype.onSelected = function (model) {
        this.vzpUprColl.add(model);        
        var uprIDji = this.vzpUprColl.pluck('id');
        
        this.rpcVzporednice({
            uprizoritve: uprIDji,
            funkcije: []
        });
        
        this.renderUprizoritve();
    };
    VzporedniceView.prototype.posodobiOsebe = function () {
        
    };
    VzporedniceView.prototype.posodobiPrekrivanja = function () {
        
    };

    return VzporedniceView;
});