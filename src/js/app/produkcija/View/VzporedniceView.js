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
    'app/koledar/Model/Vzporednice',
    'app/koledar/Model/Zasedbe',
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
        Vzporednice,
        Zasedbe,
        $
        ) {
    var VzporedniceView = Marionette.LayoutView.extend({
        //className: 'vzporednice',
        template: vzporedniceTpl,
        regions: {
            vzporedniceR: '.region-vzporednice',
            zasedbaR: '.region-zasedba',
            prekrivanjaR: '.region-prekrivanja'
        }
    });

    /**
     * inicializacija collectiona Uprizoritev
     * V kolekcijo dodamo uprizoritev, ki jo trenutno gledamo
     * @param {type} options
     * @returns {undefined}
     */
    VzporedniceView.prototype.initialize = function (options) {
        this.collectionUprizoritev = new Zasedbe();
        this.collectionUprizoritev.on('remove', this.update, this);
        this.collectionUprizoritev.on('added', this.update, this);

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
    
    VzporedniceView.prototype.update = function () {
        this.renderVzporednice();
        this.renderPrekrivanja();
    };

    VzporedniceView.prototype.onRender = function () {
        this.renderVzporednice();
        this.renderZasedba();
        this.renderPrekrivanja();
    };

    /**
     * RPC klic za vzporednice
     * 
     * @param {Object} options
     *        {Array} options.uprizoritev: Polje idjev uprizoritev, od katerih želimo vzporednice
     *                                      [uprid, uprid, uprid]
     *        {Array} options.alternacije: [{funkcijaid:[osebaid, osebaid]},
     *                                      {funkcijaid:[osebaid, osebaid]}]
     *        {Function} options.success: funkcija, ki se kliče ob uspešnej RPC klicu
     *        {Function} options.error: funkcija, ki se kliče ob neuspešnem RPC klicu
     * @returns {undefined}
     */
    VzporedniceView.prototype.rpcDajVzporednice = function (options) {
        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/vzporednice'});
        rpc.call('dajVzporednice', {
            'uprizoritveIds': options.uprizoritve,
            'alternacije': options.alternacije
        }, options.success, options.error);
    };

    /**
     * Enako kot pri zgornji funkciji
     * @param {type} options
     * @returns {undefined}
     */
    VzporedniceView.prototype.rpcDajPrekrivanja = function (options) {
        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/koledar/vzporednice'});
        rpc.call('dajPrekrivanja', {
            'uprizoritveIds': options.uprizoritve,
            'alternacije': options.alternacije
        }, options.success, options.error);
    };
    
    VzporedniceView.prototype.renderVzporednice = function () {
        var self = this;

        //Ob uspešno izvedenem RPC klicu se renderirajo vzporednice
        var success = function (data) {
            //podatke od rpc responsa pretvorimo v kolekcijo
            var coll = new Vzporednice(data.data);
            var view = new SelectVzporedniceView({
                collection: coll,
                class: 'vzporednice'
            });
            view.on('selected', self.onSelected, self);
            self.vzporedniceR.show(view);
            
            var error = data.error;
            
            if(error){
                
            }
        };

        var error = function (error) {
            console.log(error);
        };

        var upr = this.collectionUprizoritev.pluck('id');
        var alternacije = this.collectionUprizoritev.vrniIzbraneOsebe();

        this.rpcDajVzporednice({
            uprizoritve: upr,
            alternacije: alternacije,
            success: success,
            error: error
        });
    };
    
    VzporedniceView.prototype.renderPrekrivanja = function () {
        var self = this;

        //Ob uspešno izvedenem RPC klicu se renderirajo vzporednice
        var success = function (data) {
            //podatke od rpc responsa pretvorimo v kolekcijo
            var coll = new Vzporednice(data.data);
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
        var alternacije = this.collectionUprizoritev.vrniIzbraneOsebe();

        this.rpcDajPrekrivanja({
            uprizoritve: upr,
            alternacije: alternacije,
            success: success,
            error: error
        });
    };

    VzporedniceView.prototype.renderZasedba = function () {

        var view = new ZasedbaView({
            collection: this.collectionUprizoritev
        });
        view.on('change', this.onChange, this);
        this.zasedbaR.show(view);
    };

    VzporedniceView.prototype.onSelected = function (model) {
        this.collectionUprizoritev.add(model);
    };
    VzporedniceView.prototype.onChange = function () {
        this.renderPrekrivanja();
        this.renderVzporednice();
    };

    return VzporedniceView;
});