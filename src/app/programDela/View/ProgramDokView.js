/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'app/Dokument/View/DokumentView',
    'template!../tpl/program-dokument.tpl',
    'template!../tpl/program-form.tpl',
    'template!../tpl/kazalniki-tabel.tpl',
    'formSchema!programDela',
    'app/Max/View/TabControl',
    'marionette'
], function (
        Radio,
        i18next,
        DokumentView,
        dokumentTpl,
        formTpl,
        kazalnikiTabelaTpl,
        formSchema,
        TabControl,
        Marionette
        ) {

    var ch = Radio.channel('layout');

    var tabVse = [
        {
            title: i18next.t('entiteta.d.splosno'),
            name: i18next.t('entiteta.splosno'),
            event: 'splosni'
        },
        {
            title: i18next.t('programDela.d.sklopEna'),
            name: i18next.t('programDela.sklopEna'),
            event: 'sklopEna'
        },
        {
            title: i18next.t('programDela.d.sklopDva'),
            name: i18next.t('programDela.sklopDva'),
            event: 'sklopDva'
        },
        {
            title: i18next.t('kazalnik.d.kazalniki'),
            name: i18next.t('programDela.kazalniki'),
            event: 'kazalniki'
        }
    ];
    var tabSklopDva = [
        {name: i18next.t('gostovanje.title'), event: 'gostovanja'},
        {name: i18next.t('festival.title'), event: 'festivali'},
        {name: i18next.t('programRazno.title'), event: 'razni'},
        {name: i18next.t('izjemni.title'), event: 'izjemni'}
    ];

    var tabSklopEna = [
        {name: i18next.t('premiera.title'), event: 'premiere'},
        {name: i18next.t('ponovitevPremiere.title'), event: 'ponovitvePremier'},
        {name: i18next.t('ponovitevPrejsnjih.title'), event: 'ponovitvePrejsnjih'},
        {name: i18next.t('gostujoca.title'), event: 'gostujoci'}
    ];

    var tabNovi = [
        {name: i18next.t('entiteta.splosno'), event: 'splosni'}
    ];

    var ProgramDokView = DokumentView.extend({
        template: dokumentTpl,
        formTemplate: formTpl,
        schema: formSchema.toFormSchema().schema,
        regions: {
            premiereR: '.region-premiere',
            ponovitvePremierR: '.region-ponovitvePremier',
            ponovitvePrejsnjihR: '.region-ponovitvePrejsnjih',
            gostovanjaR: '.region-gostovanja',
            gostujociR: '.region-gostujoci',
            izjemniR: '.region-izjemni',
            festivaliR: '.region-festivali',
            razniR: '.region-razni',
            kazalnikiR: '.region-kazalniki',
            tabsR: '.programDela-tabs',
            sklopEnaR: '.sklopEna-tabs',
            sklopDvaR: '.sklopDva-tabs'
        }
    });

    /**
     * Izris tabov
     * @returns {OsebaEditView_L11.TabControl}
     */
    ProgramDokView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({justified: false, tabs: tabs, listener: this});
        this.tabsR.show(this.tabControl);
        return this.tabControl;
    };

    ProgramDokView.prototype.onRender = function () {

        var tabs = tabVse;

        if (this.isNew()) {
            tabs = tabNovi;
        }

        this.renderTabs(tabs);
    };

    ProgramDokView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('programDela.nova') : this.model.get('naziv');
    };

    /**
     * Klik na drug tab se izvede deselect
     * @returns {undefined}
     */
    ProgramDokView.prototype.deselectTab = function () {
        this.$('.programDela-panels .tab-pane').removeClass('active');
    };
    /**
     * Klik deselekt vtabcontrol sklopa ena
     * @returns {undefined}
     */
    ProgramDokView.prototype.deselectTabEna = function () {
        this.$('.sklopEna-panels .tab-pane').removeClass('active');
    };
    /**
     * Klik deselekt vtabcontrol sklopa dva
     * @returns {undefined}
     */
    ProgramDokView.prototype.deselectTabDva = function () {
        this.$('.sklopDva-panels .tab-pane').removeClass('active');
    };

    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    ProgramDokView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
    };

    /**
     * Izris tabov sklopaena
     * @returns {undefined}
     */
    ProgramDokView.prototype.onSklopEna = function () {
        this.deselectTab();
        this.$('.pnl-sklopEna').addClass('active');

        this.tabControlSklopEna = new TabControl({justified: false, tabs: tabSklopEna, listener: this});
        this.sklopEnaR.show(this.tabControlSklopEna);
    };
    /**
     * Izris tabov sklopaena
     * @returns {undefined}
     */
    ProgramDokView.prototype.onSklopDva = function () {
        this.deselectTab();
        this.$('.pnl-sklopDva').addClass('active');

        this.tabControlSklopDva = new TabControl({justified: false, tabs: tabSklopDva, listener: this});
        this.sklopDvaR.show(this.tabControlSklopDva);
    };

    /**
     * Izris premier
     * @returns {undefined}
     */
    ProgramDokView.prototype.onPremiere = function () {
        this.deselectTabEna();
        this.$('.pnl-premiere').addClass('active');

        var self = this;
        require(['app/programDela/View/PremieraView'], function (View) {
            var view = new View({
                collection: self.model.premiereCollection,
                dokument: self.model
            });
            self.premiereR.show(view);
            return view;
        });
    };
    /**
     * Izris ponovitev premiere
     * @returns {undefined}
     */
    ProgramDokView.prototype.onPonovitvePremier = function () {
        this.deselectTabEna();
        this.$('.pnl-ponovitvePremier').addClass('active');

        var self = this;
        require(['app/programDela/View/PonovitevPremiereView'], function (View) {
            var view = new View({
                collection: self.model.ponovitvePremiereCollection,
                dokument: self.model
            });
            self.ponovitvePremierR.show(view);
            return view;
        });
    };
    /**
     * Izris ponovitev prejsnjih
     * @returns {undefined}
     */
    ProgramDokView.prototype.onPonovitvePrejsnjih = function () {
        this.deselectTabEna();
        this.$('.pnl-ponovitvePrejsnjih').addClass('active');

        var self = this;
        require(['app/programDela/View/PonovitevPrejsnjeView'], function (View) {
            var view = new View({
                collection: self.model.ponovitvePrejsnjihCollection,
                dokument: self.model
            });
            self.ponovitvePrejsnjihR.show(view);
            return view;
        });
    };
    /**
     * Izris gostujoci
     * @returns {undefined}
     */
    ProgramDokView.prototype.onGostujoci = function () {
        this.deselectTabEna();
        this.$('.pnl-gostujoci').addClass('active');

        var self = this;
        require(['app/programDela/View/GostujocaView'], function (View) {
            var view = new View({
                collection: self.model.gostujociCollection,
                dokument: self.model
            });
            self.gostujociR.show(view);
            return view;
        });
    };
    /**
     * Izris gostovanj
     * @returns {undefined}
     */
    ProgramDokView.prototype.onGostovanja = function () {
        this.deselectTabDva();
        this.$('.pnl-gostovanja').addClass('active');

        var self = this;
        require(['app/programDela/View/GostovanjeView'], function (View) {
            var view = new View({
                collection: self.model.gostovanjaCollection,
                dokument: self.model
            });
            self.gostovanjaR.show(view);
            return view;
        });
    };
    /**
     * Izris izjemnih uprizoritev
     * @returns {undefined}
     */
    ProgramDokView.prototype.onIzjemni = function () {
        this.deselectTabDva();
        this.$('.pnl-izjemni').addClass('active');

        var self = this;
        require(['app/programDela/View/IzjemniView'], function (View) {
            var view = new View({
                collection: self.model.izjemniCollection,
                dokument: self.model
            });
            self.izjemniR.show(view);
            return view;
        });
    };
    /**
     * Izris izjemnih uprizoritev
     * @returns {undefined}
     */
    ProgramDokView.prototype.onFestivali = function () {
        this.deselectTabDva();
        this.$('.pnl-festivali').addClass('active');

        var self = this;
        require(['app/programDela/View/FestivalView'], function (View) {
            var view = new View({
                collection: self.model.festivaliCollection,
                dokument: self.model
            });
            self.festivaliR.show(view);
            return view;
        });
    };
    /**
     * Izris razno
     * @returns {undefined}
     */
    ProgramDokView.prototype.onRazni = function () {
        this.deselectTabDva();
        this.$('.pnl-razni').addClass('active');

        var self = this;
        require(['app/programDela/View/RaznoView'], function (View) {
            var view = new View({
                collection: self.model.programiRaznoCollection,
                dokument: self.model
            });
            self.razniR.show(view);
            return view;
        });
    };
    /**
     * Izris kazalnikov
     * @returns {undefined}
     */
    ProgramDokView.prototype.onKazalniki = function () {
        this.deselectTab();
        this.$('.pnl-kazalniki').addClass('active');
        
        var View = Marionette.ItemView.extend({
           template: kazalnikiTabelaTpl
        });
        
        this.model.fetch();
        
        var view = new View({
            model: this.model
        });
        
        this.kazalnikiR.show(view);
    };

    return ProgramDokView;
});