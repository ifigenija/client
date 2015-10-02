/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'app/programDela/View/PrenesiView',
    'template!../tpl/premiera-form.tpl',
    'template!../tpl/premiera-prenesi.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programPremiera',
    'app/programDela/View/KoprodukcijaView',
    'template!../tpl/koprodukcijaPremiera-form.tpl',
    'formSchema!produkcijaDelitev/premiera'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        PrenesiView,
        formTpl,
        prenesiTpl,
        ZapisiLayout,
        schema,
        KoprodukcijaView,
        kopFormTpl,
        kopShema
        ) {
    
    var sch = schema.toFormSchema().schema;
    
    sch.zaproseno.help = i18next.t('ep.zaprosenoPrem');

    var PremieraView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: sch,
        detailName: 'premiere',
        formTitle: i18next.t('premiera.title'),
        gridMeta: [
            {
                headerCell: 'number',
                cell: 'integer',
                editable: false,
                label: i18next.t('ent.d.sort'),
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
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('ep.zaproseno'),
                name: 'zaproseno',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
                cell: 'number',
                editable: false,
                label: i18next.t('ep.t.avtorskiHonorarji'),
                name: 'avtorskiHonorarji',
                total: 'sum',
                sortable: true
            },
            {
                headerCell: 'number',
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
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'premakniGor', title: i18next.t('std.premakniGor')},
                    {event: 'premakniDol', title: i18next.t('std.premakniDol')},
                    {event: 'brisi', title: i18next.t('std.brisi')}
                ]
            }
        ]
    });
        
    PremieraView.prototype.toggleObisk = function (form, editor) {
        var priKop = editor.getValue();

        if (priKop) {
            this.$('input[name="obiskDoma"]').attr("disabled", true);
            this.$('input[name="obiskKopr"]').attr("disabled", false);
            form.fields.obiskDoma.editor.setValue('0');
        } else {
            this.$('input[name="obiskKopr"]').attr("disabled", true);
            this.$('input[name="obiskDoma"]').attr("disabled", false);
            form.fields.obiskKopr.editor.setValue('0');
        }
    };
    
    PremieraView.prototype.onRenderForm = function (form) {
        EnotaProgramaView.prototype.onRenderForm.apply(this, arguments);
        form.on('priKoproducentu:change', this.toggleObisk, this);
        this.toggleObisk(form, form.fields.priKoproducentu.editor);
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

    /**
     * overridana metoda
     * @returns {EnotaProgramaView@call;extend.prototype.getPrenesiView.View}
     */
    PremieraView.prototype.getPrenesiView = function () {
        var View = PrenesiView.extend({
            template: prenesiTpl,
            podatkiUprizoritve: this.podatkiUprizoritve,
            jeNa: false
        });

        return View;
    };

    /**
     * Izris postavke koproducent
     * @returns {undefined}
     */
    PremieraView.prototype.renderKoprodukcije = function () {
        var KopView = KoprodukcijaView.extend({
            formTemplate: kopFormTpl,
            schema: kopShema.toFormSchema().schema,
            gridMeta: [
                {
                    cell: 'string',
                    editable: false,
                    label: i18next.t('prodel.koproducent'),
                    name: 'naziv',
                    sortable: true
                },
                {
                    headerCell: 'number',
                    cell: 'number',
                    editable: false,
                    label: i18next.t('prodel.delez'),
                    name: 'delez',
                    total: 'sum',
                    sortable: true
                },
                {
                    headerCell: 'number',
                    cell: 'number',
                    editable: false,
                    label: i18next.t('prodel.t.kpe'),
                    name: 'kpe',
                    total: 'sum',
                    sortable: true
                },
                {
                    cell: 'action',
                    name: '...',
                    sortable: false,
                    actions: [
                        {event: 'uredi', title: i18next.t('std.uredi')},
                        {event: 'brisi', title: i18next.t('std.brisi')}
                    ]
                }
            ]
        });

        var view = this.koprodukcije = new KopView({
            collection: this.model.koprodukcijeCollection,
            dokument: this.model
        });

        view.on('save:success', this.ponovenIzris, this);
        view.on('destroy:success', this.ponovenIzris, this);

        this.koprodukcijeR.show(view);
    };
    
    return PremieraView;
});