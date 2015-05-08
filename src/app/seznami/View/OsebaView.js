/* 
 * Licenca GPLv3
 */
define([
    'app/bars',
    'marionette',
    'app/Dokument/View/FormView',
    'app/seznami/View/BaseView',
    'app/Max/View/TabControl',    
    //'app/seznami/View/OsebaTabView',
    'formSchema!oseba',
    'formSchema!trr',
    'formSchema!telefonska',
    'formSchema!postniNaslov',
    'template!../tpl/oseba-form.tpl',
    'template!../tpl/trr-form.tpl',
    'template!../tpl/telefonska-form.tpl',
    'template!../tpl/postniNaslov-form.tpl',
], function (
        Handlebars,
        Marionette,
        FormView,
        BaseView,
        TabControl,        
        //OsebaTabView,
        osebaSchema,
        trrSchema,
        telefonskaSchema,
        postniNaslovSchema,
        osebaFormTpl,
        trrFormTpl,
        telefonskaFormTpl,
        postniNaslovFormTpl
        ) {

    var OsebaView = BaseView.extend({
        url: '/rest/oseba',
        formTemplate: osebaFormTpl,
        schema: osebaSchema,
        name: 'Oseba',
        columns: [
            {
                cell: 'string',
                editable: false,
                label: 'Ime',
                name: 'ime',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Priimek',
                name: 'priimek',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Psevdonim',
                name: 'psevdonim',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'E-pošta',
                name: 'email',
                sortable: false
            },
            {
                cell: 'string',
                editable: false,
                label: 'Uporabnik',
                name: 'user',
                sortable: false
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: 'Briši'},
                    {event: 'uredi', title: 'Uredi'},
                ]
            }
        ]
    });

    OsebaView.prototype.SplosnoFormView = FormView.extend({
        //formTitle: this.name + this.model.get('naziv'),
        buttons: {
            shrani: {
                id: 'doc-shrani',
                label: 'Shrani',
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'doc-preklici',
                label: 'Prekliči',
                element: 'button-trigger',
                trigger: 'preklici'
            }
        },
        schema: osebaSchema.toFormSchema().schema,
        formTemplate: osebaFormTpl,
        initialize : function(){
            this.formTitle = this.name + this.model.get('naziv');
        },
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
    
    OsebaView.prototype.TrrFormView = FormView.extend({
        //formTitle: this.name + this.model.get('naziv'),
        buttons: {
            shrani: {
                id: 'doc-shrani',
                label: 'Shrani',
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'doc-preklici',
                label: 'Prekliči',
                element: 'button-trigger',
                trigger: 'preklici'
            }
        },
        schema: trrSchema.toFormSchema().schema,
        formTemplate: trrFormTpl,
        initialize : function(){
            this.formTitle = this.name + this.model.get('naziv');
        },
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
    OsebaView.prototype.TelefonskaFormView = FormView.extend({
        //formTitle: this.name + this.model.get('naziv'),
        buttons: {
            shrani: {
                id: 'doc-shrani',
                label: 'Shrani',
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'doc-preklici',
                label: 'Prekliči',
                element: 'button-trigger',
                trigger: 'preklici'
            }
        },
        schema: telefonskaSchema.toFormSchema().schema,
        formTemplate: telefonskaFormTpl,
        initialize : function(){
            this.formTitle = this.name + this.model.get('naziv');
        },
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
    OsebaView.prototype.PostninaslovFormView = FormView.extend({
        //formTitle: this.name + this.model.get('naziv'),
        buttons: {
            shrani: {
                id: 'doc-shrani',
                label: 'Shrani',
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'doc-preklici',
                label: 'Prekliči',
                element: 'button-trigger',
                trigger: 'preklici'
            }
        },
        schema: postniNaslovSchema.toFormSchema().schema,
        formTemplate: postniNaslovFormTpl,
        initialize : function(){
            this.formTitle = this.name + this.model.get('naziv');
        },
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

    OsebaView.prototype.onSelected = function (model) {



        var tabs = [
            {
                route: "#",
                title: "Splošno o osebi",
                name: "Splošno",
                view: this.SplosnoFormView
            },
            {
                route: "#",
                title: "Telefonske številke osebe",
                name: "Telefonske",
                view: this.TelefonskaFormView
            },
            {
                route: "#",
                title: "Bančni računi osebe",
                name: "Računi",
                view: this.TrrFormView
            },
            {
                route: "#",
                title: "Poštni naslovi osebe",
                name: "Naslovi",
                view: this.PostninaslovFormView

            }];


        var tc = new TabControl({
            tabs: tabs
        });
        var n = this;
        tc.onChildviewSelect = function (x) {
            n.formR.show(new x.model.attributes.view({model: model}));
        };
        this.tabR.show(tc);

    };

    return OsebaView;
});