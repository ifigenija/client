/* 
 * Licenca GPLv3
 */
define([
    'app/bars',
    'marionette',
    'app/Dokument/View/FormView',
    'app/seznami/View/BaseView',
    'app/Max/View/TabControl',
    'template!../tpl/oseba-form.tpl',
    'app/seznami/View/OsebaTabView',
    'formSchema!oseba'
], function (
        Handlebars,
        Marionette,
        FormView,
        BaseView,
        TabControl,
        formTpl,
        OsebaTabView,
        schema
        ) {

    var OsebaView = BaseView.extend({
        url: '/rest/oseba',
        formTemplate: formTpl,
        schema: schema,
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
    
    OsebaView.prototype.splosnoForm = FormView.extend({
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
                schema: schema.toFormSchema().schema,
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
            
    OsebaView.prototype.onSelected = function (model) {

            var tabs = [
                {
                    route: "#",
                    title: "Splošno o osebi",
                    name: "Splošno",
                    view: this.splosnoForm
                },
                {
                    route: "#",
                    title: "Telefonske številke osebe",
                    name: "Telefonske",
                    view: Marionette.ItemView.extend({template: Handlebars.compile("yyyy")})

                },
                {
                    route: "#",
                    title: "Bančni računi osebe",
                    name: "Računi",
                    view: Marionette.ItemView.extend({template: Handlebars.compile("xxxx")})

                },
                {
                    route: "#",
                    title: "Poštni naslovi osebe",
                    name: "Naslovi",
                    view: Marionette.ItemView.extend({template: Handlebars.compile("xxxx")})

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