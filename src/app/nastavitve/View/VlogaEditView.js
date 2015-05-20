/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../tpl/vloga-edit.tpl',
    'template!../tpl/vloga-form.tpl',
    'formSchema!role',
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

    var VlogaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        triggers: {
            'click .tab-splosno': 'splosni',
            'click .tab-dovoljenja': 'dovoljenja'
        },
        regions: {
            regionDovoljenja: '.region-dovoljenja'
        }
    });

    VlogaEditView.prototype.getNaziv = function () {
        var nazivT = this.model.get('name');
        var naziv = nazivT ? nazivT : i18next.t('seznami.view.vloga.ime');

        return naziv;
    };

    VlogaEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('seznami.view.vloga.nova') : this.getNaziv();
    };
    
    VlogaEditView.prototype.onBeforeRender = function(){
        var self = this;
        this.listenTo(this.model, 'sync', function () {
            self.render();
        });
    };


    VlogaEditView.prototype.onRender = function () {
        if (this.isNew()) {
            this.$('.tab-dovoljenja a').prop('disabled', 'disabled');
        } else {
            this.renderDovoljenja();
        }
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    VlogaEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        this.$('.tab-splosno').addClass('active');
        
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    VlogaEditView.prototype.onDovoljenja = function () {
        this.deselectTab();
        this.$('.pnl-dovoljenja').addClass('active');
        this.$('.tab-dovoljenja').addClass('active');
    };
    /**
     * Klik na tab za kontaktne podatke 
     * @returns {undefined}
     */
    VlogaEditView.prototype.deselectTab = function () {
        this.$('.vloga-tabs li').removeClass('active');
        this.$('.vloga-panels .tab-pane').removeClass('active');
    };


    VlogaEditView.prototype.renderDovoljenja = function () {
        
    };

    return VlogaEditView;
});
