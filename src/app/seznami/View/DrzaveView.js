/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/bars',
    'text!../tpl/drzave.tpl'

], function (
        Marionette,
        Handlebars,
        drzaveTpl
        ) {

    var TipFunkcijeView = Marionette.LayoutView.extend({
        template: Handlebars.compile(drzaveTpl),
        triggers: {
            'click': 'da'
        },
        onDa: function () {
            console.log('Drzava');
        }
    });
    
    return TipFunkcijeView;
});