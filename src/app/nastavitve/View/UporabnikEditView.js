/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../tpl/uporabnik-edit.tpl',
    'template!../tpl/uporabnik-form.tpl',
    'formSchema!user',
    'i18next',
    'baseUrl'
], function (
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next,
        baseUrl
        ) {

    var UporabnikEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        triggers: {
            'click .tab-splosno': 'splosni',
            'click .tab-vloge': 'vloge'
        },
        regions: {
            regionVloge: '.region-vloge'
        }
    });

    UporabnikEditView.prototype.getNaziv = function () {
        var nazivT = this.model.get('name');
        var naziv = nazivT ? nazivT : i18next.t('seznami.view.uporabnik.ime');

        return naziv;
    };

    UporabnikEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('seznami.view.uporabnik.nova') : this.getNaziv();
    };
    
    UporabnikEditView.prototype.onBeforeRender = function(){
        var self = this;
        this.listenTo(this.model, 'sync', function () {
            self.render();
        });
    };


    UporabnikEditView.prototype.onRender = function () {
        if (this.isNew()) {
            this.$('.tab-vloge a').prop('disabled', 'disabled');
        } else {
            this.renderVloge();
        }
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    UporabnikEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        this.$('.tab-splosno').addClass('active');
        
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    UporabnikEditView.prototype.onVloge = function () {
        this.deselectTab();
        this.$('.pnl-vloge').addClass('active');
        this.$('.tab-vloge').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    UporabnikEditView.prototype.deselectTab = function () {
        this.$('.uporabnik-tabs li').removeClass('active');
        this.$('.uporabnik-panels .tab-pane').removeClass('active');
    };


    UporabnikEditView.prototype.renderVloge = function () {
        
    };

    return UporabnikEditView;
});
