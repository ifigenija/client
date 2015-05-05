/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'backbone',
    'marionette',
    'app/bars',
    'text!../tpl/seznam.html'

], function (
        Radio,
        Backbone,
        Marionette,
        Handlebars,
        seznamTpl
        ) {

    var ZvrstUprizoritveView = Marionette.LayoutView.extend({
        template: Handlebars.compile(seznamTpl),
        triggers: {
            'click .seznam-tabela': 'ne',
            'click .seznam-forma': 'syncError'
        },
        onSyncError: function () {

        var M = Backbone.Model.extend({
            urlRoot: '/rest/drzava'
        });
            var model = new M({
                isoNaziv: 'xxxxx'
            }, {
                urlRoot: '/rest/drzava'
            });
            
            model.save({}, {
                success: function () {
                    console.log('gre');
                },
                error: Radio.channel('error').request('handler', 'xhr') 
            });
        },
        onNe: function () {

            Radio.channel('error').command('flash', {message: "Napaka", code: 5345345, severity: 'info', });
        }
    });

    return ZvrstUprizoritveView;
});