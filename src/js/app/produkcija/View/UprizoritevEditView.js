/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone',
    'app/Dokument/View/DokumentView',
    'template!../tpl/uprizoritev-edit.tpl',
    'template!../tpl/uprizoritev-form.tpl',
    'formSchema!uprizoritev',
    './FunkcijaView',
    './VajaView',
    './PredstavaView',
    'app/Zapisi/View/ZapisiLayout',
    'app/Max/View/TabControl',
    'app/arhiv/Model/Besedilo',
    'app/arhiv/View/BesediloModal',
    'app/koledar/View/VzporedniceView'
], function (
        Radio,
        i18next,
        Backbone,
        DokumentView,
        tpl,
        formTpl,
        shema,
        FunkcijaView,
        VajaView,
        PredstavaView,
        ZapisiLayout,
        TabControl,
        BesediloModel,
        BesediloModal,
        VzporedniceView
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
        },
        {
            name: i18next.t('uprizoritev.vzporednice'),
            event: 'vzporednice'
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
            regionDetail: '.region-uprizoritev-detail',
            regionTabs: '.uprizoritev-tabs',
            prilogeR: '.region-priloge'
        },
        events: {
            'click .dodaj-besedilo': 'dodajBesedilo'
        },
        buttons: {
            shraniDodaj: {
                id: 'doc-shrani-dodaj',
                label: i18next.t('std.shraniDodaj'),
                element: 'button-trigger',
                trigger: 'shraniDodaj',
                disabled: true
            },
            shrani: {
                id: 'doc-shrani',
                label: i18next.t('std.shrani'),
                element: 'button-trigger',
                trigger: 'shrani',
                disabled: true
            },
            preklici: {
                id: 'doc-preklici',
                label: i18next.t('std.zapri'),
                element: 'button-trigger',
                trigger: 'preklici'
            },
            nasvet: {
                id: 'doc-nasvet',
                icon: 'fa fa-info',
                title: i18next.t('std.pomoc'),
                element: 'button-trigger',
                trigger: 'nasvet'
            }
        }
    });

    /**
     * namenjeno je boljšemu workflowu.
     * Shranemo obstoječ model in dodamo nov model 
     * @returns {undefined}
     */
    UprizoritevEditView.prototype.onShraniDodaj = function () {
        var self = this;
        this.onShrani({
            success: self.posodobiUrlNaslovBrezRender
        });
    };

    UprizoritevEditView.prototype.onShrani = function (options) {
        DokumentView.prototype.onShrani.apply(this, arguments);
    };

    /*
     * posodobimo url strani in dodamo nov model
     * @returns 
     */
    UprizoritevEditView.prototype.posodobiUrlNaslovBrezRender = function () {
        // zamenjamo zadnji del url z id (#model/dodaj -> #model/id)
        var url = Backbone.history.location.hash;
        var newUrl = url.replace(/([\w-]+)$/g, this.model.id);
        Radio.channel('layout').command('replaceUrl', newUrl);
        Radio.channel('layout').command('setTitle', this.getNaslov());
        this.trigger('dodaj');
    };
    /**
     * namenjeno vodenju gumbov shrani in (shrani in dodaj)
     * @param FormView form
     */
    UprizoritevEditView.prototype.formChange = function (form) {
        var tb = this.getToolbarModel();
        var butS = tb.getButton('doc-shrani');
        var butSD = tb.getButton('doc-shrani-dodaj');
        var butP = tb.getButton('doc-preklici');

        if (butS && butS.get('disabled')) {
            butS.set({
                disabled: false
            });
        }

        if (butSD && butSD.get('disabled')) {
            butSD.set({
                disabled: false
            });
        }

        if (butS && !butS.get('disabled')) {
            butP.set({
                label: i18next.t('std.preklici')
            });
        }

        this.triggerMethod('form:change', form);
    };

    /**
     * Skrijemo tabe da se ne vidi črta pri vnašanju uprizoritve
     * obesimo besedilo change, da lahko izrisemo avtorje
     * @returns {undefined}
     */
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

        var id;
        var e = editor.getValue();
        if (e) {
            if (e.id) {
                id = e.id;
            } else {
                id = e;
            }
        }

        var model = new BesediloModel.Model({id: id});

        model.fetch({
            success: function () {
                var avtor = model.get('avtor');
                var izpis = "";
                if (avtor) {
                    izpis = " " + model.get('avtor');
                }

                self.$('.avtorji').html(izpis);

                var polja = self.form.fields;
                var naslov = model.get('naslov');

                //Preverimo ali je vnosno polje z naslovom prazno, če je prazen prepišemo naslov in podnaslov iz besedila
                //V primeru da je model nov se kljub temu prepiše naslov in podnaslov, neglede ali je prazen ali ne.
                if (!polja.naslov.editor.getValue() && naslov) {
                    polja.naslov.setValue(naslov);
                    var podNaslov = model.get('podnaslov');

                    if (!polja.podnaslov.editor.getValue() && podNaslov) {
                        polja.podnaslov.setValue(podNaslov);
                    } else {
                        polja.podnaslov.setValue('');
                    }
                }
            },
            error: Radio.channel('error').request('handler', 'xhr')
        });
    };

    UprizoritevEditView.prototype.dodajBesedilo = function () {
        var model = new BesediloModel.Model();
        var editor = this.form.fields.besedilo.editor;

        BesediloModal({
            model: model,
            editor: editor,
            form: this.form,
            trigger: 'besedilo:change',
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
        this.listenToOnce(this.model, 'sync', function (coll) {
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
    
    UprizoritevEditView.prototype.onVzporednice = function () {
        this.skrijSplosni();
        
        //nezadovoljen z rešitvijo
        this.model.set('label', this.model.get('naslov'));
        this.model.set('neBrisi', true);
        
        var view = new VzporedniceView({
            uprizoritev: this.model
        });
        this.regionDetail.show(view);
    };

    return UprizoritevEditView;
});
