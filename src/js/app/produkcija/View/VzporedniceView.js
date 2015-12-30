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
    'app/koledar/View/PrekrivanjaView',
    'app/koledar/View/SelectVzporedniceView',
    'app/koledar/View/ZasedbaView',
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
        PrekrivanjaView,
        SelectVzporedniceView,
        ZasedbaView,
        vzporedniceTpl,
        PlanFun,
        $
        ) {
    var VzporedniceView = Marionette.LayoutView.extend({
        //className: 'vzporednice',
        template: vzporedniceTpl,
        regions: {
            vzporedniceR: '.region-vzporednice',
            osebeR: '.region-osebe',
            prekrivanjaR: '.region-prekrivanja'
        }
    });

    VzporedniceView.prototype.initialize = function (options) {
        this.collectionUprizoritev = new Backbone.Collection();
        this.collectionUprizoritev.on('remove', this.uprizoritevRemove, this);
        this.collectionUprizoritev.on('add', this.uprizoritevAdd, this);

        //nezadovoljen z rešitvijo
        this.model.set('label', this.model.get('naslov'));
        this.model.set('neBrisi', true);
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
                self.renderVzporednice();
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

    VzporedniceView.prototype.renderVzporednice = function (izbraneOsebe) {
        var self = this;

        var success = function (data) {
            var coll = new Backbone.Collection(data.data);
            var view = new SelectVzporedniceView({
                collection: coll,
                class: 'vzporednice'
            });
            view.on('selected', self.onSelected, self);
            self.vzporedniceR.show(view);
        };

        var error = function (error) {
            console.log(error);
        };

        var upr = this.collectionUprizoritev.pluck('id');

        this.rpcDajVzporednice({
            uprizoritve: upr,
            alternacije: izbraneOsebe ? izbraneOsebe : [],
            success: success,
            error: error
        });
    };
    VzporedniceView.prototype.rpcDajVzporednice = function (options) {
        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/vzporednice'});
        rpc.call('dajVzporednice', {
            'uprizoritveIds': options.uprizoritve,
            'alternacije': options.alternacije
        }, options.success, options.error);
    };


    VzporedniceView.prototype.rpcDajPrekrivanja = function (options) {
        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/vzporednice'});
        rpc.call('dajPrekrivanja', {
            'uprizoritveIds': options.uprizoritve,
            'alternacije': options.alternacije
        }, options.success, options.error);
    };

    VzporedniceView.prototype.renderPrekrivanja = function (izbraneOsebe) {
        var self = this;

        var success = function (data) {
            var coll = new Backbone.Collection(data.data);
            var view = new PrekrivanjaView({
                collection: coll,
                title: i18next.t('prekrivanja.title'),
                class: 'prekrivanja'
            });
            self.prekrivanjaR.show(view);
        };

        var error = function (error) {
            console.log(error);
        };

        var upr = this.collectionUprizoritev.pluck('id');

        this.rpcDajPrekrivanja({
            uprizoritve: upr,
            alternacije: izbraneOsebe ? izbraneOsebe : [],
            success: success,
            error: error
        });
    };
    VzporedniceView.prototype.renderOsebe = function () {

        var view = new ZasedbaView({
            collection: this.collectionUprizoritev
        });
        view.on('change', this.onChange, this);
        this.osebeR.show(view);
    };

    VzporedniceView.prototype.onSelected = function (model) {
        this.collectionUprizoritev.add(model);
    };
    VzporedniceView.prototype.onChange = function (izbraneOsebe) {
        this.renderPrekrivanja(izbraneOsebe);
        this.renderVzporednice(izbraneOsebe);
    };

    return VzporedniceView;
});