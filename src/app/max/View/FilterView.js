define([
    'jquery',
    'baseUrl',
    'backbone',
    'marionette',
    'underscore'
], function (
        $, baseUrl,
        Backbone,
        Marionette, _
        ) {
    var filterTemplate = _.template('\
<div class="btn-group btn-group-sm filter-action"></div>\
<div class="filter-form"></div>');
    var FilterView = Marionette.Layout.extend({
        template: filterTemplate,
        regions: {
            toolbarR: '.filter-action',
            formR: '.filter-form'
        },
        events: {
            'keypress .form-group:not(.lookup)  input': 'handleKeypress',
            'click input[type="checkbox"]': 'checkToggle'
        },
        initialize: function (options) {
            options = options || {};
            _.extend(this, _.pick(options, 'data', 'schema', 'kontekst', 'print', 'printLink'));
           
            var kontekstName = window.App.request('activeTab').get('url');
            if (!this.kontekst) {
                this.kontekst = kontekstName;
            }

            var fieldTemplate = _.template('\
    <div class="form-group field-<%= key %>">\
      <label for="<%= editorId %>"><%= title %></label>\
      <% if ( typeof editorAttrs == "undefined" || typeof editorAttrs.prependIcon == "undefined") { %>\
        <div data-editor></div>\
      <% } else {%>\
      <div class="input-group" data-editor>\
<span class="input-group-addon"><i class="<%= editorAttrs.prependIcon %>"></i></span>\
</div>\
      <% } %>\
      <div class="col-xs-12">\
        <div class="pull-right hidden help-block"><%= help %></div>\
        <div class="error-block pull-right" data-error></div>\
      </div>\
    </div>\
  ');

            var formTemplate = _.template('<form class="form-vertical"><div data-fieldsets></div></form>');
            _.each(this.schema, function (f) {
                f.template = fieldTemplate;
            });
            var ui = window.App.UI;
            this.form = new ui.Form({
                template: formTemplate,
                schema: this.schema,
                data: this.data,
                Field: ui.Form.Field.extend({template: fieldTemplate})
            });

            var search = {
                id: 'search',
                element: 'button-trigger',
                icon: 'fa fa-search',
                label: 'Išči',
                class: 'btn-primary',
                trigger: 'sprozi:iskanje'
            };
            var kontekst = {
                id: 'savesearch',
                element: 'button-kontekst',
                icon: 'fa fa-ellipsis-vertical',
                listener: this,
                kontekst: this.kontekst,
                form: this.form,
                label: ''
            };
            var selectTab = {
                id: 'selectTab',
                element: 'button-selectTab',
                icon: 'fa fa-copy',
                label: '',
                title: 'Izberi tabelo',
                class: 'btn-primary'
            };
            var print = {
                id: 'print',
                element: 'button-trigger',
                icon: 'fa fa-print',
                label: '',
                class: 'btn-primary',
                trigger: 'print'
            };
            var help = {
                id: 'help',
                element: 'buttonO-form-help',
                icon: 'fa fa-question-sign',
                form: this.form
            };
            var hide = {
                id: 'hide',
                element: 'button-trigger',
                icon: 'fa fa-caret-left',
                trigger: 'hide:sidebar'
            };

            var buttons;
            if (this.print) {
                buttons = [[search, kontekst, selectTab, print, help, hide]];
            } else {
                buttons = [[search, kontekst, selectTab, help, hide]];
            }

            this.toolbar = window.App.request('makeToolbar', {
                size: 'sm',
                listener: this,
                buttonGroups: buttons
            });

            this.lazyIskanje = _.debounce(this.onSproziIskanje, 600);

            if (this.print && !this.printLink) {
                var fg = Backbone.history.fragment;
                var path = fg.substring(fg.indexOf('!') + 1);
                this.printLink = baseUrl + '/' + path + 'Print';
            }
        },
        onRender: function () {
            this.formR.show(this.form);
            if (this.data) {
                this.setValue(this.data);
            }
            this.toolbarR.show(this.toolbar);
        },
        onFilterSelect: function (kontekst) {
            this.form.setValue(kontekst.get('data'));
            if (kontekst.get('auto')) {
                this.onSproziIskanje();
            }
        },
        getValue: function (value) {
            this.form.getValue();
        },
        setValue: function (value) {
            this.form.setValue(value);
        },
        onSproziIskanje: function () {
            var err = this.form.validate();
            var App = Marionette.app;
            if (!err) {
                this.trigger('filter', this.form.getValue());
            } else {
                App.FlashManager.formErrors(err, this.form.schema);
            }
            return false;
        },
        onPrint: function () {
            var fm = window.App.FlashManager;
            $.get(this.printLink, {filter: this.form.getValue()}, function (data) {
                if (data.success) {
                   fm.flash({message: 'Dodan job', severity: 'info'});
                } else {
                    fm.flash({
                        message: 'Dodajanje joba ni uspelo: ' + data.error,
                        severity: 'error'
                    });
                }
            });
        },
        onBeforeClose: function () {
            this.form.undelegateEvents();
            this.form.remove();
            //  delete this.model;
            delete this.form;

        },
        handleKeypress: function (e) {
            if (e.keyCode === 13) {
                this.onSproziIskanje();
                return false;
            } else {
//                this.lazyIskanje();
            }
        },
        checkToggle: function (e) {
            //this.lazyIskanje();
        }
    });
    return FilterView;
});