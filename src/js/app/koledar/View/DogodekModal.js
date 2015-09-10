/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone-modal',
    '../Model/Dogodek',
    'formSchema!dogodek',
    'app/Dokument/View/FormView',
    'template!../tpl/dogodekModal-form.tpl',
    'template!../tpl/dogodek-modal.tpl'
], function (
        Radio,
        i18next,
        Modal,
        DogodekModel,
        schema,
        FormView,
        dogodekFormTpl,
        dogodekModalTpl
        ) {

    return function (options) {
        var Fv = FormView.extend({
            formTitle: "naslov",
            buttons: {
                nasvet: {
                    id: 'doc-nasvet',
                    icon: 'fa fa-info',
                    element: 'button-trigger',
                    trigger: 'nasvet'
                }
            },
            schema: schema.toFormSchema().schema,
            formTemplate: dogodekFormTpl,
            template: dogodekModalTpl
        });
        var model = new DogodekModel();
        
        var view = new Fv({
            model: model
        });

        var modal = new Modal({
            content: view,
            animate: true,
            okText: i18next.t("std.izberi"),
            cancelText: i18next.t("std.preklici")
        });
        
        var odpriDogodek = function(){
            //options.callback(view);
        };

        return modal.open(odpriDogodek);
    };
});