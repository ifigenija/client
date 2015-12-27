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
    'template!../tpl/vzporednice.tpl',
    '../Model/PlanFun',
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
        vzporedniceTpl,
        PlanFun,
        $
        ) {
    var VzporedniceView = Marionette.LayoutView.extend({
        className: 'vzporednice',
        template: vzporedniceTpl,
        regions: {
            uprizoritveR: '.region-uprizoritve',
            vzporedniceR: '.region-vzporednice',
            osebeR: '.region-osebe',
            prekrivanjeR: '.region-prekrivanja'
        }
    });

    VzporedniceView.prototype.initialize = function (options) {
        this.vzpUprColl = new Backbone.Collection();
        if (options && options.model) {
            this.model = options.model;
        } else {
            //napaka
        }
    };
    VzporedniceView.prototype.onRender = function () {
        this.renderUprizoritve();
        this.renderVzporednice();
        this.renderOsebe();
//        this.renderPrekrivanja();
    };
    VzporedniceView.prototype.renderUprizoritve = function () {
        var view = this.uprizoritveView = new VzpUprView({
            collection: this.vzpUprColl
        });
        this.uprizoritveR.show(view);
    };

    VzporedniceView.prototype.renderVzporednice = function () {
        var self = this;

        var success = function (data) {
            var coll = new Backbone.Collection(data);
            var view = new SelectVzporedniceView({
                collection: coll
            });
            view.on('selected', self.onSelected,self);
            self.vzporedniceR.show(view);
        };

        var error = function (error) {
            console.log(error.message);
        };

        var upr = this.vzpUprColl.pluck('id');
        upr.push(this.model.get('id'));

        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/vzporednice'});
        rpc.call('vzporednice', {
            'uprizoritveIds': upr
        }, success, error);
    };

    VzporedniceView.prototype.renderPrekrivanja = function () {
        var self = this;

        var success = function (data) {
            var coll = new Backbone.Collection(data);
            var SVV = SelectVzporedniceView.extend({
                onChildviewSelected: function (child) {}
            });
            var view = new SVV({
                collection: coll
            });
            self.vzporedniceR.show(view);
        };

        var error = function () {
            console.log(error.message);
        };

        var upr = this.vzpUprColl.pluck('id');
        upr.push(this.model.get('id'));

        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/vzporednice'});
        rpc.call('prekrivanja', {
            'uprizoritveIds': upr
        }, success, error);
    };
    VzporedniceView.prototype.renderOsebe = function () {
        var planirane = new PlanFun({
            uprizoritevId: this.model.get('id')
        });
        var self = this;
        planirane.fetch({
            success: function () {
                var view = new SelectSodelujociView({
                    collection: planirane
                });
                view.on('selected',self.onSelected,self);
                self.osebeR.show(view);
            }
        });
    };

    VzporedniceView.prototype.onSelected = function (model) {
        this.vzpUprColl.add(model);
        var uprIDji = this.vzpUprColl.pluck('id');

        this.renderVzporednice();
        this.renderOsebe();
        this.renderUprizoritve();
//        this.renderPrekrivanje();
    };

    return VzporedniceView;
});