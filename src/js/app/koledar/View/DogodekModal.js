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
    './VajaPlanView',
    'template!../tpl/dogodek-izbira.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        Marionette,
        Modal,
        DogodekModel,
        VajaPlanView,
        izbiraTpl
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
            view.on('render:vaja',this.renderVaja,this);
            view.on('render:predstava',this.renderPredstava,this);
            view.on('render:zasedenost',this.renderZasedenost,this);
            view.on('render:gostovanje',this.renderGostovanje,this);
            view.on('render:splosni',this.renderSplosni,this);
        },
        renderVaja: function(){
            var view = new VajaPlanView({
                schema: null
            });
            view.on('preklici',this.renderIzbira,this);
            this.modalR.show(view);
        },
        renderPredstava: function(){
            console.log('predstava');
        },
        renderZasedenost: function(){
            console.log('zasedenost');
        },
        renderGostovanje: function(){
            console.log('gostovanje');
        },
        renderSplosni: function(){
            console.log('splosni');
        }
    });

    return function (options) {

        var model = new DogodekModel.Model();

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
            okText: i18next.t("std.izberi"),
            cancelText: i18next.t("std.preklici")
        });

        var odpriDogodek = function () {
            var view = modal.options.content;
            if (!view.form.commit()) {
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