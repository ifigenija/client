/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'backbone',
    'radio',
    'i18next',
    'baseUrl',
    'app/Dokument/View/DokumentView',
    'template!../tpl/program-dokument.tpl',
    'template!../tpl/program-form.tpl',
    'formSchema!programDela',
    'app/Max/View/TabControl'
], function (
        Marionette,
        Backbone,
        Radio,
        i18next,
        baseUrl,
        DokumentView,
        dokumentTpl,
        formTpl,
        formSchema,
        TabControl
        ) {

    var ch = Radio.channel('layout');
    
    var tabVse = [
        {name: i18next.t('entiteta.splosno'), event: 'splosni'},
        {name: i18next.t('premiera.title'), event: 'premiere'},
        {name: i18next.t('ponovitevPremiere.title'), event: 'ponovitvePremier'},
        {name: i18next.t('ponovitevPrejsnjih.title'), event: 'ponovitvePrejsnjih'},
        {name: i18next.t('gostujoca.title'), event: 'gostujoci'},
        {name: i18next.t('gostovanje.title'), event: 'gostovanja'},
        {name: i18next.t('festival.title'), event: 'festivali'},
        {name: i18next.t('programRazno.title'), event: 'razni'},
        {name: i18next.t('izjemni.title'), event: 'izjemni'},
        {name: i18next.t('kazalniki.title'), event: 'kazalniki'}
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
            tabsR: '.programDela-tabs'
        }
    });
    
    /**
     * Izris tabov
     * @returns {OsebaEditView_L11.TabControl}
     */
    ProgramDokView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
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
     * Klik na splošni tab
     * @returns {undefined}
     */
    ProgramDokView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');

    };

    /**
     * Izris premier
     * @returns {undefined}
     */
    ProgramDokView.prototype.onPremiere = function () {
        this.deselectTab();
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
        this.deselectTab();
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
        this.deselectTab();
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
     * Izris gostovanj
     * @returns {undefined}
     */
    ProgramDokView.prototype.onGostovanja = function () {
        this.deselectTab();
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
     * Izris gostujoci
     * @returns {undefined}
     */
    ProgramDokView.prototype.onGostujoci = function () {
        this.deselectTab();
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
     * Izris izjemnih uprizoritev
     * @returns {undefined}
     */
    ProgramDokView.prototype.onIzjemni = function () {
        this.deselectTab();
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
        this.deselectTab();
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
        this.deselectTab();
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

    return ProgramDokView;
});