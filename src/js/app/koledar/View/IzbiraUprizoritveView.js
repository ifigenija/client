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
    var sch = {type: 'Toone', targetEntity: 'uprizoritev', editorAttrs: {class: 'form-control'}, title: 'Uprizoritev'};
    
    var IzbriraUprizoritveView = Form.extend({
        template: Handlebars.compile('<form><div data-fields="uprizoritev"></div></form>'),
        schema: {
            uprizoritev: sch
        },
        initialize: function (options) {
            Form.prototype.initialize.apply(this, arguments);
            
            this.model = options.model;
            
            var self = this;
            this.on('uprizoritev:change', function (form, editor) {
                var upr = editor.getValue();
                if(upr && upr.id){
                    self.model.set('uprizoritev', upr.id);
                    self.trigger('ready', self.model);
                }else{
                    self.trigger('not:ready');
                }
            }, this);
        }
    });
    return IzbriraUprizoritveView;
});