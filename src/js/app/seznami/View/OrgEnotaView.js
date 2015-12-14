define([
    'radio',
    'i18next',
    'marionette',
    './OrgEnotaTree',
    'app/Dokument/View/FormView',
    'app/Max/View/PaginatedGrid',
    'app/Max/View/TabControl',
    '../Model/OrgEnotaTreeModel',
    '../Model/Zaposlitev',
    'template!../tpl/orgEnota-manager.tpl',
    'template!../tpl/orgEnota-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!organizacijskaEnota',
    'formSchema!zaposlitev',
    'app/Max/Module/Backgrid',
    'template!../tpl/orgEnota-form-simple.tpl',
    'app/Max/Model/LookupModel'
], function (
        Radio,
        i18next,
        Marionette,
        OrgEnotaTree,
        FormView,
        PaginatedGrid,
        TabControl,
        OrgEnotaTreeModel,
        ZaposlitevModel,
        tpl,
        formTpl,
        ZapisiLayout,
        schema,
        schemaZap,
        Backgrid,
        template,
        LookupModel
        ) {

    var tabsVsi = [{
            name: i18next.t('orgEnota.title'),
            event: 'show:form'
        }, {
            name: i18next.t('orgEnota.zaposleni'),
            event: 'show:zaposleni'
        }, {
            name: i18next.t('orgEnota.zapisi'),
            event: 'show:zapisi'
        }];

    var OrgEnotaManager = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            treeR: '#tree-container',
            detailR: '#orgEnota-detail',
            tabsR: '#tabs'
        },
        ui: {
            tabs: 'ul.nav-tabs'
        },
        triggers: {
            'click ': 'hide:tree',
            'click .orgEnota-dodaj': 'dodaj:org:enoto',
            'click .orgEnota-odstrani': 'odstrani:org:enoto'
        },
        columns: [
            {
                cell: 'string',
                editable: false,
                label: i18next.t('std.polnoIme'),
                name: 'label',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('zaposlitev.delovnoMesto'),
                name: 'delovnoMesto',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schemaZap.getOptionValues('status')
                }),
                editable: false,
                label: i18next.t('zaposlitev.status'),
                name: 'status',
                sortable: true
            }
        ]
    });
    OrgEnotaManager.prototype.initialize = function (options) {
        var LM = LookupModel.extend({
            setOrgEnota: function (orgEnota) {
                this.orgEnota = orgEnota;
                this.queryParams.organizacijskaenota = this.orgEnota.id;
            }
        });
        this.seznam = new LM(null, {
            entity: 'zaposlitev'
        });
    };
    OrgEnotaManager.prototype.onRender = function () {
        this.showTree(null);
    };
    OrgEnotaManager.prototype.showTree = function (parent) {
        var treeCollection = new OrgEnotaTreeModel.collection({}, {
            parent: parent
        });
        var tree = new OrgEnotaTree({
            collection: treeCollection
        });
        var self = this;
        treeCollection.fetch();
        tree.on('node:selected', function (view) {
            self.triggerMethod("tree:item:selected", view);
        });
        this.treeR.show(tree);
    };
    OrgEnotaManager.prototype.onTreeItemSelected = function (view) {
        this.selected = view;
        this.seznam.setOrgEnota(this.selected.model);

        var tabs = null;
        if (!this.selected.model.get('id')) {
            tabs = null;
        } else {
            tabs = tabsVsi;
        }
        this.renderTabs(tabs);
    };
    OrgEnotaManager.prototype.onShowZaposleni = function () {
        var self = this;
        var zaposleniGrid = new PaginatedGrid({
            collection: this.seznam,
            columns: this.columns
        });
        this.seznam.getFirstPage({
            reset: true
        });
        self.detailR.show(zaposleniGrid);
    };
    OrgEnotaManager.prototype.onShowZapisi = function () {
        var view = new ZapisiLayout({
            lastnik: this.selected.model.get('id'),
            classLastnika: 'OrganizacijskaEnota'
        });
        this.detailR.show(view);
    };
    OrgEnotaManager.prototype.onHideTree = function () {

    };
    OrgEnotaManager.prototype.onDodajOrgEnoto = function () {
        if (this.selected.model) {
            var model = new OrgEnotaTreeModel.model({
                parent: this.selected.model
            });

            var tabs = null;
            if (!this.selected.model.get('id')) {
                tabs = null;
            } else {
                tabs = tabsVsi;
            }
            this.renderTabs(tabs);
            var form = this.onShowForm(model);
            var self = this;
            form.on('save:success', function () {
                self.showTree(null);
            }, this);
        }
    };
    OrgEnotaManager.prototype.onOdstraniOrgEnoto = function () {
        var self = this;
        this.selected.model.destroy({
            wait: true,
            success: function () {
                console.log('odstrani');
                self.showTree(null);
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };
    OrgEnotaManager.prototype.onShowForm = function (model) {
        if (!model) {
            model = this.selected.model;
        }
        var Fv = this.getFormView(model);

        var form = new Fv({
            model: model
        });

        this.detailR.show(form);
        return form;
    };

    /**
     * 
     * @returns {Marionette.LayoutView@call;extend.prototype.getFormView.form}
     */
    OrgEnotaManager.prototype.getFormView = function (model) {
        var self = this;
        var Fv = FormView.extend({
            formTitle: i18next.t(self.getTitle(model)),
            schema: schema.toFormSchema().schema,
            formTemplate: formTpl,
            //template: template,
            serializeData: function () {
                return  {
                    formTitle: this.formTitle
                };
            },
            buttons: FormView.prototype.defaultButtons,
            onPreklici: function () {
                self.onShowForm();
            }
        });

        return Fv;
    };

    OrgEnotaManager.prototype.getTitle = function (model) {
        var text = i18next.t("orgEnota.nova");

        if (model.get('id')) {
            text = model.get('naziv') || "Naziv";
        }
        return text;
    };

    /**
     * Izris tabov
     * @returns {OsebaEditView_L11.TabControl}
     */
    OrgEnotaManager.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        this.tabsR.show(this.tabControl);
        return this.tabControl;
    };

    return OrgEnotaManager;
});