/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    './AvtorBesedilaView',
    'template!../tpl/besedilo-dok.tpl',
    'template!../tpl/besedilo-form.tpl',
    'formSchema!besedilo',
    'i18next',
    'radio'
], function (
        DokumentView,
        AvtorBesedilaView,
        tpl,
        formTpl,
        shema,
        i18next,
        Radio
        ) {
    /**
     * Urejanje uprizoritev 
     * @type DokumentView
     */
    var BesediloDokView = DokumentView.extend({
        className: 'besedilo',
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        regions: {
            avtorjiR: '.region-avtorji'
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
        }
    };

    BesediloDokView.prototype.renderAvtorji = function () {

        var c = this.model.avtorjiCollection;
        if (c.length === 0) {
            c.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }

        var view = new AvtorBesedilaView({
            collection: c,
            dokument: this.model
        });

        this.avtorjiR.show(view);

    };

    return BesediloDokView;
});
