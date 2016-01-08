/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'app/Max/Module/Form'

], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        Form
        ) {
    var sch = {type: 'Toone', targetEntity: 'prostor', editorAttrs: {class: 'form-control'}, title: 'Prostor'};
    
    var IzbriraProstoraView = Form.extend({
        template: Handlebars.compile('<form><div data-fields="prostor"></div></form>'),
        schema: {
            prostor: sch
        },
        initialize: function (options) {
            Form.prototype.initialize.apply(this, arguments);
            
            this.model = options.model;
            
            var self = this;
            this.on('prostor:change', function (form, editor) {
                var upr = editor.getValue();
                if(upr && upr.id){
                    self.model.set('prostor', upr.id);
                    self.trigger('ready', self.model);
                }else{
                    self.trigger('not:ready');
                }
            }, this);
        }
    });
    return IzbriraProstoraView;
});