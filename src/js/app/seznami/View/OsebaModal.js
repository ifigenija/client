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

        var OEV = OsebaEditView.extend({
            buttons: {
                shrani: {
                    id: 'doc-shrani',
                    label: i18next.t('std.shrani'),
                    element: 'button-trigger',
                    trigger: 'shrani',
                    disabled: true
                },
//                preklici: {
//                    id: 'doc-preklici',
//                    label: i18next.t('std.zapri'),
//                    element: 'button-trigger',
//                    trigger: 'preklici'
//                },
                nasvet: {
                    id: 'doc-nasvet',
                    icon: 'fa fa-info',
                    title: i18next.t('std.pomoc'),
                    element: 'button-trigger',
                    trigger: 'nasvet'
                }
            }
        });

        OEV.prototype.onSaveSuccess = function () {
            izberi();
        };

        OEV.prototype.posodobiUrlNaslov = function () {
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
                    if (options.form) {
                        options.form.trigger('change');
                    }
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

        var OM = Modal.extend({
            className: 'oseba-modal modal'
        });

        if (view.options.pogled !== 'modal') {
            OM = Modal.extend({
                className: 'oseba-modal-vse modal'
            });
        }

        var ok = options.okText || i18next.t("std.ustvari");
        
        var modal = new OM({
            title: i18next.t(options.title),
            content: view,
            animate: true,
            okText: ok,
            cancelText: i18next.t("std.preklici")
        });

        return modal.open(shrani);
    };
});


