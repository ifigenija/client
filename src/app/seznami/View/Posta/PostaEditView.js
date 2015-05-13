/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../../tpl/posta/posta-edit.tpl',
    'template!../../tpl/posta/posta-form.tpl',
    'formSchema!posta',
    'i18next'
], function (
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next
        ) {

    var PostaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        triggers: {
            'click .tab-splosno': 'splosni'
        }
    });

    PostaEditView.prototype.getNaziv = function () {
        var nazivT = this.model.get('naziv');
        
        var naziv = nazivT ? nazivT : i18next.t('seznami.view.posta.naziv');

        return nazivT;
    };

    PostaEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('seznami.view.posta.nova') : this.getNaziv();
    };
    
    PostaEditView.prototype.onBeforeRender = function(){
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    PostaEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        this.$('.tab-splosno').addClass('active');
        
    };

    return PostaEditView;
});
