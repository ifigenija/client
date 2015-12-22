/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    './SelectVzporedniceView',
    './SelectSodelujociView',
    'template!../tpl/izbira-upr.tpl',
    'jquery',
    'jquery.jsonrpc'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        SelectVzporedniceView,
        SelectSodelujociView,
        tpl,
        $
        ) {
    var IzbriraUprizoritveView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            uprizoritevR: '.region-uprizoritev',
            vzporedniceR: '.region-vzporednice',
            osebeR: '.region-osebe'
        }
    });

    IzbriraUprizoritveView.prototype.initialize = function (options) {
        if (options && options.model) {
            this.model = options.model;
        }
    };

    IzbriraUprizoritveView.prototype.render = function () {
        this.renderUprizoritev();
        this.renderVzporednice();
        this.renderOsebe();
    };

    IzbriraUprizoritveView.prototype.renderUprizoritev = function () {
    };

    /**
     * uprizoritve polje idjev
     * funkcije polje ključe
     * 
     * @param {type} options
     * @returns {undefined}
     */
    IzbriraUprizoritveView.prototype.rpcVzporednice = function (options) {
        var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/uprizoritev'});
        rpc.call('vzporednice', {
            'uprizoritve': options.uprizoritve,
            'funkcije': options.funkcije,
            'zacetek': options.zacetek,
            'konec': options.konec
        }, this.rpcSuccess, this.rpcError);
    };

    IzbriraUprizoritveView.prototype.rpcSuccess = function (data) {
        var self = this;

        var collection = new Backbone.Collection(data);

        var view = self.vzporedniceView = new SelectVzporedniceView({
            collection: collection
        });
        view.on('selected', self.onSelected, self);
        self.vzporedniceR.show(view);
    };
    
    IzbriraUprizoritveView.prototype.rpcError = function (data) {
    };

    IzbriraUprizoritveView.prototype.renderVzporednice = function () {
        this.rpcVzporednice({
            uprizoritve: [],
            funkcije: [],
            zacetek: this.model.get('zacetek'),
            konec: this.model.get('konec')
        });
    };
    IzbriraUprizoritveView.prototype.renderOsebe = function () {
        var view = this.osebeView = new SelectSodelujociView();
        view.on('change', this.onChange, this);
        this.osebeR.show(view);
    };

    IzbriraUprizoritveView.prototype.onSelected = function (model) {
        this.model.set('uprizoritev', model.get('id'));

        this.rpcVzporednice({
            uprizoritve: [this.model.get('uprizoritev')],
            funkcije: [],
            zacetek: this.model.get('zacetek'),
            konec: this.model.get('konec')
        });
    };
    IzbriraUprizoritveView.prototype.onChange = function (funkcije) {
        this.rpcVzporednice({
            uprizoritve: [this.model.get('uprizoritev')],
            funkcije: funkcije,
            zacetek: this.model.get('zacetek'),
            konec: this.model.get('konec')
        });
        console.log('change');
    };

    return IzbriraUprizoritveView;
});