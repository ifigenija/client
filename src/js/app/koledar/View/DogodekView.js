/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'i18next',
    'underscore',
    'app/Dokument/View/FormView',
    'formSchema!dogodek',
    'template!../tpl/dogodek-form.tpl',
    'template!../tpl/dogodek-modal.tpl'
], function (
        Radio,
        i18next,
        _,
        FormView,
        dogodekSchema,
        dogodekFormTpl,
        dogodekTpl
        ) {

    var Fv = FormView.extend({
        formTitle: i18next.t('dogodek.title'),
        buttons: {
            shrani: {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'doc-preklici',
                label: i18next.t('std.preklici'),
                element: 'button-trigger',
                trigger: 'preklici'
            },
            nasvet: {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                element: 'button-trigger',
                trigger: 'nasvet'
            },
            brisi: {
                id: 'doc-brisi',
                label: i18next.t('std.brisi'),
                element: 'button-trigger',
                trigger: 'brisi'
            }
        },
        schema: dogodekSchema.toFormSchema().schema,
        formTemplate: dogodekFormTpl,
        template: dogodekTpl
    });
    
    Fv.prototype.initialize = function (options) {
        if(options.formTitle){
            this.formTitle = options.formTitle;
        }
    };
    
    Fv.prototype.serializeData = function () {
        return _.extend(this.model.toJSON(), {
            formTitle: this.formTitle
        });
    };
    
    Fv.prototype.onFormChange = function (form) {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-shrani');
        if (but && but.get('disabled')) {
            but.set({
                disabled: false
            });
        }
    };

    return  Fv;
});