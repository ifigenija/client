/**
 * Pogled, preko katerega se prijavimo v aplikacijo  
 * Licenca GPLv3
 */
define([
    'app/handlebars',
    'marionette',
    'jquery',
    'text!../tpl/login.tpl',
    'jquery.jsonrpc'
], function (
        Handlebars,
        Marionette,
        $,
        tpl
        ) {


    var LoginView = Marionette.ItemView.extend({
        template: Handlebars.compile(tpl),
        triggers: {
            'click button': 'login',
            'change input': 'change'
        }

    });

    /**
     * Poskušam se prijaviti preko jsonRpc klica.
     * Če je prijava uspešna servis vrne podatke o uporabniku in njegovih pravicah. 
     * Podatki se shranijo v session storage.
     * Potem uporabnika redirectamo na /client/main.html# + userDefaultRoute 
     * @returns {undefined}
     */
    LoginView.prototype.onLogin = function () {
        var self = this;
        var data = {
            username: this.$('#inputEmail').val(),
            password: this.$('#inputPassword').val()
        };

        var authService = new $.JsonRpcClient({ajaxUrl: '/rpc/aaa/auth'});
        authService.call('login',
                data,
                function (result) {
                    if (result.roles && result.username) {
                        return self.options.redirectFun(result);
                    }
                    self.triggerMethod('login:failed');
                },
                function (error) {
                    self.triggerMethod('login:failed');
                }
        );
    };
    
    
    /**
     * Skrije sporočilo, o napačni prijavi, ko začnemo tipkat
     * @returns {undefined}
     */
    LoginView.prototype.onChange = function () {
        this.$('#login-failed').css({display: "none"});
    };
    
    /**
     * Prikaže sporočilo ob napačni prijavi 
     * @returns {undefined}
     */
    LoginView.prototype.onLoginFailed = function () {
        this.$('#login-failed').css({display: "block"});
    };

    return LoginView;


});


