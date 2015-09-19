/* 
 * Licenca GPL V3 or later
 *  
 */

define(['app/Max/View/Button/Button',
    'radio',
    'app/bars',
    'marionette',
    'underscore',
    'jquery',
    'backbone',
    'backbone-modal',
    './PrintDialog'

], function (Button,
             Radio,
             Handlebars,
             Marionette,
             _,
             $,
             Backbone,
             Modal,
             PrintDialog) {


    var LoadingView = Marionette.ItemView.extend({
        template: Handlebars.compile('<div style="text-align:center"><i class="fa fa-spinner fa fa-spin fa fa-4x"></i> <br/>{{t "jobs.izvajanjeJoba"}}</div>')
    });

    return Button.extend({
        events: {'click': 'click'},
        click: function () {

            var self = this;
            this.jobParams = new Backbone.Model();
            this.jobParams.set(this.model.pick('sync', 'pdf','html', 'razred'));


            this.dialog = new PrintDialog({
                model: this.jobParams
            });
            this.dialog.on('akcija', function () {
                var params = this.model.attributes;
                if (!params.sync) {
                    self.destroyModal();
                }
                self.runPrintJob(params);

            }, this);
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
        runPrintJob: function (params) {
            var self = this;
            var rpc = new $.JsonRpcClient({
                ajaxUrl: this.model.get('uri')
            });
            this.dialog.showJob(new LoadingView());
            rpc.call(this.model.get('method'),
                {'dokument': this.model.get('dokument'), 'printOptions': params},
                function (job) {
                    var jm = Radio.channel('jobs');
                    if (params.sync) {
                        var jobView = jm.request('new:job:view', job);
                        self.dialog.showJob(jobView);
                    } else {
                        jm.command('new:job:queue', job);
                    }
                },
                function (error) {
                    self.dialog.jobR.empty();
                    Radio.channel('error').command('flash', error);
                });

        },
        destroyModal: function () {
            this.dialog.destroy();
            this.dialog = null;
            this.modal.$content.html('');
            this.modal.close();
        }

    });

});

