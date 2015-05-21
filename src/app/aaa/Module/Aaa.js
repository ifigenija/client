/** 
 * Licenca GPLv3
 */
define([
    'radio',
    'marionette',
    'require',
    'backbone',
    'i18next',
    './nav'

], function (
        Radio,
        Marionette,
        require,
        Backbone,
        i18next,
        moduleNav
        ) {


    var modInit = function (model, App, Backbone, Marionette, $, _) {
        var ch = Radio.channel('layout');
        var chGlobal = Radio.channel('global');
        chGlobal.reply('isGranted',
                function (dovoljenje) {
//                    var data = JSON.parse(sessionStorage.getItem('ifi.user.data'));
//                    if (data['permissions']) {
//                        var permissions = data['permissions'];
//                        for (var perm in permissions) {
//                            if (perm === dovoljenje) {
//                                return true;
//                            }
//                        }
//                        return false;
//                    }
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
