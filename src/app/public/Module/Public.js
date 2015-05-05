/** 
 * Licenca GPLv3
 */
define([
    'require',
    'app/bars'

], function (
        require,
        Handlebars
        ) {


    var modInit = function (mod, App, Backbone, Marionette, $, _) {

        /**
         * Aktualni program / urnik gledališča
         * @returns {undefined}
         */
        mod.program = function () {
            require(["../View/ProgramView", "../Model/Program"], function (ProgramView, Program) {

                var collection = new Backbone.Collection([
                    {
                        "id": 1,
                        "naslov": "ena",
                        "avtor": "lovro"
                    },
                    {
                        "id": 2,
                        "naslov": "dva",
                        "avtor": "boris",
                        "debela": "je"
                    },
                    {
                        "id": 3,
                        "naslov": "tri",
                        "avtor": "ales"
                    }
                ]);
                var view = new ProgramView({
                    collection: collection
                });

                App.glavniContainer.show(view);
                
            });
        };

        /**
         * Pregled uprizoritev - aktualne - arhivirane
         * @returns {undefined}
         */
        mod.uprizoritve = function () {
            var xx = new Marionette.ItemView({
                template: Handlebars.compile("<div>uprizoritve <a href=\"#uprizoritev/12\">dvanajsta</a></div>")
            });
            App.glavniContainer.show(xx);

        };

        /**
         * Pregled posamezne uprizoritve 
         * 
         * @param {String} id
         * @returns {undefined}
         */
        mod.uprizoritev = function (id) {
            var model = new Backbone.Model({
                stevilka: id
            });
            var xx = new Marionette.ItemView({
                template: Handlebars.compile("<div>Uprizoritev št {{ stevilka }}.</div>"),
                model: model
            });
            App.glavniContainer.show(xx);
        };


        /**
         * Zgradi url za redirect na privzeto akcijo za uporabnika in 
         * in sproži navigacijo 
         * 
         * @param {Object} useData
         * @returns {undefined}
         */
        mod.redirectToMain = function (userData) {

            // shranim podatke, ki smo jih dobili iz strežnika v session storage 
            var url = 'main.html';
            sessionStorage.setItem('ifi.user.data', JSON.stringify(userData));

            if (userData.defaultRoute) {
                url = url + '#' + userData.defaultRoute;
            }
            window.location.href = url;

        };

        /**
         * Prevri ali je uporabnik že prijavljen. Če je prijavljen, potem 
         * ga redirectamo na privzeto akcijo v main aplikaciji 
         * če uporabnik še ni prijavljen, pa pokažemo formo za prijavo 
         * 
         * @param {type} callback
         * @returns {undefined}
         */
        mod.checkLoginStatus = function (login) {
            var authService = new $.JsonRpcClient({ajaxUrl: '/rpc/aaa/auth'});
            var self = this;
            authService.call(
                    'checkLogin', [],
                    function (result) {
                        if (result.roles && result.email) {
                            self.redirectToMain(result);
                        } else {
                            login();
                        }
                    },
                    function (error) {
                        login();
                    }
            );
        };
        /**
         * 
         * Prijavni dialog 
         * 
         * @returns {undefined}
         */
        mod.login = function () {
            this.checkLoginStatus(function () {
                require(['app/public/View/LoginView'], function (LoginView) {
                    var view = new LoginView({
                        redirectFun: mod.redirectToMain
                    });
                    App.glavniContainer.show(view);
                });
            });
        };

        /**
         * Routing za javni pogled 
         */
        mod.addInitializer(function (options) {



            new Marionette.AppRouter({
                controller: mod,
                appRoutes: {
                    'uprizoritve': 'uprizoritve',
                    'uprizoritev/:id': 'uprizoritev',
                    'program': 'program',
                    'login': 'login'
                }
            });
        });

    };

    return modInit;
});
