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
    'template!../tpl/predstavaPlan-form.tpl'
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
        formPredstavaTpl
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
        renderVaja: function () {
            var Model = Dogodek.Model.extend({
                view: 'vaja'
            });
            var model = new Model();

            var Form = Fv.extend({
                formTemplate: formVajaTpl
            });

            var view = this.form = new Form({
                model: model,
                schema: schemaVaja.toFormSchema().schema
            });

            view.on('preklici', this.renderIzbira, this);
            this.modalR.show(view);
        },
        renderPredstava: function () {
            var Model = Dogodek.Model.extend({
                view: 'predstava'
            });
            var model = new Model();

            var Form = Fv.extend({
                formTemplate: formPredstavaTpl
            });

            var view = this.form = new Form({
                model: model,
                schema: schemaPredstava.toFormSchema().schema,
            });

            view.on('preklici', this.renderIzbira, this);
            this.modalR.show(view);
        },
        renderZasedenost: function () {
            console.log('zasedenost');
        },
        renderGostovanje: function () {
            console.log('gostovanje');
        },
        renderSplosni: function () {
            console.log('splosni');
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