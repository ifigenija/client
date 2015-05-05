/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/bars',
    'text!../tpl/seznam.html'

], function (
        Marionette,
        Handlebars,
        seznamTpl
        ) {

    var TipFunkcijeView = Marionette.LayoutView.extend({
        template: Handlebars.compile(seznamTpl),
        triggers: {
            'click': 'ne'
        },
        onNe: function () {
            
        }
    });
    
    return TipFunkcijeView;
});