/* 
 * Licenca GPLv3
 */

define([
    'marionette',
    'backbone',
    '../../max/Module/Form',
    'app/handlebars',
    'text!../tpl/uporabnik.tpl'

], function (
        Marionette,
        Backbone,
        Form,
        Handlebars,
        uporabnikTpl
        ) {
    
    var form = new Backbone.Form({
        schema: {
            name: { type: Form.editors.Text, editorAttrs: {}},
            email: {type: Form.editors.Text, validators: ['required', 'email'], editorAttrs: {}},
            password: {type: Form.editors.Password, editorAttrs: {}},
            expires: { type: Form.editors.DatePicker, editorAttrs: {}}
        }
    });

    var UporabnikView = Marionette.LayoutView.extend({
        template: Handlebars.compile(uporabnikTpl),
        regions: {
            'up': "#uporabniski-podatki"
        },
        onShow: function () {
            this.up.show(form);
        }
    });

    return UporabnikView;

});
