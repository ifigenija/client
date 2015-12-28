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
        vzporedniceTpl,
        PlanFun,
        $
        ) {
    var VzporedniceView = Marionette.LayoutView.extend({
        className: 'vzporednice',
        template: vzporedniceTpl,
        regions: {
            vzporedniceR: '.region-vzporednice',
            osebeR: '.region-osebe',
            prekrivanjeR: '.region-prekrivanja'
        }
    });

    VzporedniceView.prototype.initialize = function (options) {
        this.collectionUprizoritev = new Backbone.Collection();
        this.collectionUprizoritev.on('remove', this.uprizoritevRemove, this);
        this.collectionUprizoritev.on('add', this.uprizoritevAdd, this);
        
        //nezadovoljen z rešitvijo
        this.model.set('label',this.model.get('naslov'));
        this.collectionUprizoritev.add(this.model);
        
        if (options && options.model) {
            this.model = options.model;
        } else {
            //napaka
        }
    };
    VzporedniceView.prototype.uprizoritevRemove = function (model) {
        this.renderOsebe();
        this.renderVzporednice();
        this.renderPrekrivanja();
    };
    VzporedniceView.prototype.uprizoritevAdd = function (model) {
        var planirane = new PlanFun();
        planirane.queryParams.uprizoritev = model.get('id');
        
        var self = this;
        planirane.fetch({
            success: function () {
                model.set('funkcije', planirane.models);
                self.renderOsebe();
                self.renderPrekrivanja();
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });

    };
    VzporedniceView.prototype.onRender = function () {
        this.renderVzporednice();
        this.renderOsebe();
        this.renderPrekrivanja();
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
            console.log(error);
        };

        var upr = this.collectionUprizoritev.pluck('id');
        upr.push(this.model.get('id'));

        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/vzporednice'});
        rpc.call('dajVzporednice', {
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
                collection: coll,
                title: i18next.t('prekrivanja.title')
            });
            self.prekrivanjeR.show(view);
        };

        var error = function (error) {
            console.log(error);
        };

        var upr = this.collectionUprizoritev.pluck('id');
        upr.push(this.model.get('id'));

        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/vzporednice'});
        rpc.call('dajPrekrivanja', {
            'uprizoritveIds': upr
        }, success, error);
    };
    VzporedniceView.prototype.renderOsebe = function () {

        var view = new SelectSodelujociView({
            collection: this.collectionUprizoritev
        });
        this.osebeR.show(view);
    };

    VzporedniceView.prototype.onSelected = function (model) {
        this.collectionUprizoritev.add(model);

        this.renderVzporednice();
        this.renderOsebe();
//        this.renderPrekrivanje();
    };

    return VzporedniceView;
});