/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone-modal',
    'app/seznami/View/OsebaEditView',
    'template!app/Dokument/tpl/form-simple.tpl'
], function (
        Radio,
        i18next,
        Modal,
        OsebaEditView,
        ModalTpl
        ) {

    /**
     * options.model je model osebe
     * options.editor predstavlja vnosno polje, ki se bo po kreiranju osebe zapolnlo
     * @param {type} options.model
     * @param {type} options.editor
     * @returns {unresolved}
     */
    return function (options) {

        var OEV = OsebaEditView.extend({});

        OEV.prototype.onSaveSuccess = function () {
            izberi();
        };

        /**
         * določimo kakšni 
         * @type OsebaModal_L11.OsebaModal_L27.OEV
         */
        var view = new OEV({
            template: options.tpl ? options.tpl : ModalTpl,
            model: options.model,
            pogled: options.pogled ? options.pogled : 'modal'
        });

        var izberi = function () {
            var view = modal.options.content;
            if (!view.model.get('id')) {
                Radio.channel('error').command('flash', {message: 'Niste še ustvarili nove osebe', code: 2000000, severity: 'error'});
                modal.preventClose();
            }
            else {
                if (options.editor) {
                    options.editor.setValue(view.model.get('id'));
                }
                modal.close();
                if (options.form && options.event) {
                    options.form.trigger(options.event);
                }
            }
        };

        var shrani = function () {
            var view = modal.options.content;
            view.triggerMethod('shrani');
            modal.preventClose();
        };

        var modal = new Modal({
            title: i18next.t(options.title),
            content: view,
            animate: true,
            okText: i18next.t("std.izberi"),
            cancelText: i18next.t("std.preklici")
        });

        return modal.open(shrani);
    };
});


