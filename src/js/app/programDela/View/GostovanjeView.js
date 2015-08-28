/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'app/programDela/View/PrenesiView',
    'template!../tpl/gostovanje-form.tpl',
    'template!../tpl/gostovanje-prenesi.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programGostovanje'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        PrenesiView,
        formTpl,
        prenesiTpl,
        ZapisiLayout,
        schema
        ) {

    var GostovanjeView = EnotaProgramaView.extend({
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'gostovanja',
        formTitle: i18next.t('gostovanje.title'),
        gridMeta: [
            {
                headerCell: 'number',
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
                cell: 'string',
                editable: false,
                label: i18next.t('gostovanje.gostitelj'),
                name: 'gostitelj.label',
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
                label: i18next.t('gostovanje.transportniStroski'),
                name: 'transportniStroski',
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
    
    GostovanjeView.prototype.bindEvents = function () {
        EnotaProgramaView.prototype.bindEvents.apply(this, arguments);
        
        this.form.on('transportniStroski:change', this.prikaziPodatke, this);
        this.form.on('dnevPrvZad:change', this.prikaziPodatke, this);
    };
    GostovanjeView.prototype.unBindEvents = function () {
        EnotaProgramaView.prototype.unBindEvents.apply(this, arguments);
        
        this.form.off('transportniStroski:change', this.prikaziPodatke, this);
        this.form.off('dnevPrvZad:change', this.prikaziPodatke, this);
    };
    
    
    /**
     * overridana metoda
     * @returns {EnotaProgramaView@call;extend.prototype.getPrenesiView.View}
     */
    GostovanjeView.prototype.getPrenesiView = function () {
        var View = PrenesiView.extend({
            template: prenesiTpl,
            podatkiUprizoritve: this.podatkiUprizoritve,
            jeNa: true
        });

        return View;
    };

    GostovanjeView.prototype.imaKoprodukcijeChange = function (form, editor) {
        var imaKop = false;
        if (this.model.get('id')) {
            imaKop = editor.getValue();
        }
        this.izrisKoprodukcije(imaKop);
    };
    
    /**
     * obstaja samo število ponovitev v tujini
     * @param {type} form
     * @returns {unresolved}
     */
    GostovanjeView.prototype.steviloPonovitev = function (form) {
        var polja = form.fields;
        
        var ponoviInt = polja.ponoviInt.getValue();
        var ponoviKoprInt = polja.ponoviKoprInt.getValue();

        var stPonovi =  ponoviInt + ponoviKoprInt;

        return stPonovi;
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    GostovanjeView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramGostovanje'
        });
        this.prilogeR.show(view);
    };

    return GostovanjeView;
});