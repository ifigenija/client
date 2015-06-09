/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'backbone',
    'radio',
    'i18next',
    'baseUrl',
    'app/Dokument/View/FormView',
    'template!../tpl/pdDodaj.tpl',
    'formSchema!programDela',
    'template!../tpl/pd-form.tpl',
    '../Model/ProgramDela',
    './PdUrediView'
], function (
        Marionette,
        Backbone,
        Radio,
        i18next,
        baseUrl,
        FormView,
        tpl,
        formSchema,
        formTpl,
        Model,
        Urediview
        ) {
    
    var ch = Radio.channel('layout');

    var PdDodajView = Marionette.LayoutView.extend({
        template: tpl,
        title: i18next.t('programDela.dodaj'),
        regions: {
            FormR: '.region-form'
        }
    });
    
    PdDodajView.prototype.initialize = function(){
        
    };
    
    PdDodajView.prototype.onRender = function () {
        this.$('.naslov-uprizoritve').text(this.title);
        
        var model = new Model.Model();
        
        var formView = this.getFormView(model);
        this.listenTo(formView, 'save:success', this.saveSuccess);
        
        this.FormR.show(formView);
    };
    
    /**
     * Pridobimo naslov
     * @param {type} model
     * @returns {Marionette.LayoutView@call;extend.prototype.getTitle.text|String}
     */
    PdDodajView.prototype.getTitle = function (model) {
        var text = model.get('naziv') || "Naziv";
        return text;
    };
    
    /**
     * Privzrti pogled na formo za urejanje 
     * @param {type} model
     * @returns {SeznamiView_L15.SeznamiView.prototype.getFormView.Fv}
     */
    PdDodajView.prototype.getFormView = function (model) {
        var Fv = FormView.extend({
            formTitle: this.getTitle(model),
            buttons: FormView.prototype.defaultButtons,
            schema: formSchema.toFormSchema().schema,
            formTemplate: formTpl,
            onFormChange: function (form) {
                var tb = this.getToolbarModel();
                var but = tb.getButton('doc-shrani');
                if (but.get('disabled')) {
                    but.set({
                        disabled: false
                    });
                }
            }
        });

        return  new Fv({
            model: model
        });

    };
    
    /**
     * 
     * @param {type} model
     * @returns {undefined}
     */
    PdDodajView.prototype.zamenjajUrl = function (model) {
        var fragment = Backbone.history.getFragment();

        fragment = fragment.replace(/\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/, '');

        var newUrl = fragment;
        if (model) {
            newUrl = fragment.replace(/([\w-]+)$/g, model.id);
            //newUrl = fragment + '/' + model.get('id');
        }

        ch.command('replaceUrl', newUrl);
    };
    
    /**
     * Ob uspehu
     * 
     * @param {type} model
     * @returns {undefined}
     */
    PdDodajView.prototype.saveSuccess = function (model) {
        this.$('.glava-title').text(this.getTitle(model));
        this.zamenjajUrl(model);
        
        var view = new Urediview(/*{model:model}*/);        
        ch.command('open', view, i18next.t("programDela.title"));
    };
    
    return PdDodajView;
});