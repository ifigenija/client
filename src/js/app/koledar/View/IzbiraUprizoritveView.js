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
    'baseUrl',
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
        baseUrl,
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
        var uprID = this.model.get('uprizoritev');
        var collection = new Backbone.Collection({
            url: baseUrl + '/rest/funkcije/vzporednica?uprizoritev='+ uprID
        });
        var self = this;
        collection.fetch({success: function () {
                var view = self.osebeView = new SelectSodelujociView({
                    collection: collection
                });
                view.on('change', self.onChange, self);
                self.osebeR.show(view);
            }});
    };

    IzbriraUprizoritveView.prototype.onSelected = function (model) {
        this.model.set('uprizoritev', model.get('id'));

        this.rpcVzporednice({
            uprizoritve: [this.model.get('uprizoritev')],
            funkcije: [],
            zacetek: this.model.get('zacetek'),
            konec: this.model.get('konec')
        });

        this.renderOsebe();
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