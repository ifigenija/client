/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'backbone',
    'marionette',
    'template!../tpl/seznam.html',
    'formSchema!drzava'
], function (
        Radio,
        Backbone,
        Marionette,
        seznamTpl,
        schemaColl        
        ) {

    var ZvrstUprizoritveView = Marionette.LayoutView.extend({
        template: seznamTpl,
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
            console.log(schemaColl.toFormSchema());
            Radio.channel('error').command('flash', {message: "Napaka", code: 5345345, severity: 'info', });
        }
    });

    return ZvrstUprizoritveView;
});