/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'template!../tpl/ponovitevPrejsnje-form3.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programPonovitevPrejsnjih',
    'app/bars',
    'template!../tpl/prenesi-form.tpl',
    'marionette',
    'underscore'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        formTpl,
        ZapisiLayout,
        schema,
        Handlebars,
        prenesiTpl,
        Marionette,
        _
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });
    var PonovitevView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'ponovitvePrejsnjih',
        formTitle: i18next.t('ponovitevPrejsnjih.title'),
        gridMeta: [
            {
                headerCell: hc,
                cell: 'integer',
                editable: false,
                label: i18next.t('ep.sort'),
                name: 'sort',
                sortable: true
            },
            {
                cell: 'string',
                editable: false,
                label: i18next.t('ep.uprizoritev'),
                name: 'uprizoritev.label',
                sortable: true
            },
            {
                cell: Backgrid.SelectCell.extend({
                    optionValues: schema.getOptionValues('tipProgramskeEnote')
                }),
                editable: false,
                label: i18next.t('ep.t.tipProgramskeEnote'),
                name: 'tipProgramskeEnote',
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
                label: i18next.t('ep.t.avtorskiHonorarji'),
                name: 'avtorskiHonorarji',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: hc,
                cell: 'number',
                editable: false,
                label: i18next.t('ep.tantieme'),
                name: 'tantieme',
                total: 'sum',
                sortable: true
            },
            {
                cell: 'action',
                name: '...',
                sortable: false,
                actions: [
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'premakniGor', title: i18next.t('std.premakniGor')},
                    {event: 'premakniDol', title: i18next.t('std.premakniDol')}
                ]
            }
        ]
    });

    /**
     * prikažemo in preračunamo vse prikazne vrednosti
     * @returns {undefined}
     */
    PonovitevView.prototype.prikaziPodatke = function () {
        if (!this.form.commit()) {
            var model = this.model;

            model.preracunajInfo();
            this.zaprosenoChange();

            var f = Handlebars.formatNumber;
            this.$('.nasDelez').html(f(model.get('nasDelez'), 2));
            this.$('.lastnaSredstva').html(f(model.get('lastnaSredstva'), 2));
            this.$('.celotnaVrednost').html(f(model.get('lastnaSredstva'), 2));
        }
    };

    /**
     * pridobimo view ki se uporabi pri prenosu podatkov iz uprizoritve v enotoprograma
     * preračunamo v viewju ker ni vseh podatkov v modelu in ker ni nujno da se bodo vrednosti prepisale
     * @returns {EnotaProgramaView@call;extend.prototype.getIzracunajView.View}
     */
    EnotaProgramaView.prototype.getPrenesiView = function () {
        var self = this;
        var View = Marionette.ItemView.extend({
            tagName: 'div',
            className: 'prenesi-table',
            template: prenesiTpl,
            serializeData: function () {
                var model = this.model;
                var vsotaPonovitev = model.get('ponoviDoma') + model.get('ponoviZamejo') + model.get('ponoviGost') + model.get('ponoviInt');
                var na = self.podatkiUprizoritve.Na;

                self.podatkiUprizoritve.NaDo = {
                    avtorskiHonorarji: na.avtorskiHonorarji * vsotaPonovitev,
                    avtorskiHonorarjiSamoz: na.avtorskiHonorarjiSamoz * vsotaPonovitev,
                    tantieme: na.tantieme * vsotaPonovitev,
                    avtorskePravice: na.avtorskePravice * vsotaPonovitev,
                    materialni: na.materialni * vsotaPonovitev
                };

                var naDo = self.podatkiUprizoritve.NaDo;
                naDo.nasDelez = naDo.avtorskiHonorarji + naDo.tantieme + naDo.avtorskePravice + naDo.materialni;
                return _.extend(this.model.toJSON(), {
                    uprizoritevData: self.podatkiUprizoritve
                });
            },
            initialize: self.oznaciCheckboxe,
            triggers: {
                'click .izberi-check': 'izberi:vse'
            },
            onIzberiVse: function () {
                this.$('input').click();
            }
        });

        return View;
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    PonovitevView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramPonovitevPrejsnjih'
        });
        this.prilogeR.show(view);
    };

    return PonovitevView;
});