define([
    'i18next',
    'underscore',
    'backbone',
    'radio'
], function (
        i18n,
        _,
        Backbone,
        Radio
        ) {

    /**
     * Model, ki zna dodati strani in podstrani v 
     * kolekcijo strani 
     * 
     */

    var NavModel = Backbone.Model.extend({
        isGranted: function () {
            var ch = Radio.channel('global');
            if (this.get('role')) {
                return  ch.request('hasRole', this.get('role'));
            }
            if (this.get('permission')) {
                return  ch.request('isGranted', this.get('permission'));
            }
            return true;
        }

    });

    /**
     * Kolekcija za podpstrani v nagivaciji 
     * 
     * 
     */
    var NavCollection = Backbone.Collection.extend({
        model: NavModel
    });


    NavModel.prototype.registerNav = function (navData) {
        var self = this;
        var pages = this.get('pages');
        navData.forEach(function (page) {
            var attrs = _.pick(page, "label", "icon", "uri", "trigger", "permission", "role");
            var sp = new NavModel(attrs);

            if (page.pages) {
                var subColl = new NavCollection(page.pages);
                sp.set('pages', subColl);
            }

            pages.add(sp);
        });

    };


    /**
     * Inicializacija nav modula 
     * 
     * @param {Marionette.Module} mod
     * @param {Marionette.Application} App
     * @param {Backbone} Backbone
     * @param {Marionette} Marionette
     * @param {jQuery} $
     * @param {underscore} _
     * @returns {undefined}
     */
    var modInit = function (mod, App, Backbone, Marionette, $, _) {

        mod.navigation = {};

        mod.registerNav = function (navData) {
            this.navigation.registerNav(navData);
        };

        mod.addInitializer(function (options) {

            mod.navigation = new NavModel({
                label: i18n.t('nav.brandPrivate'),
                uri: '#',
                pages: new NavCollection([])
            }, {
                app: App
            });
        });

    };

    return modInit;
});