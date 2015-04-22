define([
    'i18next',
    'underscore',
    'backbone',
    '../Model/Crumbs'
], function (
        i18n,
        _,
        Backbone,
        Crumbs
                
        ) {


    /**
     * Kolekcija za podpstrani v nagivaciji 
     * 
     * 
     */
    var NavCollection = Backbone.Collection.extend({
        model: Backbone.Model
    });


    /**
     * Model, ki zna dodati strani in podstrani v 
     * kolekcijo strani 
     * 
     */
    var NavModel = Backbone.Model.extend({
        registerNav: function (navData) {
            var pages = this.get('pages');
            navData.forEach(function (page) {
                var attrs = _.pick(page, "label", "icon", "uri", "trigger")
                var sp = new Backbone.Model(attrs);

                if (page.pages) {
                    var subColl = new NavCollection(page.pages);
                    sp.set('pages', subColl);
                }

                pages.add(sp);
            });
        }
    });


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
        mod.crumbs = new Crumbs();
        
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