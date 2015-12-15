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

    var sch = {
        zacetek: {
            type: 'DateTimePicker',
            help: i18next.t('dogodek.d.zacetek'),
            title: i18next.t('dogodek.zacetek'),
            editorAttrs: {
                class: 'timestamp-polje form-control',
                'data-attach': 'datepicker',
                name: 'zacetek',
                prependIcon: 'fa fa-clock-o',
                type: 'datetime'
            }
        },
        konec: {
            type: 'DateTimePicker',
            help: i18next.t('dogodek.d.konec'),
            title: i18next.t('dogodek.konec'),
            editorAttrs: {
                class: 'timestamp-polje form-control',
                'data-attach': 'datepicker',
                name: 'konec',
                prependIcon: 'fa fa-clock-o',
                type: 'datetime'
            }
        }
    };

    var IzbriraUprizoritveView = Form.extend({
        template: Handlebars.compile('<form><div data-fields="zacetek"></div><div data-fields="konec"></div></form>'),
        schema: sch
    });

    IzbriraUprizoritveView.prototype.initialize = function (options) {
        Form.prototype.initialize.apply(this, arguments);
        
        if (options && options.model) {
            this.model = options.model || this.model;
        }
        if (options && options.zacetek) {
            this.zacetek = options.zacetek || this.zacetek;
        }
        if (options && options.konec) {
            this.konec = options.konec || this.konec;
        }

        this.on('change', this.nadaljuj, this);
    };

    IzbriraUprizoritveView.prototype.render = function (options) {
        Form.prototype.render.apply(this, arguments);
        if (this.zacetek) {
            this.fields.zacetek.editor.setValue(this.zacetek);
        }
        if (this.konec) {
            this.fields.konec.editor.setValue(this.konec);
        }
        
        if(options && options.wizardModel){
            this.wizardModel = options.wizardModel || new Backbone.Model();
        }
        this.nadaljuj();
    };

    IzbriraUprizoritveView.prototype.nadaljuj = function () {
        var zacetek = this.fields.zacetek.getValue();
        var konec = this.fields.konec.getValue();

        if (zacetek && konec) {
            this.wizardModel.set('zacetek', zacetek);
            this.wizardModel.set('konec', konec);
            this.trigger('ready', this.wizardModel);
        } else {
            this.trigger('not:ready');
        }
    };

    return IzbriraUprizoritveView;
});