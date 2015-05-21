/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../../tpl/uprizoritev/umetniskaEkipa-edit.tpl',
    'template!../../tpl/uprizoritev/umetniskaEkipa-form.tpl',
    'formSchema!funkcija',
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
                    name: i18next.t('produkcija.view.umetniskaEkipa.alternacije'),
                    event: 'alternacije'
                }
            ];

    var tabPogled2 =
            [
                {
                    name: i18next.t('seznami.view.splosno'),
                    event: 'splosni'
                },
                {
                    name: i18next.t('produkcija.view.umetniskaEkipa.alternacije'),
                    event: 'alternacije'
                }
            ];

    var UmetniskaEkipaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        regions: {
            regionAlternacije: '.region-alternacije',
            regionTabs: '.umetniskaEkipa-tabs'
        }
    });

    UmetniskaEkipaEditView.prototype.getNaslovUprizoritve = function () {
        var naslovT = this.model.get('naslov');

        var naslov = naslovT ? naslovT : i18next.t('produkcija.view.umetniskaEkipa.naslov');

        return naslov;
    };

    UmetniskaEkipaEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('produkcija.view.umetniskaEkipa.nova') : this.getNaslovUprizoritve();
    };

    UmetniskaEkipaEditView.prototype.onBeforeRender = function () {
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };

    UmetniskaEkipaEditView.prototype.onRender = function () {
        var tabs = null;

        if (this.options.pogled === "kontaktna") {
            tabs = tabPogled2;
        } else if (this.options.pogled === "splosno") {
            tabs = tabSplosno;
        } else {
            tabs = tabSplosno;
        }
        
        if (!this.isNew()) {
            this.renderAlternacije();
        }
        
        this.renderTabs(tabs);
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    UmetniskaEkipaEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');

    };
    /**
     * Klik na tab za alternacije podatke 
     * @returns {undefined}
     */
    UmetniskaEkipaEditView.prototype.onAlternacije = function () {
        this.deselectTab();
        this.$('.pnl-alternacije').addClass('active');
    };    
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    UmetniskaEkipaEditView.prototype.deselectTab = function () {
        this.$('.umetniskaEkipa-tabs li').removeClass('active');
        this.$('.umetniskaEkipa-panels .tab-pane').removeClass('active');
    };
    /**
     * Izris tabov
     * @returns {OsebaEditView_L11.TabControl}
     */
    UmetniskaEkipaEditView.prototype.renderTabs = function (tabs) {
        this.tabControl = new TabControl({tabs: tabs, listener: this});
        this.regionTabs.show(this.tabControl);
        return this.tabControl;
    };

    UmetniskaEkipaEditView.prototype.renderAlternacije = function () {
        var self = this;
        require(['app/produkcija/View/AlternacijaView'], function (View) {
            var view = new View({
                collection: self.model.alternacijeCollection,
                dokument: self.model
            });
            self.regionAlternacije.show(view);
            return view;
        });
    };

    return UmetniskaEkipaEditView;
});
