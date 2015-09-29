/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/bars',
    'marionette',
    'backbone-modal',
    '../Model/Dogodki',
    'app/Dokument/View/FormView',
    'template!../tpl/dogodek-izbira.tpl',
    'template!../tpl/dogodek-form.tpl'
], function (
        Radio,
        i18next,
        Handlebars,
        Marionette,
        Modal,
        Dogodek,
        FormView,
        izbiraTpl,
        tpl
        ) {

    var Fv = FormView.extend({
        buttons: {
            preklici: {
                id: 'doc-preklici',
                label: i18next.t('std.nazaj'),
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
        initialize: function(options){
            //dodaj default
            this.zacetek = options.zacetek;
            this.konec = options.konec;
        },
        onRender: function () {
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
            title: i18next.t("dogodek.title"),
            content: view,
            animate: true,
            okText: i18next.t("std.ustvari"),
            cancelText: i18next.t("std.preklici")
        });
        var odpriDogodek = function () {
            var model = modal.options.content.form.model;
            //tukaj je drugače ker formview.commit vrne true če ni napake
            //form pa vrne false če ni napake zato je tu drugače, kot pri ostalih
            if (view.form.commit()) {
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