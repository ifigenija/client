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
    'template!../tpl/dogodek-izbira.tpl',
    'template!../tpl/dogodek-modal.tpl',
    'moment',
    '../Model/Dogodek',
    '../Model/TerminiStoritev'
], function (
        Radio,
        i18next,
        Handlebars,
        Backbone,
        Marionette,
        Modal,
        Form,
        izbiraTpl,
        modalTpl,
        moment,
        Dogodek,
        TerminiStoritev
        ) {
    var IzbiraView = Marionette.ItemView.extend({
        template: izbiraTpl,
        triggers: {
            'click .dogodek-vaja': 'render:vaja',
            'click .dogodek-predstava': 'render:predstava',
            'click .dogodek-zasedenost': 'render:zasedenost',
            'click .dogodek-gostovanje': 'render:gostovanje',
            'click .dogodek-splosni': 'render:splosni',
            'click .dogodek-tehnicni': 'render:tehnicni'
        }
    });
    var DogodekModalLayout = Marionette.LayoutView.extend({
        template: modalTpl,
        zacetek: moment(),
        konec: moment(),
        regions: {
            izbiraR: '.dogodek-region-izbira',
            podrobnoR: '.dogodek-region-podrobno'
        },
        initialize: function (options) {
            //dodaj default
            this.zacetek = options.zacetek || this.zacetek;
            this.konec = options.konec || this.konec;
            this.title = options.title || i18next.t('std.naslov');
        },
        onRender: function () {
            var view = new IzbiraView();

            view.on('render:vaja', this.onVaja, this);
            view.on('render:predstava', this.onPredstava, this);
            view.on('render:zasedenost', this.onZasedenost, this);
            view.on('render:gostovanje', this.onGostovanje, this);
            view.on('render:splosni', this.onSplosni, this);
            view.on('render:tehnicni', this.onTehnicni, this);

            this.izbiraR.show(view);
        },
        /**
         * 
         * @param {String} options.model: določimo url modela
         * @param {String} options.title: določimo title dogodka
         * @returns {undefined}
         */
        initModel: function (options) {
            var model = this.model = new Dogodek({
                view: options.view,
                zacetek: this.zacetek,
                konec: this.konec,
                title: options.title
            });

            return model;
        },
        onVaja: function () {
            this.initModel({
                view: 'vaja',
                title: 'Vaja'
            });
            this.renderIzbiraUprizoritve(i18next.t('vaja.title'));
        },
        onPredstava: function () {
            this.initModel({
                view: 'predstava',
                title: 'Predstava'
            });
            this.renderIzbiraUprizoritve(i18next.t('predstava.title'));
        },
        onGostovanje: function () {
            this.initModel({
                view: 'gostovanje',
                title: 'Gostovanje'
            });
            this.preklici();
            this.trigger('potrdi:dogodek');
        },
        onSplosni: function () {
            this.initModel({
                view: 'splosni',
                title: 'Splošni'
            });
            this.preklici();
            this.trigger('potrdi:dogodek');
        },
        onTehnicni: function () {
            this.initModel({
                view: 'tehnicni',
                title: 'Tehnični'
            });
            this.preklici();
            this.trigger('potrdi:dogodek');
        },
        onZasedenost: function () {
            var model = this.model = new TerminiStoritev.prototype.model();

            if (this.zacetek) {
                model.set('planiranZacetek', this.zacetek);
            }
            model.set('planiranKonec', this.konec);

            this.preklici();
            this.trigger('potrdi:dogodek');
        },
        renderIzbiraUprizoritve: function (title) {
            var sch = {type: 'Toone', targetEntity: 'uprizoritev', editorAttrs: {class: 'form-control'}, title: 'Uprizoritev'};
            var podrobnoView = new Form({
                template: Handlebars.compile('<form><div data-fields="uprizoritev"></div></form>'),
                schema: {
                    uprizoritev: sch
                }
            });
            var self = this;

            //določimo uprizoritev modelu
            podrobnoView.on('uprizoritev:change', function () {
                var podatki = podrobnoView.fields.uprizoritev.getValue();
                self.model.set('uprizoritev', podatki.id);
                self.model.set('title', podatki.label + (title ? ' : ' + title : i18next.t('dogodek.title')));
            }, this);

            this.podrobnoR.show(podrobnoView);
        },
        preklici: function () {
            this.podrobnoR.empty();
        }
    });
    return function (options) {

        var view = new DogodekModalLayout({
            zacetek: (options && options.zacetek) ? options.zacetek : moment(),
            konec: (options && options.konec) ? options.zacetek : moment(),
        });

        var DM = Modal.extend({
            className: 'dogodek-modal modal'
        });

        var modal = new DM({
            title: i18next.t("dogodek.dodajDogodek"),
            content: view,
            animate: true,
            okText: i18next.t("std.potrdi"),
            cancelText: i18next.t("std.preklici")
        });

        var zapriModal = function () {
            var model = view.model;
            if (options.cb) {
                options.cb(model);
            }
            modal.close();
        };

        view.on('potrdi:dogodek', zapriModal, this);

        modal.open(zapriModal);
        return modal;
    };
});