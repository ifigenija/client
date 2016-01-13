/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'baseUrl',
    'backbone',
    'underscore',
    'app/bars',
    'marionette',
    'jquery',
    './DogodekView',
    'template!../tpl/predstava-form.tpl',
    'formSchema!predstava'
], function (
        Radio,
        i18next,
        baseUrl,
        Backbone,
        _,
        Handlebars,
        Marionette,
        $,
        DogodekView,
        tpl,
        schema
        ) {

    var DogodekPredstavaView = DogodekView.extend({
        schema: schema.toFormSchema().schema,
        formTemplate: tpl
    });

    /**
     * Overridana funkcija renderTabs
     * Dodan nov tab, ki bo namenjen za izris tabele abonmajev
     * @param {type} tabs
     * @returns {DogodekPredstavaView_L14.DogodekPredstavaView.tabControl}
     */
    DogodekPredstavaView.prototype.renderTabs = function (tabs) {
        DogodekView.prototype.renderTabs.apply(this, arguments);
        this.tabControl.addTab({id: 'abonmaji', name: i18next.t('predstava.abonmaji'), event: 'abonmaji'});
        return this.tabControl;
    };

    DogodekPredstavaView.prototype.onAbonmaji = function () {
//        var Coll = Backbone.Collection.extend({
//            url: baseUrl + '/rest/abonma'
//        });
//        
//        var abonmajiCollection = new Coll();
//        
//        abonmajiCollection.fetch({
//            success: function(collection){
//                console.log('t');
//            }
//        });
        this.deselectTab();
        this.$('.pnl-detail').addClass('active');
        
        var itemView = new Marionette.ItemView({
            template: Handlebars.compile('I AM HERE!!!')
        });

        this.detailR.show(itemView);
    };

    return DogodekPredstavaView;
});
