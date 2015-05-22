/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    '../../Model/Uprizoritev',
    'template!../../tpl/uprizoritev/uprizoritev-edit.tpl',
    'template!../../tpl/uprizoritev/uprizoritev-form.tpl',
    'formSchema!uprizoritev',
    'i18next',
    'app/Max/View/TabControl'
], function (
        DokumentView,
        Uprizoritev,
        tpl,
        formTpl,
        shema,
        i18next,
        TabControl
        ) {

    /**
     * Ko dodajamo novo uprizoritev
     * @type Array
     */
    var tabSplosno = [
        {
            name: i18next.t('seznami.view.splosno'),
            event: 'splosni'
        }
    ];

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
            event: 'umetniskaEkipa'
        },
        {
            name: i18next.t('produkcija.view.uprizoritev.nastopajoci'),
            event: 'nastopajoci'
        },
        {
            name: i18next.t('produkcija.view.uprizoritev.ostaliSodelujoci'),
            event: 'ostaliSodelujoci'
        },
        {
            name: i18next.t('produkcija.view.uprizoritev.arhivalije'),
            event: 'arhivalije'
        },
        {
            name: i18next.t('produkcija.view.uprizoritev.stroskovniki'),
            event: 'stroskovniki'
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
            regionDetail: '.region-stroskovniki',
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

        if (this.model.isNew()) {
            tabs = tabSplosno;
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
        this.$('.pnl-detail').removeClassClass('active');
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
     * Klik na tab za stroskovnik podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onStroskovnik = function () {
        this.skrijSplosni();
        this.renderStroskovnik();
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
    UprizoritevEditView.prototype.renderFunkcije = function (name, detailName) {
        var view = new FunkcijeView({
            collection: this.model.igralciCollection,
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
        var self = this;

        if (self.model.umetnikiCollection.length === 0) {
            self.model.umetnikiCollection.fetch();
        }
        this.renderFunkcije('uprizoritev.view.umetniki', 'umetniki');

    };

    /**
     * Urejanje igralcev
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.renderIgralci = function () {
        var self = this;
        if (self.model.igralciCollection.length === 0) {
            self.model.igralciCollection.fetch();
        }
        this.renderFunkcije('uprizoritev.view.igralci', 'igralci');
    };

    /**
     * 
     * Render pogleda za ostale sodelujoče
     * 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.renderTehniki = function () {
        var self = this;
        if (self.model.tehnikiCollection.length === 0) {
            self.model.tehnikiCollection.fetch();
        }
        this.renderFunkcije('uprizoritev.view.tehniki', 'tehniki');
    };

    /**
     *  
     * Pripravi in nariše view za stroškovnik 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.renderStroskovniki = function () {
        var self = this;
        require(['./StroskovnikView'], function (View) {
            var view = new View({
                collection: self.model.stroskovnikCollection,
                dokument: self.model
            });
            self.regionDetail.show(view);
            return view;
        });
    };

    return UprizoritevEditView;
});
