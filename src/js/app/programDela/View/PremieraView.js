/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'template!../tpl/premiera-form.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programPremiera',
    'app/programDela/View/IzracunajView',
    'template!../tpl/premiera-izpolni.tpl',
    'marionette',
    'underscore',
    'app/programDela/View/PrenesiModal',
    'jquery'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        formTpl,
        ZapisiLayout,
        schema,
        IzracunajView,
        prenesiTpl,
        Marionette,
        _,
        Modal,
        $
        ) {

    var hc = Backgrid.HeaderCell.extend({
        className: 'backgrid-kolona-stevilk'
    });
    var PremieraView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'premiere',
        formTitle: i18next.t('premiera.title'),
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
                label: i18next.t('ep.t.lastnaSredstva'),
                name: 'lastnaSredstva',
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
     * overridana metoda iz enoteprograma
     * @returns {EnotaProgramaView@call;extend.prototype.getIzracunajView.View}
     */
    PremieraView.prototype.getIzracunajView = function () {
        var View = IzracunajView.extend({
            tanF: 0.6,
            avtHonF: 0.6
        });

        return View;
    };
    /**
     * overridana metoda iz enoteprograma
     * @returns {EnotaProgramaView@call;extend.prototype.getIzracunajView.View}
     */
    PremieraView.prototype.prenesiPodatke = function (data) {
        var view = new Modal.View({
            template: prenesiTpl,
            podatki: data,
            model: this.model
        });

        var Mod = Modal.Modal.extend({});

        var self = this;
        Mod.prototype.prenesi = function () {
            if ($('.stHonorarnih').is(':checked')) {
                self.form.fields.stHonorarnih.editor.setValue(view.model.get('rpc')['stHonorarnih']);
            }
            if ($('.stHonorarnihIgr').is(':checked')) {
                self.form.fields.stHonorarnihIgr.editor.setValue(view.model.get('rpc')['stHonorarnihIgr']);
            }

            self.triggerMethod('form:change', self.form);
        };
        
        var modal = new Mod({
            content: view
        });

        modal.open(modal.prenesi());
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    PremieraView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramPremiera'
        });
        this.prilogeR.show(view);
    };

    return PremieraView;
});