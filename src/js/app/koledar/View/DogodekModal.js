/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'marionette',
    'backbone-modal',
    'app/Max/Module/Form',
    'app/Dokument/View/FormView',
    'template!../tpl/dogodek-izbira.tpl',
    'template!../tpl/dogodek-form.tpl',
    'template!../tpl/dogodek-modal.tpl',
    'template!app/Dokument/tpl/form-simple.tpl',
    'formSchema!vaja',
    'template!../tpl/vajaPlan-form.tpl',
    'baseUrl',
    './VajaView'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        Modal,
        Form,
        FormView,
        izbiraTpl,
        tpl,
        modalTpl,
        simpleTpl,
        schemaVaja,
        vajaTpl,
        baseUrl,
        VajaView
        ) {
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
        template: modalTpl,
        regions: {
            izbiraR: '.region-dogodek-izbira',
            podrobnoR: '.region-dogodek-podrobno'
        },
        initialize: function (options) {
            //dodaj default
            this.zacetek = options.zacetek;
            this.konec = options.konec;
        },
        onRender: function () {
            var view = new IzbiraView();

            view.on('render:vaja', this.renderVaja, this);
            view.on('render:predstava', this.renderPredstava, this);
            view.on('render:zasedenost', this.renderZasedenost, this);
            view.on('render:gostovanje', this.renderGostovanje, this);
            view.on('render:splosni', this.renderSplosni, this);

            this.izbiraR.show(view);
        },
        renderIzbiraUprizoritve: function (cb) {
            var sch = {type: 'Toone', targetEntity: 'uprizoritev', editorAttrs: {class: 'form-control'}, title: 'Uprizoritev'};
            var podrobnoView = new Form({
                template: Handlebars.compile('<form><div data-fields="uprizoritev"></div></form>'),
                schema: {
                    uprizoritev: sch
                }
            });
            podrobnoView.on('uprizoritev:change', cb, this);
            this.podrobnoR.show(podrobnoView);
        },
        renderVaja: function () {
            var form = function () {
                var Model = Backbone.Model.extend({
                    urlRoot: baseUrl + '/vaja'
                });
                var model = this.model = new Model();

                var view = this.vajaView = new VajaView({
                    model: model,
                    schema: schemaVaja.toFormSchema().schema
                });

                this.podrobnoR.show(view);
                this.izbiraR.empty();
            };

            this.renderIzbiraUprizoritve(form);
        }
    });
    return function (options) {

        var view = new DogodekModalLayout({
            zacetek: options.zacetek,
            konec: options.konec
        });

        var DM = Modal.extend({
            className: 'dogodek-modal modal'
        });

        var modal = new DM({
            title: i18next.t("dogodek.dodajDogodek"),
            content: view,
            animate: true,
            okText: i18next.t("std.ustvari"),
            cancelText: i18next.t("std.preklici")
        });
        var odpriDogodek = function () {
            var model = view.model;
            if (!view.vajaView.form.commit()) {
                if (options.cb) {
                    options.cb(model);
                }
            } else {
                modal.preventClose();
            }
        };
        return modal.open(odpriDogodek);
    };
});