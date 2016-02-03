/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'app/bars',
    'marionette',
    'underscore',
    './DogodekView',
    'app/aaa/View/RelationView',
    'template!../tpl/gostovanje-form.tpl',
    'formSchema!gostovanje'
], function (
        i18next,
        Handlebars,
        Marionette,
        _,
        DogodekView,
        RelationView,
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

        var ItemView = Marionette.ItemView.extend({
            tagName: 'a',
            className: 'list-group-item col-sm-6',
            template: Handlebars.compile('{{ title }} / {{ razred }}<span class="badge"><span class="fa fa-trash"></span></span>'),
            triggers: {
                'click .fa-trash': 'delete'
            }
        });

        var rv = new RelationView({
            owner: 'gostovanje',
            ownerId: this.model.get('id'),
            relation: 'podrejeniDogodki',
            lookup: 'dogodek',
            title: i18next.t("dogodek.title"),
            ItemView: ItemView
        });

        this.detailR.show(rv);
    };

    return DogodekGostovanjeView;
});
