/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../../tpl/zvrstSurs/zvrstSurs-edit.tpl',
    'template!../../tpl/zvrstSurs/zvrstSurs-form.tpl',
    'formSchema!zvrstSurs',
    'i18next'
], function (
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next
        ) {

    var ZvrstSursEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        triggers: {
            'click .tab-splosno': 'splosni'
        }
    });

    ZvrstSursEditView.prototype.getNaziv = function () {
        var nazivT = this.model.get('naziv');
        
        var naziv = nazivT ? nazivT : i18next.t('seznami.view.zvrstSurs.naziv');

        return nazivT;
    };

    ZvrstSursEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('seznami.view.zvrstSurs.nova') : this.getNaziv();
    };
    
    ZvrstSursEditView.prototype.onBeforeRender = function(){
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    ZvrstSursEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        this.$('.tab-splosno').addClass('active');
        
    };

    return ZvrstSursEditView;
});
