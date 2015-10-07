/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    './AvtorBesedilaView',
    'template!../tpl/besedilo-dok.tpl',
    'template!../tpl/besedilo-form.tpl',
    'formSchema!besedilo',
    'app/Zapisi/View/ZapisiLayout',
    'i18next',
    'radio',
    'backbone'
], function (
        DokumentView,
        AvtorBesedilaView,
        tpl,
        formTpl,
        shema,
        ZapisiLayout,
        i18next,
        Radio,
        Backbone
        ) {
    /**
     * Urejanje uprizoritev 
     * @type DokumentView
     */
    var BesediloDokView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        pogled: null,
        regions: {
            avtorjiR: '.region-avtorji',
            prilogeR: '.region-priloge'
        },
        buttons: {
            shraniDodaj: {
                id: 'doc-shrani-dodaj',
                label: i18next.t('std.shraniDodaj'),
                element: 'button-trigger',
                trigger: 'shraniDodaj',
                disabled: true
            },
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
                title: i18next.t('std.pomoc'),
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        }
    });

    BesediloDokView.prototype.initialize = function (options) {
        var pogled = options.pogled;
        this.pogled = pogled ? pogled : null;
    };

    BesediloDokView.prototype.getNaslovUprizoritve = function () {
        var naslovT = this.model.get('naslov');
        var naslov = naslovT || i18next.t('besedilo.naslov');
        return naslov;
    };

    BesediloDokView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('besedilo.nova') : this.getNaslovUprizoritve();
    };
    
    /**
     * namenjeno je boljšemu workflowu.
     * Shranemo obstoječ model in dodamo nov model 
     * @returns {undefined}
     */
    BesediloDokView.prototype.onShraniDodaj = function () {
        var self = this;
        this.onShrani({
            success: self.posodobiUrlNaslovBrezRender
        });
    };

    BesediloDokView.prototype.onShrani = function (options) {
        DokumentView.prototype.onShrani.apply(this, arguments);
    };

    /*
     * posodobimo url strani in dodamo nov model
     * @returns 
     */
    BesediloDokView.prototype.posodobiUrlNaslovBrezRender = function () {
        // zamenjamo zadnji del url z id (#model/dodaj -> #model/id)
        var url = Backbone.history.location.hash;
        var newUrl = url.replace(/([\w-]+)$/g, this.model.id);
        Radio.channel('layout').command('replaceUrl', newUrl);
        Radio.channel('layout').command('setTitle', this.getNaslov());
        this.trigger('dodaj');
    };
    /**
     * namenjeno vodenju gumbov shrani in (shrani in dodaj)
     * @param FormView form
     */
    BesediloDokView.prototype.formChange = function (form) {
        var tb = this.getToolbarModel();
        var butS = tb.getButton('doc-shrani');
        var butSD = tb.getButton('doc-shrani-dodaj');
        var butP = tb.getButton('doc-preklici');
        
        if (butS && butS.get('disabled')) {
            butS.set({
                disabled: false
            });
        }

        if (butSD && butSD.get('disabled')) {
            butSD.set({
                disabled: false
            });
        }
        
        if (butS && !butS.get('disabled')) {
            butP.set({
                label: i18next.t('std.preklici')
            });
        }

        this.triggerMethod('form:change', form);
    };

    BesediloDokView.prototype.onBeforeRender = function () {
        var self = this;
        this.listenToOnce(this.model, 'sync', function (coll) {
            self.render();
        });
    };

    BesediloDokView.prototype.onRender = function () {
        if (this.model.get('id') && this.pogled === null) {
            this.renderAvtorji();
            this.renderPriloge();
        }
    };

    BesediloDokView.prototype.renderAvtorji = function () {
        var view = new AvtorBesedilaView({
            collection: this.model.avtorjiCollection,
            dokument: this.model,
            zapirajFormo: true
        });

        view.on('avtor:save', this.avtorSave, this);

        this.avtorjiR.show(view);

    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    BesediloDokView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'Besedilo'
        });
        this.prilogeR.show(view);
    };

    BesediloDokView.prototype.avtorSave = function () {
        var self = this;
        this.model.fetch({
            success: function () {
                var avtor = self.model.get('avtor');
                if (avtor) {
                    self.$('.besedilo-avtor').html(avtor);
                }
            }
        });
    };


    return BesediloDokView;
});
