/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    '../Model/Uprizoritev',
    './FunkcijeView',
    'template!../tpl/uprizoritev-edit.tpl',
    'template!../tpl/uprizoritev-form.tpl',
    'formSchema!uprizoritev',
    'i18next',
    'app/Max/View/TabControl'
], function (
        DokumentView,
        Uprizoritev,
        FunkcijeView,
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
            name: i18next.t('seznami.view.splosno'),
            event: 'splosni'
        },
        {
            name: i18next.t('produkcija.view.uprizoritev.umetniskeEkipe'),
            event: 'umetniki'
        },
        {
            name: i18next.t('produkcija.view.uprizoritev.nastopajoci'),
            event: 'igralci'
        },
        {
            name: i18next.t('produkcija.view.uprizoritev.ostaliSodelujoci'),
            event: 'tehniki'
        }
    ];



    /**
     * Urejanje uprizoritev 
     * @type DokumentView
     */
    var UprizoritevEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        regions: {
            regionDetail: '.region-detail',
            regionTabs: '.uprizoritev-tabs'
        }
    });


    UprizoritevEditView.prototype.getNaslovUprizoritve = function () {
        var naslovT = this.model.get('naslov');
        var naslov = naslovT || i18next.t('produkcija.view.uprizoritev.naslov');
        return naslov;
    };

    UprizoritevEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('produkcija.view.uprizoritev.nova') : this.getNaslovUprizoritve();
    };

    UprizoritevEditView.prototype.onBeforeRender = function () {
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };

    UprizoritevEditView.prototype.onRender = function () {
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
    UprizoritevEditView.prototype.onSplosni = function () {
        this.$('.pnl-detail').removeClass('active');
        this.$('.pnl-splosno').addClass('active');
    };

    /**
     * Skrije vsebino splosnega tab-a
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.skrijSplosni = function () {
        this.$('.pnl-splosno').removeClass('active');
        this.$('.pnl-detail').addClass('active');
    };



    /**
     * 
     * Klik na tab za arhivalije podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onUmetniki = function () {
        this.skrijSplosni();
        this.renderUmetniki();
    };
    /**
     * Klik na tab za arhivalije podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onIgralci = function () {
        this.skrijSplosni();
        this.renderIgralci();
    };

    /**
     * Klik na tab za arhivalije podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onTehniki = function () {
        this.skrijSplosni();
        this.renderTehniki();
    };

    /**
     * Klik na tab za koprodukcija podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onKoprodukcija = function () {
        this.skrijSplosni();
        this.renderKoprodukcija();
    };

    /**
     * Izris tabov
     * @returns {OsebaEditView_L11.TabControl}
     */
    UprizoritevEditView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        this.regionTabs.show(this.tabControl);
        return this.tabControl;
    };

    /**
     * Nariše view za funkcije  - se uporabi za umetnike, igralce in tehnike
     * @param {String} name
     * @param {String} detailName
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.renderFunkcije = function (coll, name, detailName) {
        var view = new FunkcijeView({
            collection: coll,
            dokument: this.model
        });
        view.detailName = detailName;
        view.name = i18next.t(name);
        this.regionDetail.show(view);
    };

    /**
     * Render pogleda umetniške ekipe
     * 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.renderUmetniki = function () {

        var c = this.model.umetnikiCollection;
        if (c.length === 0) {
            c.fetch();
        }
        this.renderFunkcije(c, 'uprizoritev.view.umetniki', 'umetniki');

    };

    /**
     * Urejanje igralcev
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.renderIgralci = function () {
        var c = this.model.igralciCollection;
        if (c.length === 0) {
            c.fetch();
        }
        this.renderFunkcije(c, 'uprizoritev.view.igralci', 'igralci');
    };

    /**
     * 
     * Render pogleda za ostale sodelujoče
     * 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.renderTehniki = function () {
        var c = this.model.tehnikiCollection;
        if (c.length === 0) {
            c.fetch();
        }
        this.renderFunkcije(c,'uprizoritev.view.tehniki', 'tehniki');
    };

    return UprizoritevEditView;
});
