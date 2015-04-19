define(['jquery',
    'marionette',
    'underscore',
    'backbone',
    './Button'], function (
        $,
        Marionette,
        _,
        Backbone,
        Button) {

    /**
     * Rpc button služi za sprožanje json rpc akcij na strežniku 
     * 
     * parametri za gumb so :
     *   uri   - uri kam se pošlje jsonrpc zahteva 
     *   method - katera metoda se pokliče na strežniku. 
     *   after - Akcija, ki se sproži po uspešnem zaključku rpc klica 
     *           možne vrednosti so: refresh, close, redirect, trigger 
     *   
     */

    var RpcButton = Button.extend({
        events: {
            'click': 'onClick'
        }
    });

    /**
     * Kaj se zgodi ob kliku gumba 
     * 
     * @returns {Boolean}
     */
    RpcButton.prototype.onClick = function () {

        var self = this;
        // ustvarim novi rpc klient  z ustreznim url-jem 
        var rpc = new $.JsonRpcClient({
            ajaxUrl: this.model.get('uri')
        });

        // ustvarim funkcijo, ki jo uporabim za callback po uspešnem 
        // klicu rpc akcije 
        var fun, a;
        a = this.model.get('after');
        if (a === 'refresh') {
            fun = function () {
                window.App.TabLayout.refreshActiveTab();
            };
        }

        if (a === 'close') {
            fun = window.App.TabLayout.closeActiveTab;
        }

        if (a === 'redirect' && this.model.get('redirectUrl')) {
            var uri = this.model.get('redirectUrl');
            var gotoId = this.model.get('gotoId');
            fun = function (result) {
                if (gotoId && _.isString(result)) {
                    uri = uri + '/' + result;
                }
                window.App.TabLayout.closeActiveTab();
                Backbone.history.navigate(uri, {trigger: true});
            };
        }

        if (a === 'trigger') {
            fun = function (result) {
                if (self.model && self.model.get('trigger')) {
                    if (this.listener) {
                        Marionette.triggerMethod.call(self.listener, self.model.get('trigger'), result);
                    } else {
                        if (self.model.get('listener')) {
                            Marionette.triggerMethod.call(self.model.get('listener'), self.model.get('trigger'), result);
                        }
                    }
                }
            };
        }

        // klic funkcije 
        rpc.call(
                this.model.get('method'),
                this.model.get('params'),
                fun,
                window.App.FlashManager.flash
                );

        return false;
    };



    return RpcButton;
});