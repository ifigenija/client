/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    './AlternacijaView',
    './PogodbaView',
    './KoprodukcijaView',
    './StrosekView',
    'template!../tpl/uprizoritev-edit.tpl',
    'template!../tpl/uprizoritev-form.tpl',
    'formSchema!uprizoritev',
    'i18next',
    'app/Max/View/TabControl'
], function (
        DokumentView,
        AlternacijaView,
        PogodbaView,
        KoprodukcijaView,
        StrosekView,
        tpl,
        formTpl,
        shema,
        i18next,
        TabControl
        ) {

    /**
     * Ko urejamo že obstječo uprizoritev
     * @type Array
     */
    var tabVsi = [
        {
            name: i18next.t('seznami.splosno'),
            event: 'splosni'
        },
        {
            name: i18next.t('produkcija.uprizoritev.alternacije'),
            event: 'alternacije'
        },
        {
            name: i18next.t('produkcija.uprizoritev.pogodbe'),
            event: 'pogodbe'
        },
        {
            name: i18next.t('produkcija.uprizoritev.koprodukcije'),
            event: 'koprodukcije'
        },
        {
            name: i18next.t('produkcija.uprizoritev.stroski'),
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
        var naslov = naslovT || i18next.t('produkcija.uprizoritev.naslov');
        return naslov;
    };

    UprizoritevStrosekEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('produkcija.uprizoritev.nova') : this.getNaslovUprizoritve();
    };

    UprizoritevStrosekEditView.prototype.onBeforeRender = function () {
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };

    UprizoritevStrosekEditView.prototype.onRender = function () {
        var tabs = null;

        if (!this.model.get('id')) {
            tabs = null;
        } else {
            tabs = tabVsi;
        }

        this.renderTabs(tabs);
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
     * Klik na tab za koprodukcija podatke 
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.onKoprodukcije = function () {
        this.skrijSplosni();
        this.renderKoprodukcije();
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
            c.fetch();
        }
        
        var view = new AlternacijaView({
            collection: c,
            dokument: this.model
        });
        view.detailName = 'alternacije';
        view.name = i18next.t('uprizoritev.alternacije');
        
        this.regionDetail.show(view);
    };

    /**
     * Urejanje igralcev
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.renderPogodbe = function () {
        var c = this.model.pogodbeCollection;
        if (c.length === 0) {
            c.fetch();
        }
        
        var view = new PogodbaView({
            collection: c,
            dokument: this.model
        });
        view.detailName = 'pogodbe';
        view.name = i18next.t('uprizoritev.pogodbe');
        
        this.regionDetail.show(view);
    };

    /**
     * 
     * Render pogleda za ostale sodelujoče
     * 
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.renderKoprodukcije = function () {
        var c = this.model.koprodukcijeCollection;
        if (c.length === 0) {
            c.fetch();
        }
        
        var view = new KoprodukcijaView({
            collection: c,
            dokument: this.model
        });
        view.detailName = 'koprodukcije';
        view.name = i18next.t('uprizoritev.koprodukcije');
        
        this.regionDetail.show(view);
    };
    /**
     * 
     * Render pogleda za ostale sodelujoče
     * 
     * @returns {undefined}
     */
    UprizoritevStrosekEditView.prototype.renderStroski = function () {
        var c = this.model.stroskiCollection;
        if (c.length === 0) {
            c.fetch();
        }
        
        var view = new StrosekView({
            collection: c,
            dokument: this.model
        });
        view.detailName = 'stroski';
        view.name = i18next.t('uprizoritev.stroski');
        
        this.regionDetail.show(view);
    };

    return UprizoritevStrosekEditView;
});
