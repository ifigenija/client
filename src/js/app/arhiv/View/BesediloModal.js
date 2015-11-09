/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone-modal',
    './BesediloDokView',
    'template!app/Dokument/tpl/form-simple.tpl'
], function (
        Radio,
        i18next,
        Modal,
        BesediloDokView,
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

        var BesediloView = BesediloDokView.extend({
            buttons: {
                'doc-shrani': {
                    id: 'doc-shrani',
                    label: i18next.t('std.shrani'),
                    element: 'button-trigger',
                    trigger: 'shrani',
                    disabled: true
                },
                'doc-nasvet': {
                    id: 'doc-nasvet',
                    icon: 'fa fa-info',
                    title: i18next.t('std.pomoc'),
                    element: 'button-trigger',
                    trigger: 'nasvet'
                }
            }
        });

        BesediloView.prototype.onSaveSuccess = function () {
            izberi();
        };
        BesediloView.prototype.posodobiUrlNaslov = function () {
        };

        /**
         * določimo kakšni 
         * @type OsebaModal_L11.OsebaModal_L27.OEV
         */
        var view = new BesediloView({
            template: options.tpl ? options.tpl : ModalTpl,
            model: options.model,
            pogled: 'modal'
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
                    if(options.form && !options.trigger){
                        options.form.trigger('change');
                    }else{
                        options.form.trigger(options.trigger,options.form, options.editor);
                    }
                }
                if (options.form && options.event) {
                    options.form.trigger(options.event);
                }
                modal.close();
            }
        };

        var shrani = function () {
            var view = modal.options.content;
            view.triggerMethod('shrani');
            modal.preventClose();
        };
        
        var BM = Modal.extend({
            className: 'besedilo-modal modal'
        });

        var modal = new BM({
            title: i18next.t(options.title),
            content: view,
            animate: true,
            okText: i18next.t("std.ustvari"),
            cancelText: i18next.t("std.preklici")
        });

        return modal.open(shrani);
    };
});


