/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'backbone',
    'radio',
    'i18next',
    'baseUrl',
    'template!../tpl/program.tpl',
    'template!../tpl/program-item.tpl',
    '../Model/Program',
    '../Model/ProgramDokument',
    './ProgramDokView',
    'app/Max/View/PaginatorControl'
], function (
        Marionette,
        Backbone,
        Radio,
        i18next,
        baseUrl,
        tpl,
        itemTpl,
        ProgramModel,
        ProgramDokument,
        ProgramDokView,
        PaginatorControl
        ) {

    var ch = Radio.channel('layout');

    var ProgramDelaItem = Marionette.ItemView.extend({
        template: itemTpl,
        triggers: {
            "click .panel": "urediPD"
        }
    });

    ProgramDelaItem.prototype.onUrediPD = function () {
        var newUrl = 'programDela/' + this.model.get('id');
        ch.command('replaceUrl', newUrl);

        var odpri = function (model) {
            var view = new ProgramDokView({model: model});
            ch.command('open', view, i18next.t("programDela.title"));
        };

        var pdModel = new ProgramDokument.Model({id: this.model.get('id')});
        pdModel.once('sync', odpri);
        pdModel.fetch();
    };

    var ProgramDelaView = Marionette.CompositeView.extend({
        template: tpl,
        title: i18next.t('programDela.title'),
        className: 'fragment-tab-content',
        childView: ProgramDelaItem,
        childViewContainer: '.pd-seznam-pd',
        triggers: {
            "click .pd-dodaj-pd": "dodajPD"
        }
    });

    ProgramDelaView.prototype.initialize = function () {
        this.collection = new ProgramModel.Collection();
        this.collection.state.perPage = 9;
        this.paginatorControll = new PaginatorControl({
            collection: this.collection
        });
    };

    ProgramDelaView.prototype.onRender = function () {
        this.collection.fetch();
        this.$('.paginator-control').html(this.paginatorControll.render().el);
    };

    ProgramDelaView.prototype.onDodajPD = function () {
        var newUrl = 'programDela/dodaj';
        ch.command('replaceUrl', newUrl);

        var pdModel = new ProgramDokument.Model();

        var view = new ProgramDokView({model: pdModel});
        ch.command('open', view, i18next.t("programDela.title"));
    };

    return ProgramDelaView;
});