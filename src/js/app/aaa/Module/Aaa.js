/** 
 * Licenca GPLv3
 */
define([
    'underscore',
    'radio',
    'marionette',
    'require',
    'i18next',
    './nav'
], function (
        _,
        Radio,
        Marionette,
        require,
        i18next,
        moduleNav
        ) {


var userAcl = {};
    var modInit = function (model, App, Backbone, Marionette, $, _) {
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
        model.page = function () {
            console.log("Page");
        };

        /**
         * 
         * Routing za javni pogled 
         */
        model.addInitializer(function (options) {
            userAcl = options.user;
            App.nav.registerNav(moduleNav);
            new Marionette.AppRouter({
                controller: model,
                appRoutes: {
                    'aaa': 'page'
                }
            });
        });

    };

    return modInit;
});
