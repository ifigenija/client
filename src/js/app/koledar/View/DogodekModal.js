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
    '../Model/Dogodek'
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
        Dogodek
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
            this.zacetek = options.zacetek || moment();
            this.konec = options.konec || moment();
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
         * @param {String} model: določimo url modela
         * @returns {undefined}
         */
        initModel: function(model){
            var model = this.model = new Dogodek({
                view: 'vaja'
            });
            
            if (this.zacetek) {
                model.set('zacetek', this.zacetek);
            }
            model.set('konec', this.konec);
            
            return model;
        },
        onVaja: function () {
            this.initModel('vaja');
            this.renderIzbiraUprizoritve(i18next.t('vaja.title'));
        },
        onPredstava: function () {
            this.initModel('predstava');
            this.renderIzbiraUprizoritve(i18next.t('predstava.title'));
        },
        onGostovanje: function () {
            this.initModel('gostovanje');
            this.preklici();
        },
        onSplosni: function () {
            this.initModel('splosni');
            this.preklici();
        },
        onTehnicni: function () {
            this.initModel('tehnicni');
            this.preklici();
        },
        onZasedenost: function () {
            this.initModel('zasedenost');
            this.preklici();
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
            if (options.cb) {
                options.cb(model);
            }
        };
        return modal.open(odpriDogodek);
    };
});