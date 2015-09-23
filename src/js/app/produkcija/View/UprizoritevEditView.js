/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    './FunkcijaView',
    './VajaView',
    './PredstavaView',
    'template!../tpl/uprizoritev-edit.tpl',
    'template!../tpl/uprizoritev-form.tpl',
    'formSchema!uprizoritev',
    'i18next',
    'app/Zapisi/View/ZapisiLayout',
    'app/Max/View/TabControl',
    'radio',
    'app/arhiv/Model/Besedilo',
    'app/arhiv/View/BesediloModal'
], function (
        DokumentView,
        FunkcijaView,
        VajaView,
        PredstavaView,
        tpl,
        formTpl,
        shema,
        i18next,
        ZapisiLayout,
        TabControl,
        Radio,
        BesediloModel,
        BesediloModal
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
            name: i18next.t('uprizoritev.umetniskeEkipe'),
            event: 'umetniki'
        },
        {
            name: i18next.t('uprizoritev.nastopajoci'),
            event: 'igralci'
        },
        {
            name: i18next.t('uprizoritev.ostaliSodelujoci'),
            event: 'tehniki'
        },
        {
            name: i18next.t('uprizoritev.vaje'),
            event: 'vaje'
        },
        {
            name: i18next.t('uprizoritev.predstave'),
            event: 'predstave'
        }
    ];



    /**
     * Urejanje uprizoritev 
     * @type DokumentView
     */
    var UprizoritevEditView = DokumentView.extend({
        className: 'uprizoritev',
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        regions: {
            regionDetail: '.region-detail',
            regionTabs: '.uprizoritev-tabs',
            prilogeR: '.region-priloge'
        },
        events: {
            'click .dodaj-besedilo': 'dodajBesedilo'
        }
    });

    UprizoritevEditView.prototype.onRenderForm = function () {
        if (this.isNew() || this.options.pogled === "modal") {
            this.$('.nav.nav-tabs').addClass('hidden');
        } else {
            this.$('.nav.nav-tabs').removeClass('hidden');
        }

        this.form.on('besedilo:change', this.besediloChange, this);
    };

    UprizoritevEditView.prototype.besediloChange = function (form, editor) {

        var self = this;
        var id = editor.getValue().id;
        var model = new BesediloModel.Model({id: id});

        model.fetch({
            success: function () {
                self.$('.avtor').html(model.get('avtor'));
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    UprizoritevEditView.prototype.dodajBesedilo = function () {
        console.log('Dodaj');

        var model = new BesediloModel.Model();
        var editor = this.form.fields.besedilo.editor;

        BesediloModal({
            model: model,
            editor: editor,
            form: this.form,
            title: i18next.t('besedilo.nova')
        });

    };


    UprizoritevEditView.prototype.getNaslovUprizoritve = function () {
        var naslovT = this.model.get('naslov');
        var naslov = naslovT || i18next.t('uprizoritev.naslov');
        return naslov;
    };

    UprizoritevEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('uprizoritev.nova') : this.getNaslovUprizoritve();
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
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'Uprizoritev'
        });
        this.prilogeR.show(view);
    };

    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onSplosni = function () {
        this.$('.pnl-detail').removeClass('active');
        this.$('.pnl-splosno').addClass('active');
        if (this.model.get('id')) {
            this.renderPriloge();
        }
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
     * Klik na tab za arhivalije podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onVaje = function () {
        this.skrijSplosni();
        this.renderVaje();
    };

    /**
     * Klik na tab za arhivalije podatke 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onPredstave = function () {
        this.skrijSplosni();
        this.renderPredstave();
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
        var view = new FunkcijaView({
            collection: coll,
            dokument: this.model,
            zapirajFormo: false,
            potrdiBrisanje: true
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
            c.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
        this.renderFunkcije(c, 'uprizoritev.umetniki', 'umetniki');

    };

    /**
     * Urejanje igralcev
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.renderIgralci = function () {
        var c = this.model.igralciCollection;
        if (c.length === 0) {
            c.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
        this.renderFunkcije(c, 'uprizoritev.igralci', 'igralci');
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
            c.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
        this.renderFunkcije(c, 'uprizoritev.tehniki', 'tehniki');
    };
    /**
     * 
     * Render pogleda za ostale sodelujoče
     * 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.renderVaje = function () {
        var c = this.model.planVajeCollection;
        if (c.length === 0) {
            c.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }

        var view = new VajaView({
            collection: c,
            dokument: this.model,
            zapirajFormo: false,
            potrdiBrisanje: true
        });

        view.detailName = 'planVaje';
        this.regionDetail.show(view);

    };
    /**
     * 
     * Render pogleda za ostale sodelujoče
     * 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.renderPredstave = function () {
        var c = this.model.planPredstaveCollection;
        if (c.length === 0) {
            c.fetch({
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }

        var view = new PredstavaView({
            collection: c,
            dokument: this.model,
            zapirajFormo: false,
            potrdiBrisanje: true
        });

        view.detailName = 'planPredstave';
        this.regionDetail.show(view);
    };

    return UprizoritevEditView;
});
