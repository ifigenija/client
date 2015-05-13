/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'template!../../tpl/drzava/drzava-edit.tpl',
    'template!../../tpl/drzava/drzava-form.tpl',
    'formSchema!drzava',
    'i18next'
], function (
        DokumentView,
        tpl,
        formTpl,
        shema,
        i18next
        ) {

    var DrzavaEditView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: shema.toFormSchema().schema,
        triggers: {
            'click .tab-splosno': 'splosni'
        }
    });

    DrzavaEditView.prototype.getNaziv = function () {
        var nazivT = this.model.get('naziv');
        
        var naziv = nazivT ? nazivT : i18next.t('seznami.view.drzava.naziv');

        return nazivT;
    };

    DrzavaEditView.prototype.getNaslov = function () {
        return this.isNew() ?
                i18next.t('seznami.view.drzava.nova') : this.getNaziv();
    };
    
    DrzavaEditView.prototype.onBeforeRender = function(){
        var self = this;
        this.listenTo(this.model, 'sync', function (coll) {
            self.render();
        });
    };
    /**
     * Klik na splošni tab
     * @returns {undefined}
     */
    DrzavaEditView.prototype.onSplosni = function () {
        this.deselectTab();
        this.$('.pnl-splosno').addClass('active');
        this.$('.tab-splosno').addClass('active');
        
    };

    return DrzavaEditView;
});
