/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/handlebars',
    'text!../tpl/navbar.tpl'
], function (
        Marionette,
        Handlebars,
        tpl
        ) {

    var PublicLayout = Marionette.ItemView.extend({
        template: Handlebars.compile(tpl),
        events: {
            'click li': "menuIzbran"
        },       
        menuIzbran: function (e) {
            this.$(".active").removeClass("active");
            this.$(e.currentTarget).addClass('active');
        }
        
    });

    return PublicLayout;
});

