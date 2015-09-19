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
], function (
        Marionette,
        Radio,
        Handlebars,
        _,
        Form,
        tpl
        ) {



    /**
     * dialog, ki vpraša po parametrih izpisa,
     * opcijsko prijaže tiskalnike in potem povzetek 
     * dokumenta, ki je bil generiran na strežniku.
     */
    return Marionette.LayoutView.extend({
        template: tpl,
 
        onRender: function () {
            
            var templ = Handlebars.compile('\
      <div class="form-group field-{{ key }}">\
      <label for="{{ editorId }}">{{ title }}</label>\
      <div class="input-group" data-editor></div></div>');

            var formDef = {
                'pdf': {type: 'Checkbox', title: 'Naredi Pdf', template: templ},
                'html': {type: 'Checkbox', title: 'Naredi Html', template: templ},
                'print': {type: 'Checkbox', title: 'Neposredno natisni', template: templ},
            };
            if (this.model.get('sync')) {
                formDef.sync = {type: 'Checkbox', title: 'Izvedi takoj', template: templ};
            }
            var form = this.form = new Form({
                schema: formDef,
                model: this.model
            });
            
            this.listenTo(form, 'change', this.onFormChange);
            this.formR.show(form);
        },
        triggers: {
            'click button.btnCancel': 'preklici',
            'click button.btnOk': 'ok'
        },
        onFormChange: function (form, field, trlala) {
            var val = form.getValue();
            if (val.print) {
                this.showPrinters();
            } else {
                this.hidePrinters();
            }
        },
        regions: {
            formR: '.params-region',
            jobR: '.job-container'
        },
        showJob: function (jobDetailView) {
            this.jobR.show(jobDetailView);
        },
        onOk: function () {
            this.form.commit();
            if (this.model.get('print') && !this.model.get('printer')) {
                 Radio.channel('error').command('flash', {
                     code: '',
                     message: 'Izberite tiskalnik',
                     severity: 'info'
                 }); 
                 return false;
            }
            this.trigger('akcija');
        }

    });
});
