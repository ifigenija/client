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
    'radio'
], function (
        DokumentView,
        AvtorBesedilaView,
        tpl,
        formTpl,
        shema,
        ZapisiLayout,
        i18next,
        Radio
        ) {
    /**
     * Urejanje uprizoritev 
     * @type DokumentView
     */
    var BesediloDokView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        regions: {
            avtorjiR: '.region-avtorji',
            prilogeR: '.region-priloge'
        }
    });


    BesediloDokView.prototype.getNaslovUprizoritve = function () {
        var naslovT = this.model.get('naslov');
        var naslov = naslovT || i18next.t('besedilo.naslov');
        return naslov;
    };

    BesediloDokView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('besedilo.nova') : this.getNaslovUprizoritve();
    };

    BesediloDokView.prototype.onBeforeRender = function () {
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };

    BesediloDokView.prototype.onRender = function () {
        if (this.model.get('id')) {
            this.renderAvtorji();
            this.renderPriloge();
        }
    };

    BesediloDokView.prototype.renderAvtorji = function () {
        var view = new AvtorBesedilaView({
            collection: this.model.avtorjiCollection,
            dokument: this.model
        });

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

    return BesediloDokView;
});
