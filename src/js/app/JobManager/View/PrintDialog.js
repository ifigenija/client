/* 
 * Licenca GPL V3 or later
 *  
 */

define([
    'marionette',
    'radio',
    'app/bars',
    'underscore',
    'app/Max/Module/Form',
    'template!../tpl/print-dialog.tpl',
    'template!../tpl/print-opts.tpl'
], function (
    Marionette,
    Radio,
    Handlebars,
    _,
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
        initialize: function (options) {
        this.params = new Backbone.Model(options.params || {});
        this.schema = options.schema || null;
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
                formDef.sync = {type: 'Checkbox', title: 'Izvedi takoj', template: templ, editorAttrs:{disabled: this.model.get('sync')!== true}};
            var form = this.form = new Form({
                template: tplOpts,
                schema: formDef,
                model: this.model
            });

            this.formR.show(form);
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
                this.filterForm.commit();
            }
            this.jobR.show(new LoadingView());
            this.triggerMethod('akcija');
        },
        onAkcija: function () {
            var printOptions = this.model.pick(['pdf', 'html', 'sync']);

            this.runJob(this.params.attributes,printOptions);

        },
        runJob: function (filter,printOptions) {
            var self = this;
            var rpc = new $.JsonRpcClient({
                ajaxUrl: this.model.get('uri')
            });
            filter.printOptions = printOptions;
            rpc.call(this.model.get('method'),
                filter,
                function (job) {
                    var jm = Radio.channel('jobs');
                    var jobView = jm.request('new:job:view', job, !printOptions.sync);
                    self.showJob(jobView);
                    self.ui.btnOk.hide();
                    self.formR.empty();
                    self.filterR.empty();
                },
                function (error) {
                    self.jobR.empty();
                    Radio.channel('error').command('flash', error);
                });

        },

    });
});
