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
    'template!../tpl/dogodek-modal.tpl'
], function (
        Radio,
        i18next,
        Modal,
        DogodekModel,
        DogodekView,
        dogodekFormTpl,
        dogodekModalTpl
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
            formTemplate: dogodekFormTpl,
            template: dogodekModalTpl
        });
        var model = new DogodekModel.Model();
        
        var zacetek = options.zacetek;
        
        if(zacetek){
            model.set('zacetek', zacetek);
        }

        var view = new DV({
            formTitle: "Dogodek",
            model: model
        });

        var modal = new Modal({
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