/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'marionette',
    'backbone-modal',
    '../Model/Dogodek',
    'app/Dokument/View/FormView',
    'template!../tpl/dogodek-izbira.tpl',
    'formSchema!dogodek/vaja',
    'template!../tpl/vajaPlan-form.tpl',
    'template!app/Dokument/tpl/form-simple.tpl',
    'formSchema!dogodek/predstava',
    'template!../tpl/predstavaPlan-form.tpl',
    'formSchema!dogodek/zasedenost',
    'template!../tpl/zasedenostPlan-form.tpl',
    'formSchema!dogodek/splosni',
    'template!../tpl/splosniPlan-form.tpl',
    'formSchema!dogodek/gostovanje',
    'template!../tpl/gostovanjePlan-form.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        Marionette,
        Modal,
        Dogodek,
        FormView,
        izbiraTpl,
        schemaVaja,
        formVajaTpl,
        tpl,
        schemaPredstava,
        formPredstavaTpl,
        schemaZasedenost,
        formZasedenostTpl,
        schemaSplosni,
        formSplosniTpl,
        schemaGostovanje,
        formGostovanjeTpl
        ) {

    var Fv = FormView.extend({
        buttons: {
            preklici: {
                id: 'doc-preklici',
                label: i18next.t('std.preklici'),
                element: 'button-trigger',
                trigger: 'preklici'
            },
            nasvet: {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        },
        template: tpl
    });
    var IzbiraView = Marionette.ItemView.extend({
        template: izbiraTpl,
        triggers: {
            'click .dogodek-vaja': 'render:vaja',
            'click .dogodek-predstava': 'render:predstava',
            'click .dogodek-zasedenost': 'render:zasedenost',
            'click .dogodek-gostovanje': 'render:gostovanje',
            'click .dogodek-splosni': 'render:splosni'
        }
    });
    var DogodekModalLayout = Marionette.LayoutView.extend({
        tagName: 'div',
        template: Handlebars.compile('<div class="region-modal"></div>'),
        regions: {
            modalR: '.region-modal'
        },
        onRender: function () {
            this.renderIzbira();
        },
        renderIzbira: function () {
            var view = new IzbiraView();
            this.modalR.show(view);
            view.on('render:vaja', this.renderVaja, this);
            view.on('render:predstava', this.renderPredstava, this);
            view.on('render:zasedenost', this.renderZasedenost, this);
            view.on('render:gostovanje', this.renderGostovanje, this);
            view.on('render:splosni', this.renderSplosni, this);
        },
        getFormView: function (options) {
            var Model = Dogodek.Model.extend({
                view: options.modelView
            });
            var model = new Model();
            var Form = Fv.extend({
                formTemplate: options.formTpl
            });
            var view = this.form = new Form({
                model: model,
                schema: options.schema.toFormSchema().schema
            });

            view.on('preklici', this.renderIzbira, this);

            return view;
        },
        renderVaja: function () {

            var view = this.getFormView({
                modelView: 'vaja',
                schema: schemaVaja,
                formTpl: formVajaTpl
            });

            this.modalR.show(view);
        },
        renderPredstava: function () {
            var view = this.getFormView({
                modelView: 'predstava',
                schema: schemaPredstava,
                formTpl: formPredstavaTpl
            });

            this.modalR.show(view);
        },
        renderZasedenost: function () {
            var view = this.getFormView({
                modelView: 'zasedenost',
                schema: schemaZasedenost,
                formTpl: formZasedenostTpl
            });

            this.modalR.show(view);
        },
        renderGostovanje: function () {
            var view = this.getFormView({
                modelView: 'gostovanje',
                schema: schemaGostovanje,
                formTpl: formGostovanjeTpl
            });

            this.modalR.show(view);
        },
        renderSplosni: function () {
            var view = this.getFormView({
                modelView: 'splosni',
                schema: schemaSplosni,
                formTpl: formSplosniTpl
            });

            this.modalR.show(view);
        }
    });
    return function (options) {

        var model = new Dogodek.Model();
        var zacetek = options.zacetek;
        var konec = options.konec;
        if (zacetek) {
            model.set('zacetek', zacetek);
        }
        if (konec) {
            model.set('konec', konec);
        }

        var view = new DogodekModalLayout();
        var modal = new Modal({
            title: i18next.t("dogodek.title"),
            content: view,
            animate: true,
            okText: i18next.t("std.ustvari"),
            cancelText: i18next.t("std.preklici")
        });
        var odpriDogodek = function () {
            var view = modal.options.content;
            //tukaj je drugače ker formview.commit vrne true če ni napake
            //form pa vrne false če ni napake zato je tu drugače, kot pri ostalih
            if (view.form.commit()) {
                if (options.cb) {
                    options.cb(view);
                }
            } else {
                modal.preventClose();
            }
        };
        return modal.open(odpriDogodek);
    };
});