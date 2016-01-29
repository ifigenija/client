/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    './DogodekView',
    './DogodkiGostovanjaView',
    'template!../tpl/gostovanje-form.tpl',
    'formSchema!gostovanje'
], function (
        i18next,
        DogodekView,
        DogodkiGostovanjaView,
        tpl,
        schema
        ) {

    var DogodekGostovanjeView = DogodekView.extend({
        schema: schema.toFormSchema().schema,
        formTemplate: tpl
    });

    /**
     * Overridana funkcija renderTabs
     * Dodan nov tab, ki bo namenjen za izris tabele abonmajev
     * @param {type} tabs
     * @returns {DogodekGostovanjeView_L14.DogodekGostovanjeView.tabControl}
     */
    DogodekGostovanjeView.prototype.renderTabs = function (tabs) {
        tabs.push({id: 'dogodki', name: i18next.t('gostovanje.dogodki'), event: 'dogodki'});
        DogodekView.prototype.renderTabs.apply(this, arguments);
    };

    DogodekGostovanjeView.prototype.onDogodki = function () {
        this.deselectTab();
        this.$('.pnl-detail').addClass('active');
        
        //render dogodki
        var view = new DogodkiGostovanjaView();

        this.detailR.show(view);
    };

    return DogodekGostovanjeView;
});
