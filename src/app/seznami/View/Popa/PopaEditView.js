/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../../tpl/popa/popa-edit.tpl',
    'template!../../tpl/popa/popa-form.tpl',
    'formSchema!popa',
    'i18next'
], function (
        DokumentView,
tpl, 
formTpl, 
shema,
i18next
        ) {


    var PopaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        triggers: {
            'click .tab-splosno': 'splosni',
            'click .tab-kontakti': 'kontakti',
            'click .tab-osebe': 'osebe',
            'click .tab-trrji': 'trrji'
        },
        regions: {
            regionOsebe: '.region-osebe',
            regionTrrji: '.region-trrji',
            regionNaslovi: '.region-naslovi',
            regionTelefonske: '.region-telefonske'
        }
    });
    PopaEditView.prototype.getNaziv = function () {
        var naziv = this.model.get('naziv');
        return naziv ? naziv : i18next.t('seznami.view.popa.naziv');        
    };
    
    PopaEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('seznami.view.popa.nova') : this.getNaziv();
    };
    PopaEditView.prototype.onBeforeRender = function(){
        var self = this;
        this.listenTo(this.model, 'sync', function () {
            self.render();
        });
    };

    PopaEditView.prototype.onRender = function () {
        if (this.isNew()) {
            this.$('.tab-osebe').prop('disabled', 'disabled');
            this.$('.tab-kontakti').prop('disabled', 'disabled');
            this.$('.tab-trriji').prop('disabled', 'disabled');
        } else {
            this.renderNaslovi();
            this.renderTelefonske();
            this.renderTrrji();
            this.renderOsebe();
        }
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    PopaEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        this.$('.tab-splosno').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    PopaEditView.prototype.onKontakti = function () {
        this.deselectTab();
        this.$('.pnl-kontakti').addClass('active');
        this.$('.tab-kontakti').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    PopaEditView.prototype.onTrrji = function () {
        this.deselectTab();
        this.$('.pnl-trrji').addClass('active');
        this.$('.tab-trrji').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    PopaEditView.prototype.onOsebe = function () {
        this.deselectTab();
        this.$('.pnl-osebe').addClass('active');
        this.$('.tab-osebe').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    PopaEditView.prototype.deselectTab = function () {
        this.$('.popa-tabs li').removeClass('active');
        this.$('.popa-panels .tab-pane').removeClass('active');
    };
    
    
    PopaEditView.prototype.renderTrrji = function () {
        var self = this;
        require(['app/seznami/View/TrrView'], function (View) {
            var view = new View({
                collection: self.model.trrjiCollection,
                dokument: self.model
            });
            self.regionTrrji.show(view);
            return view;
        });
    };
    PopaEditView.prototype.renderTelefonske = function () {
        var self = this;
        require(['app/seznami/View/TelefonskaView'], function (View) {
            var view = new View({
                collection: self.model.telefonskeCollection,
                dokument: self.model
            });
            self.regionTelefonske.show(view);
            return view;
        });
    };

    PopaEditView.prototype.renderOsebe = function () {
    };


    PopaEditView.prototype.renderNaslovi = function () {
        var self = this;
        require(['app/seznami/View/PostniNaslovView'], function (View) {
            var view = new View({
                collection: self.model.nasloviCollection,
                dokument: self.model
            });
            self.regionNaslovi.show(view);
            return view;
        });
    };
    
    return PopaEditView;
});
