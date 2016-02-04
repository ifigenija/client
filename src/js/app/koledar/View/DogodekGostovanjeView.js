/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'underscore',
    './DogodekView',
    './GostPoddogodkiView',
    'template!../tpl/gostovanje-form.tpl',
    'formSchema!gostovanje'
], function (
        Radio,
        i18next,
        _,
        DogodekView,
        GostPoddogodkiView,
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
        var gosTabs = _.clone(tabs);
        gosTabs.push({id: 'dogodki', name: i18next.t('gostovanje.dogodki'), event: 'dogodki'});
        DogodekView.prototype.renderTabs.apply(this, [gosTabs]);
    };

    DogodekGostovanjeView.prototype.onDogodki = function () {
        this.deselectTab();
        this.$('.pnl-detail').addClass('active');
        
        var view = new GostPoddogodkiView({
            model: this.model
        });
        this.detailR.show(view);
    };
    return DogodekGostovanjeView;
});
