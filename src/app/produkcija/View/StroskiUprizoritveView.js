/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../tpl/uprizoritev-edit.tpl',
    'template!../tpl/uprizoritev-form.tpl',
    'formSchema!uprizoritev',
    'i18next',
    'app/Max/View/TabControl',
    'radio'
], function (
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next,
        TabControl,
        Radio
        ) {

    /**
     * Ko urejamo že obstječo uprizoritev
     * @type Array
     */
    var tabVsi = [
        {
            name: i18next.t('entiteta.splosno'),
            event: 'splosni'
        },
        {
            name: i18next.t('strupr.alternacije'),
            event: 'alternacije'
        },
        {
            name: i18next.t('strupr.pogodbe'),
            event: 'pogodbe'
        },
        {
            name: i18next.t('strupr.stroski'),
            event: 'stroski'
        }
    ];



    /**
     * Urejanje uprizoritev 
     * @type DokumentView
     */
    var UprizoritevStrosekEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        regions: {
            regionDetail: '.region-detail',
            regionTabs: '.uprizoritev-tabs'
        }
    });


    UprizoritevStrosekEditView.prototype.getNaslovUprizoritve = function () {
        var naslovT = this.model.get('naslov');
        var naslov = naslovT || i18next.t('strupr.title');
        return naslov;
    };

    UprizoritevStrosekEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('uprizoritev.nova') : this.getNaslovUprizoritve();
    };

    UprizoritevStrosekEditView.prototype.initialize = function (options) {
        var self = this;
        this.listenTo(this.model, 'sync', function () {
            self.render();
        });
    };

    UprizoritevStrosekEditView.prototype.onRender = function () {
        this.renderTabs(tabVsi);
    };

    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.onSplosni = function () {
        this.$('.pnl-detail').removeClass('active');
        this.$('.pnl-splosno').addClass('active');
    };

    /**
     * Skrije vsebino splosnega tab-a
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.skrijSplosni = function () {
        this.$('.pnl-splosno').removeClass('active');
        this.$('.pnl-detail').addClass('active');
    };

    /**
     * 
     * Klik na tab za arhivalije podatke 
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.onAlternacije = function () {
        this.skrijSplosni();
        this.renderAlternacije();
    };
    /**
     * Klik na tab za pogodbe podatke 
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.onPogodbe = function () {
        this.skrijSplosni();
        this.renderPogodbe();
    };
    /**
     * Klik na tab za pogodbe podatke 
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.onStroski = function () {
        this.skrijSplosni();
        this.renderStroski();
    };

    /**
     * Izris tabov
     * @returns {OsebaEditView_L11.TabControl}
     */
    UprizoritevStrosekEditView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        this.regionTabs.show(this.tabControl);
        return this.tabControl;
    };

    /**
     * Render pogleda umetniške ekipe
     * 
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.renderAlternacije = function () {

        var c = this.model.alternacijeCollection;
        if (c.length === 0) {
            c.fetch({
                error: function () {
                    Radio.channel('error').command('flash', {
                        message: i18next.t("napaka.fetch") + ' ' + '(Alternacije)',
                        code:'9000005',
                        severity: 'error'
                    });
                }
            });
        }

        var self = this;

        require(['app/produkcija/View/AlternacijaView'], function (AlternacijaView) {

            var view = new AlternacijaView({
                collection: self.model.alternacijeCollection,
                dokument: self.model
            });

            view.listenTo(view, "save:success", function () {
                view.renderList();
            });

            self.regionDetail.show(view);
        });
    };

    /**
     * Urejanje igralcev
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.renderPogodbe = function () {

        var c = this.model.pogodbeCollection;
        if (c.length === 0) {
            c.fetch({
                error: function () {
                    Radio.channel('error').command('flash', {
                        message: i18next.t("napaka.fetch") + ' ' + '(Pogodbe)',
                        code:'9000006',
                        severity: 'error'
                    });
                }
            });
        }

        var self = this;

        require(['app/produkcija/View/PogodbaView'], function (PogodbaView) {
            var view = new PogodbaView({
                collection: self.model.pogodbeCollection,
                dokument: self.model
            });

            view.listenTo(view, "save:success", function () {
                view.renderList();
            });

            self.regionDetail.show(view);
        });
    };
    /**
     * 
     * Render pogleda za ostale sodelujoče
     * 
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.renderStroski = function () {
        var self = this;
        require(['app/produkcija/View/StrosekView'], function (StrosekView) {
            var view = new StrosekView({
                collection: self.model.stroskiCollection,
                dokument: self.model
            });
            self.regionDetail.show(view);
        });
    };

    return UprizoritevStrosekEditView;
});
