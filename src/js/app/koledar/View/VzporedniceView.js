/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'baseUrl',
    'i18next',
    'app/bars',
    'backbone',
    'moment',
    'marionette',
    'underscore',
    'app/koledar/View/PrekrivanjaView',
    'app/koledar/View/SelectVzporedniceView',
    'app/koledar/View/ZasedbaView',
    'template!../tpl/vzporednice.tpl',
    'app/koledar/Model/Vzporednice',
    'app/koledar/Model/Zasedbe',
    'template!app/koledar/tpl/opozorila.tpl',
    'jquery',
    'jquery.jsonrpc'
], function (
        Radio,
        baseUrl,
        i18next,
        Handlebars,
        Backbone,
        moment,
        Marionette,
        _,
        PrekrivanjaView,
        SelectVzporedniceView,
        ZasedbaView,
        vzporedniceTpl,
        Vzporednice,
        Zasedbe,
        opozorilaTpl,
        $
        ) {
    /**
     * Prikaz prekrivanj alternacij med posameznimi uprizoritvami
     * @type @exp;Marionette@pro;ItemView@call;extend
     */
    var OpozoriloView = Marionette.ItemView.extend({
        template: opozorilaTpl
    });

    var VzporedniceView = Marionette.LayoutView.extend({
        template: vzporedniceTpl,
        regions: {
            vzporedniceR: '.region-vzporednice',
            zasedbaR: '.region-zasedba',
            prekrivanjaR: '.region-prekrivanja',
            opozorilaR: '.region-opozorila'
        },
        triggers: {
            'click .prikazi-prekrivanja': 'prikazi:prekrivanja'
        }
    });

    /**
     * inicializacija collectiona Uprizoritev
     * V kolekcijo dodamo uprizoritev, ki jo trenutno gledamo
     * @param {Object} options
     * @param {Model} options.uprizoritev pošljemo lookup model uprizoritve
     * @param {moment} options.zacetek
     * @param {moment} options.konec
     * @returns {undefined}
     */
    VzporedniceView.prototype.initialize = function (options) {
        this.collectionUprizoritev = new Zasedbe();
        this.collectionUprizoritev.on('remove', this.update, this);
        this.collectionUprizoritev.on('added', this.update, this);

        if (options && options.uprizoritev) {
            this.collectionUprizoritev.add(options.uprizoritev);
        }

        if (options && options.zacetek) {
            this.zacetek = moment(options.zacetek).toISOString();
        }

        if (options && options.konec) {
            this.konec = moment(options.konec).toISOString();
        }
    };

    /**
     * Se izvede ob kliku na gumb za prikaz prekrivanja
     * @returns {undefined}
     */
    VzporedniceView.prototype.onPrikaziPrekrivanja = function () {
        this.renderPrekrivanja();
        this.$('.prikazi-prekrivanja').addClass('hidden');
    };

    /**
     * Funkcija se kliče ko se v kolekcijo uprizoritev doda ali odstrani uprizoritev
     * @returns {undefined}
     */
    VzporedniceView.prototype.update = function () {
        this.renderVzporednice();
        if (this.$('.prikazi-prekrivanja').hasClass('hidden')) {
            this.$('.prikazi-prekrivanja').removeClass('hidden');
        }
    };

    VzporedniceView.prototype.onRender = function () {
        this.renderVzporednice();
        this.renderZasedba();
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
            'alternacije': options.alternacije,
            'zacetek': options.zacetek || null,
            'konec': options.konec || null
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
            'alternacije': options.alternacije,
            'zacetek': options.zacetek || null,
            'konec': options.konec || null
        }, options.success, options.error);
    };

    /**
     * Izris vzporednic
     * @returns {undefined}
     */
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
            self.prekrivanjaR.empty();

            var error = data.error;

            if (error.length) {
                //iz objekta napak naredimo model za lažji prikaz podatkov
                //izris opozoril
                var model = new Backbone.Model({
                    opozorila: error
                });
                var opozoriloView = new OpozoriloView({
                    model: model
                });

                self.opozorilaR.show(opozoriloView);
            } else {
                //v primeru da ni prekrivanj se opozorila skrijejo
                self.opozorilaR.empty();
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
            zacetek: this.zacetek,
            konec: this.konec,
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
            zacetek: this.zacetek,
            konec: this.konec,
            success: success,
            error: error
        });
    };

    /**
     * izris zasedb posameznih uprizoritev iz kolekcije uprizoritev
     * @returns {undefined}
     */
    VzporedniceView.prototype.renderZasedba = function () {
        var view = new ZasedbaView({
            collection: this.collectionUprizoritev
        });
        view.on('change', this.onChange, this);
        this.zasedbaR.show(view);
    };

    /**
     * Funkcija se kliče, ko vzporedniceview/prekrivanjaView prožijo select oz takrak ko izberemo uprizoritev
     * @param {type} model
     * @returns {undefined}
     */
    VzporedniceView.prototype.onSelected = function (model) {
        this.collectionUprizoritev.add(model);
        this.$('.prikazi-prekrivanja').removeClass('hidden');
    };
    /**
     * Funkcija se kliče, ko se v ZasedbaView sproži change ko izberemo drugo alternacijo
     * @param {type} model
     * @returns {undefined}
     */
    VzporedniceView.prototype.onChange = function () {
        this.renderVzporednice();
        this.$('.prikazi-prekrivanja').removeClass('hidden');
    };

    return VzporedniceView;
});