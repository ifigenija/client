/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../../tpl/tipFunkcije/tipFunkcije-edit.tpl',
    'template!../../tpl/tipFunkcije/tipFunkcije-form.tpl',
    'formSchema!tipFunkcije',
    'i18next'
], function (
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next
        ) {

    var TipFunkcijeEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        triggers: {
            'click .tab-splosno': 'splosni'
        }
    });

    TipFunkcijeEditView.prototype.getNaziv = function () {
        var nazivT = this.model.get('naziv');
        
        var naziv = nazivT ? nazivT : i18next.t('seznami.view.tipFunkcije.naziv');

        return nazivT;
    };

    TipFunkcijeEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('seznami.view.tipFunkcije.nova') : this.getNaziv();
    };
    
    TipFunkcijeEditView.prototype.onBeforeRender = function(){
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    TipFunkcijeEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        this.$('.tab-splosno').addClass('active');
        
    };

    return TipFunkcijeEditView;
});
