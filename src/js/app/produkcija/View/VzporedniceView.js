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
        var self = this;

        this.vzpUprColl = new Backbone.Collection();
        this.collectionFunkcij = new Backbone.Collection();
//        this.vzpUprColl.on('remove', this.uprizoritevRemove, this);
//        this.vzpUprColl.on('add', this.uprizoritevAdd, this);
//        this.vzpUprColl.on('reset', function(){
//            self.collectionFunkcij.reset();
//        }, this);
        if (options && options.model) {
            this.model = options.model;
        } else {
            //napaka
        }
    };
    VzporedniceView.prototype.uprizoritevRemove = function (model) {
        var model = this.collectionFunkcij.findWhere({
            uprID: model.get('id')
        });
        this.collectionFunkcij.remove(model);
        this.renderOsebe();
    };
    VzporedniceView.prototype.uprizoritevAdd = function (model) {
        var planirane = new PlanFun({
            uprizoritevId: model.get('id')
        });
        var self = this;
        planirane.fetch({
            success: function () {
                self.collectionFunkcij.add({
                    uprID: model.get('id'),
                    funkcije: planirane
                });
                self.renderOsebe();
            }
        });

    };
    VzporedniceView.prototype.onRender = function () {
        this.renderUprizoritve();
        this.renderVzporednice();
//        this.renderOsebe();
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
            view.on('selected', self.onSelected, self);
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
                onChildviewSelected: function (child) {
                }
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

        var view = new SelectSodelujociView({
            collection: this.collectionFunkcij
        });
        this.osebeR.show(view);
    };

    VzporedniceView.prototype.onSelected = function (model) {
        this.vzpUprColl.add(model);

        this.renderVzporednice();
        this.renderUprizoritve();
//        this.renderPrekrivanje();
    };

    return VzporedniceView;
});