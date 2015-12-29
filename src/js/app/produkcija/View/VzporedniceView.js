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
        PrekrivanjaView,
        SelectVzporedniceView,
        SelectSodelujociView,
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
            prekrivanjeR: '.region-prekrivanja'
        }
    });

    VzporedniceView.prototype.initialize = function (options) {
        this.collectionUprizoritev = new Backbone.Collection();
        this.collectionUprizoritev.on('remove', this.uprizoritevRemove, this);
        this.collectionUprizoritev.on('add', this.uprizoritevAdd, this);
        
        //nezadovoljen z rešitvijo
        this.model.set('label',this.model.get('naslov'));
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
            alternacije:[],
            success:success,
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
    

    VzporedniceView.prototype.rpcDajPrekrivanje = function (options) {
        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/vzporednice'});
        rpc.call('dajPrekrivanja', {
            'uprizoritveIds': options.uprizoritve,
            'alternacije': options.alternacije
        }, options.success, options.error);
    };
    
    VzporedniceView.prototype.renderPrekrivanja = function () {
        var self = this;

        var success = function (data) {
            var coll = new Backbone.Collection(data.data);
            var view = new PrekrivanjaView({
                collection: coll,
                title: i18next.t('prekrivanja.title'),
                class: 'prekrivanje'
            });
            self.prekrivanjeR.show(view);
        };

        var error = function (error) {
            console.log(error);
        };

        var upr = this.collectionUprizoritev.pluck('id');
        
        this.rpcDajPrekrivanje({
            uprizoritve: upr,
            alternacije:[],
            success:success,
            error: error
        });
    };
    VzporedniceView.prototype.renderOsebe = function () {

        var view = new SelectSodelujociView({
            collection: this.collectionUprizoritev
        });
        view.on('change', this.onChange, this);
        this.osebeR.show(view);
    };

    VzporedniceView.prototype.onSelected = function (model) {
        this.collectionUprizoritev.add(model);

        this.renderVzporednice(); 
        this.renderOsebe();
        this.renderPrekrivanje();
    };
    VzporedniceView.prototype.onChange = function (izbraneOsebe) {        
        var self = this;

        var success = function (data) {
            var coll = new Backbone.Collection(data.data);
            var view = new SelectVzporedniceView({
                collection: coll,
                class: 'prekrivanja'
            });
            view.on('selected', self.onSelected, self);
            self.prekrivanjaR.show(view);
        };

        var error = function (error) {
            console.log(error);
        };

        this.rpcDajPrekrivanje({
            uprizoritve: [],
            alternacije:izbraneOsebe,
            success:success,
            error: error
        });
    };

    return VzporedniceView;
});