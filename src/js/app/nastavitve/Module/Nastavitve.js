/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'require',
    'backbone',
    './nav',
    'radio',
    'i18next'

], function (
        Marionette,
        require,
        Backbone,
        moduleNav,
        Radio,
        i18next
        ) {


    var modelInit = function (model, App, Backbone, Marionette, $, _) {

        var ch = Radio.channel('layout');

        var odpri = function (View, title, pogled) {
            var view = new View();
            if (pogled) {
                view = new View({pogled: pogled});
            }
            ch.command('open', view, i18next.t(title));
            ch.command('enableMenu', 'nastavitve');
            return view;
        };
        /**
         * Direktno odpremo podatke iz tabele
         * preko url direkno pridemo do željenih podatkov
         * 
         * @param {type} Model
         * @param {type} View
         * @param {type} id
         * @param {type} title
         * @param {type} pogled
         * @returns {undefined}
         */
        var odpriModel = function (Model, View, id, title, pogled) {
            var odpriView = function () {
                var view = odpri(View, title, pogled);
                ch.command('open', view, i18next.t(title));
                ch.command('enableMenu', 'nastavitve');
                //model gre tu not ker se odpre novi view s tem modelom
                view.triggerMethod('selected', model);
            };

            var model = new Model.Model({id: id});
            model.once('sync', odpriView);
            model.fetch();
        };

        model.moznosti = function () {

        };

        model.addUser = function () {
            model.manageUsers('dodaj');
        };

        model.manageUsers = function (akcija) {
            require(['../View/UserView'], function (View) {
                var view = new View();
                ch.command('open', view, i18next.t('user.title'));
                if (akcija) {
                    view.triggerMethod(akcija);
                }
            });
        };

        model.roles = function () {
            require(['../View/RoleView'], function (View) {
                odpri(View, 'role.title');
            });
        };

        model.permission = function () {
            require(['../View/PermissionView'], function (View) {
                odpri(View, 'permission.title');
            });
        };

        /**
         * Neposredni dostop do dovoljenja
         * @returns {undefined}
         */
        model.permissionOdpri = function (id) {
            require(['../Model/Permission', '../View/PermissionView'], function (Model, View) {
                odpriModel(Model, View, id, 'permission.title');
            });
        };
        /**
         * Neposredni dostop do vloge
         * @returns {undefined}
         */
        model.roleOdpri = function (id) {
            require(['../Model/Role', '../View/RoleView'], function (Model, View) {
                odpriModel(Model, View, id, 'role.title');
            });
        };
        /**
         * Neposredni dostop do uporabnika
         * @returns {undefined}
         */
        model.userOdpri = function (id) {
            require(['../Model/User', '../View/UserView'], function (Model, View) {
                odpriModel(Model, View, id, 'user.title');
            });
        };
        /**
         * Routing za modelule
         * 
         */
        model.addInitializer(function (options) {
            App.nav.registerNav(moduleNav);

            new Marionette.AppRouter({
                controller: model,
                appRoutes: {
                    'aaa/moznosti': 'moznosti',
                    'aaa/user/dodaj': 'addUser',
                    'aaa/users': 'manageUsers',
                    'aaa/roles': 'roles',
                    'aaa/permissions': 'permission',
                    'aaa/users/:id': 'userOdpri',
                    'aaa/roles/:id': 'roleOdpri',
                    'aaa/permissions/:id': 'permissionOdpri'
                }
            });
        });

    };

    return modelInit;
});
