/* 
 * Licenca GPL V3 or later
 *  
 */

define([
    'marionette',
    'radio',
    'app/bars',
    'underscore',
    'backbone-modal',
    'app/Max/Module/Form',
    'template!../tpl/print-dialog.tpl',
    'template!../tpl/print-opts.tpl',
], function (
        Marionette,
        Radio,
        Handlebars,
        _,
        Modal,
        Form,
        tpl,
        tplOpts) {

    var LoadingView = Marionette.ItemView.extend({
        template: Handlebars.compile('<div style="text-align:center"><i class="fa fa-spinner fa fa-spin fa fa-4x"></i> <br/>{{t "jobs.izvajanjeJoba"}}</div>')
    });

    /**
     * dialog, ki vpraša po parametrih izpisa,
     * opcijsko prijaže tiskalnike in potem povzetek
     * dokumenta, ki je bil generiran na strežniku.
     */
    return Marionette.LayoutView.extend({
        template: tpl,
        className: 'print-dialog',
        initialize: function (options) {
            this.model = this.model || new Backbone.Model(_.pick(options, 'html', 'pdf', 'sync'));
            this.on('loading', this.onLoading, this);
            this.params = options.params || null;
        },
        onRender: function () {

            if (this.schema) {
                var pf = this.filterForm = new Form({
                    schema: this.schema,
                    model: this.params,
                });
                this.filterR.show(pf);
            }
            var templ = Handlebars.compile('\
      <div class="form-group field-{{ key }}">\
      <label for="{{ editorId }}">{{ title }}</label>\
      <div class="input-group" data-editor></div></div>');

            var formDef = {
                'pdf': {type: 'Checkbox', title: 'Naredi Pdf', template: templ},
                'html': {type: 'Checkbox', title: 'Naredi Html', template: templ},
            };
            formDef.sync = {type: 'Checkbox', title: 'Izvedi takoj', template: templ, editorAttrs: {disabled: this.model.get('sync') !== true}};
            var form = this.form = new Form({
                template: tplOpts,
                schema: formDef,
                model: this.model
            });

            _.bindAll(this, 'success', 'error');
            this.listenTo(form, 'change', this.onFormChange);
            this.formR.show(form);

            if (this.params) {
                this.filterR.show(this.params);
            }

        },
        triggers: {
            'click button.btnCancel': 'preklici',
            'click button.btnOk': 'ok'
        },
        ui: {
            btnOk: '.btnOk'
        },
        regions: {
            formR: '.options-region',
            filterR: '.params-region',
            jobR: '.job-container'
        },
        showJob: function (jobDetailView) {
            this.jobR.show(jobDetailView);
        },
        onOk: function () {
            this.form.commit();
            if (this.schema) {
                this.params.commit();
            }
            this.jobR.show(new LoadingView());
            this.trigger('akcija');
        },
        modal: function () {
            this.on('preklici', this.destroyModal, this);

            var options = {
                title: 'Natisni dokument',
                showFooter: false,
                enterTriggersOk: true,
                animate: true,
            };
            options.modalOptions = {
                className: 'modal modal-confirm'
            };
            options.content = this;

            this.modal = new Modal(options);
            this.modal.open();
            
        },
        destroyModal: function () {
            this.destroy();
            this.modal.close();
        },
        onLoading: function () {
            this.jobR.show(new LoadingView());
        },

        /**
         * se uporabi kot callback v success pri jsonrpc klicu printa
         * @param array job
         */
        success: function (job) {
            var jobs = Radio.channel('jobs');
            //this.$('.btnOk').hide();
            this.formR.empty();
            this.filterR.empty();
            var jobView = jobs.request('new:job:view',job, !this.model.get('sync'));
            this.jobR.show(jobView);
            this.trigger('show:job', jobView);
        },
        /**
         * se uporabi kot callback za error pr jsonroc klicu printa
         * @param resp
         */
        error: function (resp) {
            this.jobR.empty();
            Radio.channel('error').command('flash', resp);
        }
    });
});
