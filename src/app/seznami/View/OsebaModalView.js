/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'radio',
    'app/Dokument/View/FormView',
    'app/seznami/Model/Oseba',
    'template!../tpl/modal.html',
    'app/Max/View/Toolbar',
    'i18next',
    'template!../tpl/oseba-form.tpl',
    'template!../tpl/modal-form.tpl',
    'formSchema!oseba',
    'backbone',
    'backbone-modal'
], function (
        Marionette,
        Radio,
        FormView,
        Model,
        tpl,
        Toolbar,
        i18next,
        formTemplate,
        modalFormTpl,
        schema,
        Backbone,
        Modal
        ) {

    var OsebaModalView = Marionette.LayoutView.extend({
        template: tpl,
        formTemplate: null,
        schema: null,
        title: null,
        regions: {
            formR: '.modal-forma',
            toolbarR: '.modal-toolbar',
            naslovR: '.modal-naslov'
        }
    });

    OsebaModalView.prototype.initialize = function (options) {

        this.formTemplate = options.formTemplate || formTemplate;

        if (!this.formTemplate) {
            //Radio.channel('error').command('flash', {message: 'formtemplate', code: 0, severity: 'error'});
            console.log("podaj formtemplate");
        }

        this.schema = options.schema || schema;

        if (!this.schema) {
            console.log("podaj schemo");
        }

        this.title = options.title || "idi nekam lovor";

        if (!this.title) {
            console.log("podaj title");
        }

    };

    OsebaModalView.prototype.onRender = function () {

        this.$('.modal-naslov').text(this.title);

        var model = new Model.Model();
        
        this.renderToolbar();
    };
    OsebaModalView.prototype.renderToolbar = function () {
        var tool = [[
                {
                    id: 'doc-dodaj',
                    label: i18next.t('entiteta.dodaj'),
                    element: 'button-trigger',
                    trigger: 'dodaj'
                }
            ]];

        var tb = new Toolbar({
            buttonGroups: tool,
            listener: this
        });

        this.toolbarR.show(tb);
    };

    OsebaModalView.prototype.getFormView = function (model) {
        var Fv = FormView.extend({
            schema: this.schema.toFormSchema().schema,
            formTemplate: this.formTemplate,
            template: modalFormTpl
        });

        return  new Fv({
            model: model
        });
    };
    
    OsebaModalView.prototype.onDodaj = function () {
        var model = new Model.Model();
        var view = this.getFormView(model);
        
        var modal = new Modal({
            content: view,
            title: i18next.t("entiteta.oseba"),
            animate: true,
            okText: "Shrani",
            cancelText: "Prekliči"
        }).open(function (){view.onShrani();});
        
        modal.listenTo(modal, 'ok', function(){modal.preventClose();});
        modal.listenTo(view, 'save:success', function(model){modal.close(); console.log(model);});
        this.listenTo(view, 'save:success', function(model){var form = this.getFormView(model); this.formR.show(form);});
    };

    return OsebaModalView;
});