/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone-modal',
    'app/seznami/View/OsebaEditView',
    'template!../tpl/osebaModal-edit.tpl'
], function (
        Radio,
        i18next,
        Modal,
        OsebaEditView,
        tpl
        ) {

    /**
     * editModel je model osebe
     * editor predstavlja vnosno polje, ki se bo po kreiranju osebe zapolnlo
     * @param {type} editModel
     * @param {type} editor
     * @returns {unresolved}
     */
    return function (editModel, editor) {
        
        var OEV = OsebaEditView.extend({});
        
        OEV.prototype.onSaveSuccess = function(){
            izberi();
        };
        
        var view = new OEV({
            template: tpl,
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


