/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../../tpl/uprizoritev/uprizoritev-edit.tpl',
    'template!../../tpl/uprizoritev/uprizoritev-form.tpl',
    'formSchema!uprizoritev',
    'i18next',
    'app/Max/View/TabControl'
], function (
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next,
        TabControl
        ) {

    var tabSplosno =
            [
                {
                    name: i18next.t('seznami.view.splosno'),
                    event: 'splosni'
                },
                {
                    name: i18next.t('produkcija.view.uprizoritev.umetniskeEkipe'),
                    event: 'umetniskeEkipe'
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

    var tabPogled2 =
            [
                {
                    name: i18next.t('seznami.view.splosno'),
                    event: 'splosni'
                },
                {
                    name: i18next.t('produkcija.view.uprizoritev.umetniskeEkipe'),
                    event: 'umetniskeEkipe'
                }
            ];

    var UprizoritevEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        regions: {
            regionArhivalije: '.region-arhivalije',
            regionUmetniskeEkipe: '.region-umetniskeEkipe',
            regionNastopajoci: '.region-nastopajoci',
            regionOstaliSodelujoci: '.region-ostaliSodelujoci',
            regionStroskovniki: '.region-stroskovniki',
            regionTabs: '.uprizoritev-tabs'
        }
    });

    UprizoritevEditView.prototype.getNaslovUprizoritve = function () {
        var naslovT = this.model.get('naslov');

        var naslov = naslovT ? naslovT : i18next.t('produkcija.view.uprizoritev.naslov');

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

        if (this.options.pogled === "kontaktna") {
            tabs = tabPogled2;
        } else if (this.options.pogled === "splosno") {
            tabs = tabSplosno;
        } else {
            tabs = tabSplosno;
        }
        
        //if (!this.isNew()) {
            this.renderArhivalije();
            this.renderUmetniskeEkipe();
            this.renderNastopajoci();
            this.renderOstaliSodelujoci();
            this.renderStroskovniki();
        //}
        
        this.renderTabs(tabs);
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');

    };
    /**
     * Klik na tab za arhivalije podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onArhivalije = function () {
        this.deselectTab();
        this.$('.pnl-arhivalije').addClass('active');
    };
    /**
     * Klik na tab za arhivalije podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onUmetniskeEkipe = function () {
        this.deselectTab();
        this.$('.pnl-umetniskeEkipe').addClass('active');
    };
    /**
     * Klik na tab za arhivalije podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onNastopajoci = function () {
        this.deselectTab();
        this.$('.pnl-nastopajoci').addClass('active');
    };
    /**
     * Klik na tab za arhivalije podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onOstaliSodelujoci = function () {
        this.deselectTab();
        this.$('.pnl-ostaliSodelujoci').addClass('active');
    };
    /**
     * Klik na tab za stroskovnik podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onStroskovniki = function () {
        this.deselectTab();
        this.$('.pnl-ostaliSodelujoci').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.deselectTab = function () {
        this.$('.uprizoritev-tabs li').removeClass('active');
        this.$('.uprizoritev-panels .tab-pane').removeClass('active');
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

    UprizoritevEditView.prototype.renderArhivalije = function () {
        var self = this;
        require(['app/produkcija/View/Uprizoritev/ArhivalijaView'], function (View) {
            var view = new View({
                collection: self.model.arhivalijeCollection,
                dokument: self.model
            });
            self.regionArhivalije.show(view);
            return view;
        });
    };
    UprizoritevEditView.prototype.renderUmetniskeEkipe = function () {
        var self = this;
        require(['app/produkcija/View/Uprizoritev/UmetniskaEkipaView'], function (View) {
            var view = new View({
                collection: self.model.umetniskeEkipeCollection,
                dokument: self.model
            });
            self.regionUmetniskeEkipe.show(view);
            return view;
        });
    };
    UprizoritevEditView.prototype.renderNastopajoci = function () {
        var self = this;
        require(['app/produkcija/View/Uprizoritev/NastopajociView'], function (View) {
            var view = new View({
                collection: self.model.nastopajociCollection,
                dokument: self.model
            });
            self.regionNastopajoci.show(view);
            return view;
        });
    };
    UprizoritevEditView.prototype.renderOstaliSodelujoci = function () {
        var self = this;
        require(['app/produkcija/View/Uprizoritev/OstaliSodelujociView'], function (View) {
            var view = new View({
                collection: self.model.ostaliSodelujociCollection,
                dokument: self.model
            });
            self.regionOstaliSodelujoci.show(view);
            return view;
        });
    };
    UprizoritevEditView.prototype.renderStroskovniki = function () {
        var self = this;
        require(['app/produkcija/View/Uprizoritev/StroskovnikView'], function (View) {
            var view = new View({
                collection: self.model.ostaliStroskovnikCollection,
                dokument: self.model
            });
            self.regionOstaliSodelujoci.show(view);
            return view;
        });
    };

    return UprizoritevEditView;
});
