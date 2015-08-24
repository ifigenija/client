/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone-modal',
    'app/seznami/View/OsebaEditView'
], function (
        Radio,
        i18next,
        Modal,
        OsebaEditView
        ) {

    return function (editModel, editor) {
        var view = new OsebaEditView({
            model: editModel,
            pogled: 'kontaktna'
        });
        
        var izberi = function () {
            var view = modal.options.content;
            if (!view.model.get('id')) {
                Radio.channel('error').command('flash', {message: 'Niste še ustvarili nove osebe', code: 2000000, severity: 'error'});
                modal.preventClose();
            }
            else {
                editor.setValue(view.model.get('id'));
                modal.close();
            }
        };

        var modal = new Modal({
            content: view,
            animate: true,
            okText: i18next.t("std.izberi"),
            cancelText: i18next.t("std.preklici")
        });
        
        return modal.open(izberi);
    };
});


