/* 
 * Licenca GPLv3
 */

define([
    'i18next',
    'marionette',
    'app/Dokument/View/FormView',
    './DogodekView',
    'formSchema!zasedenost',
    'template!../tpl/zasedenost-form.tpl',
    'template!../tpl/zasedenostLayout.tpl'
], function (
        i18next,
        Marionette,
        FormView,
        DogodekView,
        schema,
        tpl,
        layoutTpl
        ) {
    var ZasedenostView = FormView.extend({
        formTitle: i18next.t('dogodek.title'),
        buttons: {
            shrani: {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
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
            },
            brisi: {
                id: 'doc-brisi',
                label: i18next.t('std.brisi'),
                element: 'button-trigger',
                trigger: 'brisi'
            }
        },
        schema: schema.toFormSchema().schema,
        formTemplate: tpl
    });

    /**
     * LayoutView od zasedenosti
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var ZasedenostLayoutView = Marionette.LayoutView.extend({
        template: layoutTpl,
        regions: {
            razredR: '.region-razred',
            dogodekR: '.region-dogodek'
        }
    });
    
    ZasedenostLayoutView.prototype.initialize = function (options) {
        if (options.model) {
            this.model = options.model;
        }
    };

    ZasedenostLayoutView.prototype.onRender = function () {
        this.renderRazred();
        this.renderDogodek();
    };
    
    ZasedenostLayoutView.prototype.renderRazred = function () {
        var view = new ZasedenostView();
        this.razredR.show(view);        
    };
    
    ZasedenostLayoutView.prototype.renderDogodek = function () {
        var view = new DogodekView();
        this.dogodekR.show(view);
    };

    ZasedenostLayoutView.prototype.renderDogodek = function () {
        var view = new DogodekView({
            formTitle: this.model.get('title'),
            model: this.model
        });

        view.on('preklici', this.onPreklici, this);
        view.on('brisi', this.onBrisi, this);

        this.dogodekR.show(view);
    };
    
    ZasedenostLayoutView.prototype.onPreklici = function () {
        this.dogodekR.empty();
    };

    ZasedenostLayoutView.prototype.onBrisi = function () {
        this.onPreklici();
        this.trigger('brisi');
    };

    return ZasedenostView;
});