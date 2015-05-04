define([
    'marionette',
    'underscore',
    'app/bars',
    'text!../tpl/form.tpl'
], function (
        Marionette,
        _,
        Handlebars,
        tpl
        ) {

    var FormView = Marionette.LayoutView.extend({
        template: Handlebars.compile(tpl),
        form: null,
        formMeta: null,
        formTemplate: null,
        buttons: {},
        constructor: function (options) {
            var entity = (options.collection || options.model).entity;
            if (!entity) {
                throw new Error('FormView nima definirane entitete.');
            }
            var app = window.App;
            // dobimo formMeta podatke
            this.formMeta = app.request('formMeta', entity);

            Marionette.LayoutView.call(this, options);

            if (!this.regionForm) {
                this.addRegions({regionForm: '.region-form'});
            }
            if (!this.regionToolbar) {
                this.addRegions({regionToolbar: '.region-toolbar'});
            }
            this.on('render', this.renderFormAndToolbar, this);
        }
    });

    FormView.prototype.renderFormAndToolbar = function () {
        this.toolbarView = this.renderToolbar();
        this.form = this.model ? this.renderForm() : null;


    };

    FormView.prototype.onShrani = function () {
        var self = this;
        if (this.commit()) {
            this.model.save(null, {
                success: function (model) {
                    self.triggerMethod('save:success', model);
                },
                error: window.App.FlashManager.fromXhr
            });
        }
    };

    FormView.prototype.prepareToolbar = function () {
        return [Object.keys(this.buttons).map(function (key) {
                return this.buttons[key];
            }, this)];
    };

    FormView.prototype.renderToolbar = function () {

        var groups = this.prepareToolbar();
        var app = window.App;
        var toolbar = app.request('makeToolbar', {
            buttonGroups: groups,
            listener: this,
            size: 'md'
        });

        this.regionToolbar.show(toolbar);
        return toolbar;
    };


    FormView.prototype.getToolbarModel = function () {
        return this.regionToolbar.currentView.collection;
    };


    /**
     * Disabla seznam polj v metapodatkih forme 
     * 
     * @returns Form
     */
    FormView.prototype.disableFields = function (fields) {

        _.each(this.formMeta.schema, function (e) {
            if (fields.indexOf(e.name) >= 0) {
                e.editorAttrs.disabled = 'disabled';
            } else {
                delete e.editorAttrs.disabled;
            }
        });
    };

    /**
     * Nariše formo. Ko nariše formo sproži event render:form
     * 
     * @returns Backbone.Form
     */
    FormView.prototype.renderForm = function () {


        var ui = window.App.UI;
        var form = this.form = new ui.Form({
            template: this.formTemplate,
            schema: this.formMeta.schema,
            model: this.model
        });

        this.regionForm.show(form);
        form.on('change', this.formChange, this);
        this.triggerMethod('render:form', form);
        return form;
    };

    FormView.prototype.formChange = function (form) {
        this.triggerMethod('form:change', form);
    };

    FormView.prototype.isNew = function () {
        return !this.model.id;
    };

    FormView.prototype.commit = function () {
        var errors = this.form.commit({validate: true});
        var fm = window.App.FlashManager;
        if (errors) {
            fm.fromValidation(errors, this.formMeta.schema);
            return false;
        } else {
            return true;
        }
    };

    return FormView;
});