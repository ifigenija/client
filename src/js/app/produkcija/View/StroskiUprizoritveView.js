/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../tpl/uprizoritev-edit.tpl',
    'template!../tpl/uprizoritev-form.tpl',
    'template!../tpl/povzetekStroskovnika-item.tpl',
    'formSchema!uprizoritev',
    'marionette',
    'i18next',
    'app/Max/View/TabControl',
    'radio',
    'backbone',
    'baseUrl',
    'app/bars',
    'jquery',
    'jquery.jsonrpc'
], function (
        DokumentView,
        tpl,
        formTpl,
        povzetekTpl,
        shema,
        Marionette,
        i18next,
        TabControl,
        Radio,
        Backbone,
        baseUrl,
        Handlebars,
        $
        ) {

    /**
     * Ko urejamo že obstječo uprizoritev
     * @type Array
     */
    var tabVsi = [
        {
            name: i18next.t('ent.splosno'),
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

    UprizoritevStrosekEditView.prototype.pridobiPodatkeUprizoritve = function (options) {
        var uprizoritev = this.model.get('id');
        if (uprizoritev) {
            var zacetek = this.model.get('datumZacStudija');
            var konec = this.model.get('datumPremiere');

            var rpc = new $.JsonRpcClient({ajaxUrl: '/rpc/programDela/enotaPrograma'});
            rpc.call('podatkiUprizoritve', {
                'uprizoritevId': uprizoritev,
                'zacetek': zacetek,
                'konec': konec
            }, options.success, options.error);
        }
    };

    UprizoritevStrosekEditView.prototype.getNaslovUprizoritve = function () {
        var naslovT = this.model.get('naslov');
        var naslov = naslovT || i18next.t('strupr.title');
        return naslov;
    };

    UprizoritevStrosekEditView.prototype.prikaziPodatke = function (podatki) {

        var vrednostiDo = podatki['Do'];
        var vrednostiNa = podatki['Na'];
        var f = Handlebars.formatNumber;
        
        for (var kljuc in podatki) {
            if (kljuc !== 'Do' && kljuc !== 'Na') {
                var jkljuc = '.' + kljuc;
                this.$(jkljuc).html(podatki[kljuc]);
            }
        }

        for (var kljuc in vrednostiDo) {
            var jkljuc = '.' + kljuc + 'Do';
            this.$(jkljuc).html(f(vrednostiDo[kljuc], 2));
        }

        for (var kljuc in vrednostiNa) {
            var jkljuc = '.' + kljuc + 'Na';
            this.$(jkljuc).html(f(vrednostiNa[kljuc], 2));
        }
    };

    UprizoritevStrosekEditView.prototype.renderFormAndToolbar = function () {
        //v region form izriši view z podatki uprizoritve in povzetkom stroška
        var View = Marionette.ItemView.extend({
            tagName: 'div',
            className: 'povzetek-stroskovnika',
            template: povzetekTpl
        });

        var view = new View();
        this.regionForm.show(view);

        this.pridobiPodatkeUprizoritve({
            success: this.prikaziPodatke,
            error: function (error) {
                Radio.channel('error').request('handler', 'xhr');
            }
        });
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
                error: Radio.channel('error').request('handler', 'xhr')
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
            self.listenTo(view, "odpri:pogodbo", function (id) {
                self.onPogodbe();
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
                error: Radio.channel('error').request('handler', 'xhr')
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
