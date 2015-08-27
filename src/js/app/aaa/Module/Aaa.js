/** 
 * Licenca GPLv3
 */
define([
    'underscore',
    'radio',
    'require',
    'i18next',
    './nav'
], function (
        _,
        Radio,
        require,
        i18next,
        moduleNav
        ) {


    var userAcl = {};
    var modInit = function (module, App, Backbone, Marionette, $, _) {
        var chGlobal = Radio.channel('global');
        chGlobal.reply('isGranted',
                function (perm) {
                    if (userAcl.roles) {
                        if (userAcl.roles.indexOf('ifi-all') >= 0) {
                            return true;
                        }
                    }
                    if (userAcl.permissions) {
                        return (userAcl.permissions.indexOf(perm) >= 0)
                    }
                    console.log('ne najdem dovoljenj v pravilni obliki');
                    return false;
                }
        );
        chGlobal.reply('hasRole',
                function (role) {
                    if (userAcl.roles) {
                        if (userAcl.roles.indexOf('ifi-all') >= 0) {
                            return true;
                        }
                    }
                    if (userAcl.roles) {
                        return (userAcl.roles.indexOf(role) >= 0)
                    }
                    console.log('ne najdem dovoljenj v pravilni obliki');
                    return false;
                }
        );


        module.logout = function () {
            var authService = new $.JsonRpcClient({ajaxUrl: '/rpc/aaa/auth'});
            var self = this;
            authService.call(
                    'logout', [],
                    function (result) {
                        window.location.href = "/";
                    },
                    function (error) {
                        window.location.href = "/";
                    }
            );
        };



        module.changePassword = function (oldPass, newPass, next) {
            var authService = new $.JsonRpcClient({ajaxUrl: '/rpc/aaa/auth'});
            var self = this;
            authService.call(
                    'changePassword', {'oldPasword': oldPass, 'newPassword': newPass}, function (result) {
                next();
            },
                    function (error) {
                        Radio.channel('error').command('flash', error);
                    }
            );
        };

        /**
         * Prikaz uporabnikovega profila
         * 
         * @returns {undefined}
         */
        module.userProfile = function (id) {
            require(['../View/UserProfileView'], function (UserProfile) {
                var view = new UserProfile({
                    model: new Backbone.Model(userAcl),
                    changePassFun: module.changePassword
                });
                Radio.channel('layout').command('open', view, i18next.t('Profil'));

            });
        };


        /**
         * 
         * Routing za javni pogled 
         */
        module.addInitializer(function (options) {
            userAcl = options.user;
            App.nav.registerNav(moduleNav);
            new Marionette.AppRouter({
                controller: module,
                appRoutes: {
                    'user/:id': 'userProfile',
                    'logout': 'logout'
                }
            });
        });

    };

    return modInit;
});
