/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../tpl/oseba-edit.tpl',
    'template!../tpl/oseba-form.tpl',
    'formSchema!oseba',
    'i18next'
], function (
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next
        ) {

    var OsebaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        triggers: {
            'click .tab-splosno': 'splosni',
            'click .tab-kontakti': 'kontakti',
            'click .tab-trrji': 'trrji'
        },
        regions: {
            regionTrrji: '.region-trrji',
            regionNaslovi: '.region-naslovi',
            regionTelefonske: '.region-telefonske'
        }
    });

    OsebaEditView.prototype.getImePriimek = function () {
        var imeT = this.model.get('ime');
        var priimekT = this.model.get('priimek');
        
        var ime = imeT ? imeT : i18next.t('seznami.view.oseba.ime');
        var priimek = priimekT ? priimekT : i18next.t('seznami.view.oseba.priimek');
        
        var imePriimek = ime + ' ' + priimek;

        return imePriimek;
    };

    OsebaEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('seznami.view.oseba.nova') : this.getImePriimek();
    };
    
    OsebaEditView.prototype.onBeforeRender = function(){
        var self = this;
        this.listenTo(this.model, 'sync', function () {
            self.render();
        });
    };


    OsebaEditView.prototype.onRender = function () {
        if (this.isNew()) {
            this.$('.tab-kotakti a').prop('disabled', 'disabled');
            this.$('.tab-trriji a').prop('disabled', 'disabled');
        } else {
            this.renderNaslovi();
            this.renderTelefonske();
            this.renderTrrji();
        }
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    OsebaEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        this.$('.tab-splosno').addClass('active');
        
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    OsebaEditView.prototype.onKontakti = function () {
        this.deselectTab();
        this.$('.pnl-kontakti').addClass('active');
        this.$('.tab-kontakti').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    OsebaEditView.prototype.onTrrji = function () {
        this.deselectTab();
        this.$('.pnl-trrji').addClass('active');
        this.$('.tab-trrji').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    OsebaEditView.prototype.deselectTab = function () {
        this.$('.oseba-tabs li').removeClass('active');
        this.$('.oseba-panels .tab-pane').removeClass('active');
    };


    OsebaEditView.prototype.renderTrrji = function () {
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
    OsebaEditView.prototype.renderTelefonske = function () {
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

    OsebaEditView.prototype.renderNaslovi = function () {
        var self = this;
        require(['app/seznami/View/PostniNaslovView'], function (View) {
            var view = new View({
                collection: self.model.telefonskeCollection,
                dokument: self.model
            });
            self.regionNaslovi.show(view);
            return view;
        });
    };

    return OsebaEditView;
});
