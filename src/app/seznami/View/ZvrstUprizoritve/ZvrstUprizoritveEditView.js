/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../../tpl/zvrstUprizoritve/zvrstUprizoritve-edit.tpl',
    'template!../../tpl/zvrstUprizoritve/zvrstUprizoritve-form.tpl',
    'formSchema!zvrstUprizoritve',
    'i18next'
], function (
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next
        ) {

    var ZvrstUprizoritveEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        triggers: {
            'click .tab-splosno': 'splosni'
        }
    });

    ZvrstUprizoritveEditView.prototype.getNaziv = function () {
        var nazivT = this.model.get('naziv');
        
        var naziv = nazivT ? nazivT : i18next.t('seznami.view.zvrstUprizoritve.naziv');

        return nazivT;
    };

    ZvrstUprizoritveEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('seznami.view.zvrstUprizoritve.nova') : this.getNaziv();
    };
    
    ZvrstUprizoritveEditView.prototype.onBeforeRender = function(){
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    ZvrstUprizoritveEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        this.$('.tab-splosno').addClass('active');
        
    };

    return ZvrstUprizoritveEditView;
});
