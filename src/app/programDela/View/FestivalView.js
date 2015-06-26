/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'marionette',
    'radio',
    'app/bars',
    'app/Dokument/View/PostavkeView',
    'template!../tpl/festival-form.tpl',
    'formSchema!programFestival',
    'underscore',
], function (
        Backgrid,
        i18next,
        Marionette,
        Radio,
        Handlebars,
        PostavkeView,
        formTpl,
        schema,
        _
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });
    var FestivalView = PostavkeView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        name: 'Festival',
        detailName: 'festivali',
        formTitle: i18next.t('festival.title'),
        triggers: {
            'click .utemelji': 'utemelji'
        },
        gridMeta: [
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('entiteta.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('entiteta.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.celotnaVrednost'),
                name: 'celotnaVrednost',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.zaproseno'),
                name: 'zaproseno',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.lastnaSredstva'),
                name: 'lastnaSredstva',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.vlozekKoproducenta'),
                name: 'vlozekKoproducenta',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.drugiJavni'),
                name: 'drugiJavni',
                total: 'sum',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('entiteta.brisi')},
                    {event: 'uredi', title: i18next.t('entiteta.uredi')}
                ]
            }
        ]
    });

    /**
     * Odpre modal za utemeljitev
     * @returns {undefined}
     */
    FestivalView.prototype.onUtemelji = function () {
        var self = this;

        require(['backbone-modal'], function (Modal) {

            var View = Marionette.LayoutView.extend({
                model: self.model,
                template: Handlebars.compile('<form><textarea type="TextArea" class="utemeljitev form-control">{{opredelitevDrugiDogodki}}</textarea></form>'),
                title: i18next.t('Utemeljitev')
            });

            var view = new View({});

            var modal = new Modal({
                content: view,
                animate: true,
                okText: i18next.t("std.shrani"),
                cancelText: i18next.t("std.preklici"),
                title: view.title
            }).open();

            modal.listenTo(modal, 'ok', function () {
                var text = this.$('.utemeljitev').val();
                if (text) {
                    self.$('a.btn.utemelji').append(' <i class="fa fa-check"></i>');
                    self.model.set("opredelitevDrugiDogodki", text);
                }
            });
        });
    };
    /**
     * Odpre modal za utemeljitev
     * @returns {undefined}
     */
    FestivalView.prototype.onDodaj = function () {
        PostavkeView.prototype.onDodaj.apply(this, arguments);
        this.zapSortSt();
    };

    FestivalView.prototype.zapSortSt = function () {
        var collection = this.collection.fullCollection || this.collection;
        var min = -100;
        _.each(collection.models, function (e) {
            var sort = e.get('sort');
            if (sort >= min) {
                min = sort;
            }
        });

        if (min >= 0) {
            //this.model.set({sort: min});
            this.form.fields.sort.editor.setValue(min + 1);
        }
    };


    return FestivalView;
});