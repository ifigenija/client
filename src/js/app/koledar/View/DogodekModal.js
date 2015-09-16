/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone-modal',
    '../Model/Dogodek',
    './DogodekView',
    'template!../tpl/dogodekModal-form.tpl',
    'template!../tpl/dogodek-modal.tpl',
    'formSchema!dogodek/preprost'
], function (
        Radio,
        i18next,
        Modal,
        DogodekModel,
        DogodekView,
        dogodekFormTpl,
        dogodekModalTpl,
        schema
        ) {

    return function (options) {
        var DV = DogodekView.extend({
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
        var model = new DogodekModel.Model();
        
        var zacetek = options.zacetek;
        var konec = options.konec;
        
        if(zacetek){
            model.set('zacetek', zacetek);
        }
        if(konec){
            model.set('konec', konec);
        }

        var view = new DV({
            model: model
        });

        var modal = new Modal({
            title: i18next.t("dogodek.title"),
            content: view,
            animate: true,
            okText: i18next.t("std.izberi"),
            cancelText: i18next.t("std.preklici")
        });

        var odpriDogodek = function () {
            var view = modal.options.content;
            if (!view.form.commit()) {
                if (options.cb) {
                    options.cb(view);
                }
            } else {
                modal.preventClose();
            }
        };

        return modal.open(odpriDogodek);
    };
});