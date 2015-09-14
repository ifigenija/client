/* 
 * Licenca GPLv3
 */

define([
    'radio',
    'baseUrl',
    'i18next',
    'marionette',
    './DogodekView',
    'formSchema!dogodek',
    'template!../tpl/zasedenost.tpl',
    'app/Dokument/View/FormView',
    'formSchema!zasedenost',
    'template!../tpl/zasedenost-form.tpl'
], function (
        Radio,
        baseUrl,
        i18next,
        Marionette,
        DogodekView,
        dogodekSchema,
        tpl,
        FormView,
        zasedenostSchema,
        zasedenostFormTpl
        ) {
    var ZasedenostView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'row',
        schema: dogodekSchema.toFormSchema().schema,
        regions: {
            razredR: '.region-razred',
            dogodekR: '.region-dogodek'
        }
    });

    ZasedenostView.prototype.initialize = function (options) {
        if (options.model) {
            this.model = options.model;
        }
    };

    ZasedenostView.prototype.onRender = function () {
        if (this.model.get('title')) {
            this.renderDogodek();
            this.renderZasedenost();
        }
    };

    ZasedenostView.prototype.renderDogodek = function () {
        var view = new DogodekView({
            formTitle: this.model.get('title'),
            model: this.model
        });

        view.on('preklici', this.onPreklici, this);
        view.on('brisi', this.onBrisi, this);

        this.dogodekR.show(view);
    };

    ZasedenostView.prototype.onPreklici = function () {
        this.dogodekR.empty();
        this.osebaR.empty();
        this.trigger('preklici');
    };

    ZasedenostView.prototype.onBrisi = function () {
        this.onPreklici();
        this.trigger('brisi');
    };

    ZasedenostView.prototype.renderZasedenost = function () {
        var zasedenost = this.model.get('zesedenost');

        var Fv = FormView.extend({
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
            schema: zasedenostSchema.toFormSchema().schema,
            formTemplate: zasedenostFormTpl
        });

        var view = new Fv({id: zasedenost});

        this.razredR.show(view);
    };
    
    return ZasedenostView;
});