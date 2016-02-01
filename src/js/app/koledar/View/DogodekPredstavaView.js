/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'underscore',
    'app/bars',
    'marionette',
    './DogodekView',
    'app/aaa/View/RelationView',
    'template!../tpl/predstava-form.tpl',
    'formSchema!predstava'
], function (
        i18next,
        _,
        Handlebars,
        Marionette,
        DogodekView,
        RelationView,
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
        var predTabs = _.clone(tabs);
        predTabs.push({id: 'abonmaji', name: i18next.t('predstava.abonmaji'), event: 'abonmaji'});
        DogodekView.prototype.renderTabs.apply(this, [predTabs]);
    };

    DogodekPredstavaView.prototype.onAbonmaji = function () {
        this.deselectTab();
        this.$('.pnl-detail').addClass('active');

        var ItemView = Marionette.ItemView.extend({
            tagName: 'a',
            className: 'list-group-item col-sm-6',
            template: Handlebars.compile('{{ ime }} / {{ opis }}<span class="badge"><span class="fa fa-trash"></span></span>'),
            triggers: {
                'click .fa-trash': 'delete'
            }
        });

        var rv = new RelationView({
            owner: 'predstava',
            ownerId: this.model.get('id'),
            relation: 'abonmaji',
            lookup: 'abonma',
            title: i18next.t("abonma.title"),
            ItemView: ItemView
        });

        this.detailR.show(rv);
    };

    return DogodekPredstavaView;
});
