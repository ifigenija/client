/* 
 * Licenca GPL V3 or later
 *  
 */

define(['app/Max/View/Button/Button',
    'radio',
    'marionette',
    'underscore',
    'jquery',
    'backbone',
    'backbone-modal',
    './PrintDialog'

], function (
    Button,
    Radio,
    Marionette,
    _,
    $,
    Backbone,
    Modal,
    PrintDialog) {

    return Button.extend({
        events: {'click': 'click'},
        click: function () {

            var self = this;
            var printParams = new Backbone.Model();
            printParams.set(this.model.pick('sync', 'pdf', 'html', 'method', 'uri'));

            this.dialog = new PrintDialog({
                model: printParams,
                params: this.model.get('params'),
                schema: this.model.get('schema')
            });
            this.dialog.on('preklici', this.destroyModal, this);
            var options = {
                title: 'Natisni dokument',
                showFooter: false,
                enterTriggersOk: true,
                animate: true
            };
            options.modalOptions = {
                className: 'modal modal-confirm'
            };
            options.content = this.dialog;
            this.modal = new Modal(options);
            this.modal.open();
            return false;
        },
        destroyModal: function () {
            this.dialog.destroy();
            this.dialog = null;
            this.modal.$content.html('');
            this.modal.close();
        }
    });

});

