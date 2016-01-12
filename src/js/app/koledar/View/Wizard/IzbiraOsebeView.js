/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'baseUrl',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'app/Max/Module/Form'

], function (
        Radio,
        baseUrl,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        Form
        ) {
    var sch = {type: 'Toone', targetEntity: 'oseba', editorAttrs: {class: 'form-control'}, title: 'Oseba'};

    var IzbiraOsebeView = Form.extend({
        template: Handlebars.compile('<form><div data-fields="oseba"></div></form>'),
        schema: {
            oseba: sch
        }
    });

    IzbiraOsebeView.prototype.initialize = function (options) {
        Form.prototype.initialize.apply(this, arguments);

        this.options = options;
        this.model = options.model;

        var self = this;
        //ob spremembi izbranega osebaa se mora oseba v model tudi zabeležit
        this.on('oseba:change', function (form, editor) {
            //pridobimo vrednost iz editorja. V kolikor ni vrednosti se proži not:ready
            var oseba = editor.getValue();
            if (oseba && oseba.id) {
                //nastavimo vrednost osebaa v modelu
                self.model.set('oseba', oseba.id);
                self.trigger('ready', self.model);
            } else {
                self.trigger('not:ready');
            }
        }, this);
    };

    return IzbiraOsebeView;
});