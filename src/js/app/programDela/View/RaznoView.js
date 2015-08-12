/* 
 * Licenca GPLv3
 */
define([
    'app/Max/Module/Backgrid',
    'i18next',
    'app/programDela/View/EnotaProgramaView',
    'app/programDela/View/PESklopaView',
    'template!../tpl/razno-form.tpl',
    'template!../tpl/razno.tpl',
    'app/Zapisi/View/ZapisiLayout',
    'formSchema!programRazno'
], function (
        Backgrid,
        i18next,
        EnotaProgramaView,
        PESView,
        formTpl,
        tpl,
        ZapisiLayout,
        schema
        ) {
    
    var RaznoView = EnotaProgramaView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        detailName: 'programiRazno',
        formTitle: i18next.t('programRazno.title'),
        disabled: false,
        regions: {
            drugiViriR: '.region-drugiViri',
            koprodukcijeR: '.region-koprodukcije',
            prilogeR: '.region-priloge',
            pesR: '.region-pes'
        },
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
                label: i18next.t('ep.naziv'),
                name: 'naziv',
                sortable: true
            },
            {
                cell: 'boolean',
                editable: false,
                label: i18next.t('ep.imaKoprodukcije'),
                name: 'imaKoprodukcije',
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
                label: i18next.t('ep.stHonorarnih'),
                name: 'stHonoranih',
                total: 'count',
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
                    {event: 'brisi', title: i18next.t('std.brisi')},
                    {event: 'uredi', title: i18next.t('std.uredi')},
                    {event: 'premakniGor', title: i18next.t('std.premakniGor')},
                    {event: 'premakniDol', title: i18next.t('std.premakniDol')}
                ]
            }
        ]
    });
    
    RaznoView.prototype.izracunajPrikaznaPolja = function () {
        var model = this.model;
        model.preracunajInfo(false);
    };
    
    RaznoView.prototype.prepareToolbar = function () {
        return  this.model ?
                [
                    [
                        this.buttons.shrani,
                        this.buttons.preklici,
                        this.buttons.izracunaj,
                        this.buttons.nasvet
                    ]
                ] : [[this.buttons.dodaj]];
    };


    RaznoView.prototype.imaKoprodukcijeChange = function (form, editor) {
        var imaKop = false;
        if (this.model.get('id')) {
            imaKop = editor.getValue();
        }
        this.izrisKoprodukcije(imaKop);
    };
    
     /**
     * disable/enable gumbe v drugihvirih, koprodukcijah in zapisih
     * @returns {undefined}
     */
    RaznoView.prototype.disablePostavke = function () {
        var tb = this.getToolbarModel();
        var but = tb.getButton('doc-postavka-shrani');
        if (but) {
            if (!but.get('disabled') && this.model.get('id')) {
                this.drugiViri.disabled = true;
                if (this.koprodukcije) {
                    this.koprodukcije.disabled = true;
                }
                this.pes.disabled = true;
                //dodati se še mora za zapis
            }
        }
    };

    /**
     * 
     * Obesim se na event prekliči, da spraznim enoto programa in 
     * druge vire, ko se forma zapre. 
     * 
     * @returns {undefined}
     */
    RaznoView.prototype.initialize = function (options) {
        EnotaProgramaView.prototype.initialize.apply(this, arguments);
        this.on('preklici', function () {
            this.pesR.empty();
        }, this);
    };

    /**
     * ob izrisu forme se izvede še izris postavk
     * @returns {undefined}
     */
    RaznoView.prototype.onRenderForm = function () {
        EnotaProgramaView.prototype.onRenderForm.apply(this, arguments);
        if (!this.model.isNew()) {
            this.renderPES();
        }
    };

    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    RaznoView.prototype.renderPES = function () {
        var view = this.pes = new PESView({
            collection: this.model.peSklopiCollection,
            dokument: this.model
        });

        this.pesR.show(view);
    };
    /**
     * Overrride render priloge, da se nastavi pravi classLastnika
     * @returns {undefined}
     */
    RaznoView.prototype.renderPriloge = function () {
        var view = new ZapisiLayout({
            lastnik: this.model.get('id'),
            classLastnika: 'ProgramRazno'
        });
        this.prilogeR.show(view);
    };

    return RaznoView;
});