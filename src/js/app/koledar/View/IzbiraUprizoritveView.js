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
        }
    });

    IzbriraUprizoritveView.prototype.inicializacija = function (options) {
        this.model = options.model || this.model;

        this.on('uprizoritev:change', function () {
            var podatki = this.fields.uprizoritev.getValue();
            if (podatki) {
                this.model.set('uprizoritev', podatki.id);
                this.trigger('ready');
            } else {
                this.trigger('not:ready');
            }
        }, this);
    };

    return IzbriraUprizoritveView;
});